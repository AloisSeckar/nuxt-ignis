#!/usr/bin/env node
// Check and bump versions in the pnpm-workspace.yaml catalog
//
// Usage:
//   node .agents/skills/bump-deps/bump-deps.js
//
// - Uses `pnpm outdated -r --format=json` to find catalog packages with updates.
// - Auto-applies minor/patch bumps (respecting ^/~ prefixes) and mirrors safe
//   version bumps into docs/3-1-features.md and <PackagesReference> tags.
// - Skips internal '@nuxt-ignis/*' and never auto-applies major bumps 
//   (reported only, for manual review).

import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import semver from 'semver'

const SKILL_DIR = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = join(SKILL_DIR, '..', '..', '..')
const WORKSPACE_YAML_PATH = join(ROOT_DIR, 'pnpm-workspace.yaml')
const DOCS_DIR = join(ROOT_DIR, 'docs')

const FETCH_TIMEOUT_MS = 10_000
const FETCH_RETRY_DELAY_MS = 750
const CONCURRENCY = 6

const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// ---- pnpm-workspace.yaml text helpers (regex/slicing, preserves comments & formatting) ----

// Finds [start, end) of a top-level `key:` block's body (up to the next column-0 line)
function findBlockRange(yamlText, key) {
  const headerRe = new RegExp(`^${escapeRegExp(key)}:[ \\t]*\\r?\\n`, 'm')
  const headerMatch = yamlText.match(headerRe)
  if (!headerMatch) throw new Error(`Could not find '${key}:' block in pnpm-workspace.yaml`)
  const bodyStart = headerMatch.index + headerMatch[0].length
  const rest = yamlText.slice(bodyStart)
  const nextTopLevel = rest.match(/^\S/m)
  const bodyEnd = nextTopLevel ? bodyStart + nextTopLevel.index : yamlText.length
  return { bodyStart, bodyEnd }
}

// Detects the dominant line-ending style of the file so inserted lines match
function detectEol(yamlText) {
  return yamlText.includes('\r\n') ? '\r\n' : '\n'
}

function parseCatalog(yamlText) {
  const { bodyStart, bodyEnd } = findBlockRange(yamlText, 'catalog')
  const lineRe = /^\s*'([^']+)':\s*(\^|~)?(\S+)/
  return yamlText
    .slice(bodyStart, bodyEnd)
    .split('\n')
    .map(line => line.match(lineRe))
    .filter(Boolean)
    .map(m => ({ name: m[1], prefix: m[2] || '', version: m[3] }))
}

function parseMinimumReleaseAge(yamlText) {
  const m = yamlText.match(/^minimumReleaseAge:\s*(\d+)/m)
  return m ? Number(m[1]) : 0
}

function parseExcludeNames(yamlText) {
  const { bodyStart, bodyEnd } = findBlockRange(yamlText, 'minimumReleaseAgeExclude')
  const names = new Set()
  for (const m of yamlText.slice(bodyStart, bodyEnd).matchAll(/^\s*-\s*'([^']+)'/gm)) {
    names.add(m[1])
  }
  return names
}

function updateCatalogVersion(yamlText, name, versionWithPrefix) {
  const pattern = new RegExp(`('${escapeRegExp(name)}':\\s*)\\S+`)
  return yamlText.replace(pattern, `$1${versionWithPrefix}`)
}

function formatBuildTimestamp(date = new Date()) {
  const pad = n => String(n).padStart(2, '0')
  const offsetMin = -date.getTimezoneOffset()
  const sign = offsetMin >= 0 ? '+' : '-'
  const offsetH = Math.floor(Math.abs(offsetMin) / 60)
  const offsetM = Math.abs(offsetMin) % 60
  const offset = offsetM ? `${offsetH}:${pad(offsetM)}` : `${offsetH}`
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
    + `${pad(date.getHours())}:${pad(date.getMinutes())} GMT${sign}${offset}`
}

