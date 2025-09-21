#!/usr/bin/env node

import { createFileFromWebTemplate, promptUser, showMessage, updateConfigFile, updateJsonFile, updateTextFile } from 'elrh-cosca'

/**
 * CLI tool to setup Nuxt Ignis for a new project.
 *
 * Usage: `npx nuxt-ignis setup` in target folder.
 *
 * Has two modes:
 * - automatic - no prompts except the first one
 * - interactive - with prompts for each step
 */
async function nuxtIgnisSetup() {
  showMessage('NUXT IGNIS SETUP')
  showMessage('This CLI tool will help you include Nuxt Ignis in your project.')
  showMessage('Refer to the documentation for more information.', 2)

  const auto = await promptUser('Do you want to set everything up automatically (no more prompts)?')
  showMessage('')

  // 1.1 - add nuxt-ignis dependency
  await updateJsonFile('package.json', 'dependencies', { 'nuxt-ignis': '0.4.0' },
    auto, 'This will add \'nuxt-ignis\' dependency to your \'package.json\'. Proceed?')

  // 1.2 - adjust pnpm settings
  const pnpmSettings = auto || await promptUser('This will adjust pnpm settings in your \'package.json\'. Proceed?')
  if (pnpmSettings) {
    await updateJsonFile('package.json', 'pnpm', {
      onlyBuiltDependencies: [
        '@parcel/watcher',
        '@tailwindcss/oxide',
        'better-sqlite3',
        'esbuild',
        'maplibre-gl',
        'puppeteer',
        'sharp',
        'unrs-resolver',
        'vue-demi',
      ],
    }, true)
    await updateJsonFile('package.json', 'packageManager', 'pnpm@10.17.0', true)
  }

  // 2 - add nuxt-ignis module to nuxt.config.ts
  await updateConfigFile('nuxt.config.ts', {
    extends: [
      'nuxt-ignis',
    ],
  }, auto, 'This will add \'nuxt-ignis\' module to your \'nuxt.config.ts\'. Continue?')

  // 3 - .npmrc file
  await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/heads/main/core/.npmrc',
    '.npmrc', auto, 'This will set \'.npmrc\' file for your project. Continue?')

  // 4 - .gitignore file
  await updateTextFile('.gitignore', [
    '',
    '# Nuxt Ignis files',
    '# configuration overview created upon Nuxt Ignis start',
    '_ignis-config.json',
  ], auto, 'This will add Nuxt Ignis-related entries into your \'.gitignore\'. Continue?')
}

nuxtIgnisSetup().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
