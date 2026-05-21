#!/usr/bin/env node
// Service script to type-check core, demos and modules one by one (cross-platform)
//
// Usage:
//   node tsc-all.js              # type-check all sub-projects
//   node tsc-all.js core         # only core
//   node tsc-all.js 06           # entries whose label contains "06"
//   node tsc-all.js 06-01,07-02  # specific entries (comma-separated)

import { execSync } from 'child_process'
import { readdirSync, statSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const ROOT_DIR = dirname(fileURLToPath(import.meta.url))
const DEMOS_DIR = join(ROOT_DIR, 'demos')
const MODULES_DIR = join(ROOT_DIR, 'modules')

const subDirs = (dir) =>
  readdirSync(dir)
    .filter(entry => statSync(join(dir, entry)).isDirectory())
    .sort()

const ALL_TARGETS = [
  { label: 'core', dir: join(ROOT_DIR, 'core') },
  ...subDirs(DEMOS_DIR).map(entry => ({ label: `demos/${entry}`, dir: join(DEMOS_DIR, entry) })),
  ...subDirs(MODULES_DIR).map(entry => ({ label: `modules/${entry}`, dir: join(MODULES_DIR, entry) })),
]

const filterArg = process.argv[2] || ''
let targets

if (filterArg) {
  const filters = filterArg.split(',').map(f => f.trim())
  targets = ALL_TARGETS.filter(t => filters.some(filter => t.label.includes(filter)))
  if (targets.length === 0) {
    console.error(`No targets matched filter: ${filterArg}`)
    process.exit(1)
  }
  console.log(`=== Nuxt Ignis Type Check (filtered: ${filterArg}) ===`)
}
else {
  targets = [...ALL_TARGETS]
  console.log('=== Nuxt Ignis Type Check (all) ===')
}

console.log('')

const startTime = performance.now()
const results = []

for (const { label, dir } of targets) {
  console.log(`[${label}] Checking types...`)
  try {
    execSync('pnpm test:types', { cwd: dir, stdio: 'inherit' })
    results.push({ label, success: true })
    console.log(`[${label}] PASSED\n`)
  }
  catch {
    results.push({ label, success: false })
    console.error(`[${label}] FAILED\n`)
  }
}

const elapsed = ((performance.now() - startTime) / 1000).toFixed(1)
const passed = results.filter(r => r.success).length
const failed = results.filter(r => !r.success).length

console.log('=== Results ===')
for (const { label, success } of results) {
  console.log(`  ${success ? '✓' : '✗'} ${label}`)
}
console.log('')
console.log(`${passed} passed, ${failed} failed — ${elapsed}s`)

if (failed > 0) {
  process.exit(1)
}
