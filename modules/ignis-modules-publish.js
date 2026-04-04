#!/usr/bin/env node
// Service script to publish sub-modules (cross-platform)
// Will prompt for npm login during run
//
// Usage:
//   node modules/ignis-modules-publish.js              # publish all modules
//   node modules/ignis-modules-publish.js ui,db        # publish only matching modules

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const MODULES_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(MODULES_DIR, '..');

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
const filterArg = process.argv[2] || '';
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
  console.log(`=== Nuxt Ignis Module Release (filtered: ${filterArg}) ===`);
} else {
  modules = [...ALL_MODULES];
  console.log('=== Nuxt Ignis Module Release (all modules) ===');
}

console.log('');

const startTime = performance.now();

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: 'inherit' });
}

function readPkg(moduleDir) {
  return JSON.parse(readFileSync(join(moduleDir, 'package.json'), 'utf8'));
}

function bumpPatch(version) {
  const parts = version.split('.');
  parts[2] = String(Number(parts[2]) + 1);
  return parts.join('.');
}

// Step 1: Bump patch version and publish each module
for (const mod of modules) {
  const moduleDir = join(MODULES_DIR, mod);
  const pkg = readPkg(moduleDir);
  const newVersion = bumpPatch(pkg.version);

  console.log(`[${mod}] ${pkg.name}: ${pkg.version} -> ${newVersion}`);

  pkg.version = newVersion;
  writeFileSync(
    join(moduleDir, 'package.json'),
    JSON.stringify(pkg, null, 2) + '\n'
  );

  run('pnpm publish --access public --no-git-checks', moduleDir);
}

console.log('');
console.log('=== Updating pnpm-workspace.yaml catalog ===');
console.log('');

// Step 2: Update @nuxt-ignis/* versions in pnpm-workspace.yaml
const workspaceYamlPath = join(ROOT_DIR, 'pnpm-workspace.yaml');
let workspaceYaml = readFileSync(workspaceYamlPath, 'utf8');

for (const mod of modules) {
  const moduleDir = join(MODULES_DIR, mod);
  const pkg = readPkg(moduleDir);

  const pattern = new RegExp(
    `('${pkg.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*)\\S+`
  );
  workspaceYaml = workspaceYaml.replace(pattern, `$1${pkg.version}`);

  console.log(`  catalog: ${pkg.name} -> ${pkg.version}`);
}

writeFileSync(workspaceYamlPath, workspaceYaml);

console.log('');
console.log('=== Waiting 10s for npm registry to update ===');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await sleep(10000);

  console.log('');
  console.log('=== Running pnpm install in /core ===');
  console.log('');

  run('pnpm install', join(ROOT_DIR, 'core'));

  const duration = ((performance.now() - startTime) / 1000).toFixed(1);

  console.log('');
  console.log(`=== Release complete in ${duration}s ===`);
})();