// Appends a new dated comment group + entries at the end of minimumReleaseAgeExclude
function appendExclusions(yamlText, entries) {
  const { bodyEnd } = findBlockRange(yamlText, 'minimumReleaseAgeExclude')
  const eol = detectEol(yamlText)
  const lines = [
    `  # build @ ${formatBuildTimestamp()}`,
    ...entries.map(({ name, version }) => `  - '${name}' # v${version}`),
  ]
  return `${yamlText.slice(0, bodyEnd)}${lines.join(eol)}${eol}${yamlText.slice(bodyEnd)}`
}

// ---- pnpm outdated ----

function getPnpmOutdated() {
  try {
    const output = execSync('pnpm outdated -r --format=json', {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    return JSON.parse(output)
  }
  catch (err) {
    // pnpm exits with code 1 when outdated packages are found - stdout still has the JSON
    if (err.stdout) {
      try {
        return JSON.parse(err.stdout.toString())
      }
      catch {
        // fall through to rethrow below
      }
    }
    throw new Error(`'pnpm outdated' failed: ${err.message}`)
  }
}

// ---- npm registry ----

function registryUrl(name) {
  return `https://registry.npmjs.org/${name.replace('/', '%2F')}`
}

async function fetchJsonWithRetry(url) {
  let lastError
  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    }
    catch (err) {
      lastError = err
      if (attempt === 1) await sleep(FETCH_RETRY_DELAY_MS)
    }
    finally {
      clearTimeout(timer)
    }
  }
  throw lastError
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length)
  let index = 0
  async function worker() {
    while (index < items.length) {
      const current = index++
      results[current] = await mapper(items[current])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

// ---- version candidate selection ----

// Picks the upgrade target, staying on the same prerelease channel if the package is pinned to one
function pickCandidate(currentVersion, versions, latestDistTag) {
  const validVersions = Object.keys(versions).filter(v => semver.valid(v))
  const currentPrerelease = semver.prerelease(currentVersion)

  if (currentPrerelease) {
    const channel = currentPrerelease[0]
    const sameChannel = validVersions.filter((v) => {
      const pre = semver.prerelease(v)
      return pre && pre[0] === channel
    })
    if (sameChannel.length) {
      sameChannel.sort(semver.rcompare)
      return { version: sameChannel[0], channelDead: false }
    }
    const stable = validVersions.filter(v => !semver.prerelease(v)).sort(semver.rcompare)
    return { version: stable[0] || latestDistTag, channelDead: true }
  }

  if (!semver.prerelease(latestDistTag)) {
    return { version: latestDistTag, channelDead: false }
  }
  const stable = validVersions.filter(v => !semver.prerelease(v)).sort(semver.rcompare)
  return { version: stable[0] || currentVersion, channelDead: false }
}

function classify(currentVersion, candidateVersion, channelDead) {
  if (channelDead) return 'major'
  if (!semver.valid(candidateVersion) || semver.lte(candidateVersion, currentVersion)) return 'none'
  const diff = semver.diff(currentVersion, candidateVersion)
  if (!diff) return 'none'
  if (diff === 'major' || diff === 'premajor') return 'major'
  if (diff === 'minor' || diff === 'preminor') return 'minor'
  return 'patch' // patch, prepatch, prerelease
}

// ---- docs updates ----

function listMarkdownFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) files.push(...listMarkdownFiles(full))
    else if (extname(entry) === '.md') files.push(full)
  }
  return files
}

