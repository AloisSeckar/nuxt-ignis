#!/usr/bin/env node
// Service script to build and e2e-test demo apps one by one (cross-platform)
//
// Usage:
//   node demos/ignis-demos-test.js              # build + test all demos
//   node demos/ignis-demos-test.js 06           # demos starting with "06"
//   node demos/ignis-demos-test.js 06-01,07-02  # specific demos (comma-separated)

import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const DEMOS_DIR = dirname(fileURLToPath(import.meta.url));
const CORE_DIR = join(DEMOS_DIR, '..', 'core');

// Demos permanently excluded from build+test runs
const EXCLUDED_DEMOS = ['01-02-bare', '01-03-full'];

// Discover all demo folders (directories only, sorted)
const ALL_DEMOS = readdirSync(DEMOS_DIR)
  .filter(entry => statSync(join(DEMOS_DIR, entry)).isDirectory() && !EXCLUDED_DEMOS.includes(entry))
  .sort();

// Filter demos by comma-separated "starts with" patterns
const filterArg = process.argv[2] || '';
let demos;

if (filterArg) {
  const filters = filterArg.split(',').map(f => f.trim());
  demos = ALL_DEMOS.filter(demo => filters.some(filter => demo.startsWith(filter)));
  if (demos.length === 0) {
    console.error(`No demos matched filter: ${filterArg}`);
    process.exit(1);
  }
  console.log(`=== Nuxt Ignis Demo Tests (filtered: ${filterArg}) ===`);
} else {
  demos = [...ALL_DEMOS];
  console.log('=== Nuxt Ignis Demo Tests (all demos) ===');
}

console.log('');

const startTime = performance.now();
const results = [];

for (const demo of demos) {
  const demoDir = join(DEMOS_DIR, demo);
  const testFile = `test/e2e/${demo}.test.ts`;

  // Step 1: build
  console.log(`[${demo}] Building...`);
  try {
    execSync('pnpm nuxt build', { cwd: demoDir, stdio: 'inherit' });
    console.log(`[${demo}] Build PASSED`);
  } catch {
    results.push({ demo, success: false, reason: 'build' });
    console.error(`[${demo}] Build FAILED\n`);
    continue;
  }

  // Step 2: e2e test
  console.log(`[${demo}] Running e2e tests...`);
  try {
    execSync(`pnpm exec vitest run ${testFile}`, { cwd: CORE_DIR, stdio: 'inherit' });
    results.push({ demo, success: true });
    console.log(`[${demo}] Tests PASSED\n`);
  } catch {
    results.push({ demo, success: false, reason: 'test' });
    console.error(`[${demo}] Tests FAILED\n`);
  }
}

// Summary
console.log('=== Test Summary ===');
const passed = results.filter(r => r.success);
const failed = results.filter(r => !r.success);

for (const r of results) {
  console.log(`  ${r.success ? 'PASS' : `FAIL (${r.reason})`}  ${r.demo}`);
}

const duration = ((performance.now() - startTime) / 1000).toFixed(3);
console.log('');
console.log(`${passed.length} passed, ${failed.length} failed out of ${results.length} demos in ${duration}s`);

if (failed.length > 0) {
  process.exit(1);
}
