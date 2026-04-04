#!/usr/bin/env node
// Service script to test sub-modules one by one (cross-platform)
//
// Usage:
//   node modules/ignis-modules-test.js              # test all modules
//   node modules/ignis-modules-test.js ui,db        # test only matching modules
//   node modules/ignis-modules-test.js --unit       # skip e2e, run only unit tests
//   node modules/ignis-modules-test.js ui,db --unit # combine both filters

import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const MODULES_DIR = dirname(fileURLToPath(import.meta.url));

const ALL_MODULES = [
  '01-core',
  '02-ui',
  '03-db',
  '04-forms',
  '05-validation',
  '06-content',
  '07-utils',
];

// Filter modules by comma-separated partial names (e.g. "ui,db")
const args = process.argv.slice(2);
const unitOnly = args.includes('--unit');
const filterArg = args.find(a => !a.startsWith('--')) || '';
let modules;

if (filterArg) {
  const filters = filterArg.split(',').map(f => f.trim());
  modules = ALL_MODULES.filter(mod =>
    filters.some(filter => mod.includes(filter))
  );
  if (modules.length === 0) {
    console.error(`No modules matched filter: ${filterArg}`);
    process.exit(1);
  }
  console.log(`=== Nuxt Ignis Module Tests (filtered: ${filterArg})${unitOnly ? ' [unit only]' : ''} ===`);
} else {
  modules = [...ALL_MODULES];
  console.log(`=== Nuxt Ignis Module Tests (all modules)${unitOnly ? ' [unit only]' : ''} ===`);
}

console.log('');

const startTime = performance.now();
const results = [];

for (const mod of modules) {
  const moduleDir = join(MODULES_DIR, mod);
  console.log(`[${mod}] Running tests...`);

  const testCmd = unitOnly
    ? 'pnpm test test/ignis-module-setup.test.ts test/ignis-module-dependencies.test.ts'
    : 'pnpm test';

  try {
    execSync(testCmd, { cwd: moduleDir, stdio: 'inherit' });
    results.push({ mod, success: true });
    console.log(`[${mod}] PASSED\n`);
  } catch {
    results.push({ mod, success: false });
    console.error(`[${mod}] FAILED\n`);
  }
}

// Summary
console.log('=== Test Summary ===');
const passed = results.filter(r => r.success);
const failed = results.filter(r => !r.success);

for (const r of results) {
  console.log(`  ${r.success ? 'PASS' : 'FAIL'}  ${r.mod}`);
}

const duration = ((performance.now() - startTime) / 1000).toFixed(3);

console.log('');
console.log(`${passed.length} passed, ${failed.length} failed out of ${results.length} modules in ${duration}s`);

if (failed.length > 0) {
  process.exit(1);
}