// Updates known version-reference patterns only (features table + <PackagesReference> tags)
function updateDocsForPackage(name, oldVersion, newVersion, docFiles) {
  const escapedName = escapeRegExp(name)
  const escapedOld = escapeRegExp(oldVersion)
  const tableRe = new RegExp(`(\\|\\s*\`${escapedName}\`\\s*\\|\\s*\`)${escapedOld}(\`)`)
  const refRe = new RegExp(`(\\{\\s*name:\\s*'${escapedName}'[^}]*version:\\s*')${escapedOld}(')`)

  const updatedFiles = []
  for (const file of docFiles) {
    const text = readFileSync(file, 'utf8')
    if (!text.includes(name)) continue

    let changed = false
    let next = text
    if (tableRe.test(next)) {
      next = next.replace(tableRe, `$1${newVersion}$2`)
      changed = true
    }
    if (refRe.test(next)) {
      next = next.replace(refRe, `$1${newVersion}$2`)
      changed = true
    }
    if (changed) {
      writeFileSync(file, next)
      updatedFiles.push(relative(ROOT_DIR, file))
    }
  }
  return updatedFiles
}

// ---- main ----

async function main() {
  const outdated = getPnpmOutdated()
  let yamlText = readFileSync(WORKSPACE_YAML_PATH, 'utf8')
  const catalog = parseCatalog(yamlText)
  const minimumReleaseAge = parseMinimumReleaseAge(yamlText)
  const excludeNames = parseExcludeNames(yamlText)
  const docFiles = listMarkdownFiles(DOCS_DIR)

  const catalogByName = new Map(catalog.map(entry => [entry.name, entry]))
  const candidates = Object.keys(outdated).filter(
    name => catalogByName.has(name) && !name.startsWith('@nuxt-ignis/'),
  )

  const report = {
    applied: [],
    appliedRecent: [],
    majors: [],
    fetchFailures: [],
  }

  const resolved = await mapWithConcurrency(candidates, CONCURRENCY, async (name) => {
    const entry = catalogByName.get(name)
    try {
      const data = await fetchJsonWithRetry(registryUrl(name))
      const { version: candidateVersion, channelDead } = pickCandidate(
        entry.version,
        data.versions || {},
        outdated[name].latest,
      )
      const bump = classify(entry.version, candidateVersion, channelDead)
      return { name, entry, bump, candidateVersion, time: data.time || {} }
    }
    catch (err) {
      report.fetchFailures.push({ name, error: err.message })
      return null
    }
  })

  for (const item of resolved) {
    if (!item || item.bump === 'none') continue
    const { name, entry, bump, candidateVersion, time } = item

    if (bump === 'major') {
      report.majors.push({ name, current: entry.version, latest: candidateVersion })
      continue
    }

    const releasedAt = time[candidateVersion]
    const ageMinutes = releasedAt ? (Date.now() - Date.parse(releasedAt)) / 60_000 : Infinity
    const isRecent = ageMinutes < minimumReleaseAge

    yamlText = updateCatalogVersion(yamlText, name, `${entry.prefix}${candidateVersion}`)

    if (isRecent && !excludeNames.has(name)) {
      yamlText = appendExclusions(yamlText, [{ name, version: candidateVersion }])
      excludeNames.add(name)
      report.appliedRecent.push({ name, from: entry.version, to: candidateVersion })
    }
    else {
      report.applied.push({ name, from: entry.version, to: candidateVersion })
    }

    const updatedDocs = updateDocsForPackage(name, entry.version, candidateVersion, docFiles)
  }

  writeFileSync(WORKSPACE_YAML_PATH, yamlText)

  // ---- report ----
  console.log('=== Nuxt Ignis Dependency Bump ===\n')

  const printList = (title, items, formatter) => {
    console.log(`${title} (${items.length})`)
    for (const item of items) console.log(`  ${formatter(item)}`)
    console.log('')
  }

  printList('Applied', report.applied, i => `${i.name}: ${i.from} -> ${i.to}`)
  printList('Applied - manual check', report.appliedRecent, i => `${i.name}: ${i.from} -> ${i.to}`)
  printList('Majors available (not applied)', report.majors, i => `${i.name}: ${i.current} -> ${i.latest}`)
  printList('Fetch failures (skipped)', report.fetchFailures, i => `${i.name}: ${i.error}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
