#!/usr/bin/env node
// WHAT: Runs vue-tsc --noEmit and filters out errors originating from core source files.
// WHY:  Demo projects extend nuxt-ignis as a Nuxt layer. Nuxt generates .nuxt/imports.d.ts
//       and .nuxt/types/components.d.ts that re-export/reference core source (.ts/.vue) files.
//       TypeScript always follows /// <reference path> and export-from chains regardless of
//       tsconfig "exclude", so core source files end up compiled in the demo's context.
//       The demo's context is limited (e.g. optional features like content/i18n disabled),
//       which causes spurious type errors in core files that are correct in their own context.
//       This script discards those errors so only genuine demo-level type errors are reported.

import { spawnSync } from 'node:child_process'

// Run vue-tsc with output captured so we can filter it
const result = spawnSync('vue-tsc', ['--noEmit'], {
  stdio: 'pipe',
  encoding: 'utf8',
  shell: true,
  cwd: process.cwd(),
})

// No errors at all — done
if (result.status === 0) {
  process.exit(0)
}

const rawOutput = ((result.stdout || '') + (result.stderr || '')).replace(/\r\n/g, '\n')
const lines = rawOutput.split('\n')

// TypeScript error header comes in two formats depending on whether output is a TTY:
//   non-pretty (piped): "path(line,col): error TS2345: message"
//   pretty (TTY):       "path:line:col - error TS2345: message"
// When stdio is 'pipe', TypeScript always uses the non-pretty parentheses format.
// Both formats contain " error TS\d+:" which is used for counting and detection.
// Core errors have paths starting with "../../core/" or "..\..\core\" (Windows backslashes).
const ERROR_HEADER_RE = /^\S.*(?::\d+:\d+ - |\(\d+,\d+\): )error TS\d+:/
const CORE_PATH_RE = /^\.\.[\\/]\.\.[\\/]core[\\/]/
const ANY_ERROR_RE = / error TS\d+:/

// Safety: if no recognisable errors found (unexpected output / command failure),
// pass the raw output through unchanged so nothing is silently swallowed.
const rawErrorCount = (rawOutput.match(ANY_ERROR_RE) || []).length
if (rawErrorCount === 0) {
  process.stderr.write(rawOutput)
  process.exit(result.status ?? 1)
}

const kept = []
let inCoreBlock = false

for (const line of lines) {
  // Skip the "Found X errors." summary — we'll emit a corrected one at the end
  if (/^Found \d+ error/.test(line)) {
    continue
  }

  // Detect an error header line and update the core-block flag
  if (ERROR_HEADER_RE.test(line)) {
    inCoreBlock = CORE_PATH_RE.test(line)
  }

  // Context lines (code excerpt + underlines) inherit the preceding header's flag
  if (!inCoreBlock) {
    kept.push(line)
  }
}

// Count remaining non-core errors
const nonCoreErrorCount = kept.filter(l => ANY_ERROR_RE.test(l)).length

if (nonCoreErrorCount > 0) {
  const output = kept.join('\n').replace(/\n+$/, '')
  process.stdout.write(output + '\n\n')
  process.stdout.write(`Found ${nonCoreErrorCount} error${nonCoreErrorCount === 1 ? '' : 's'}.\n`)
  process.exit(1)
}

// All errors were from core source files — exit cleanly
process.exit(0)
