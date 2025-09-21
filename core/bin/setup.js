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
  try {
    await updateJsonFile('package.json', 'dependencies', { 'nuxt-ignis': '0.5.0-rc.1' },
      auto, 'This will add \'nuxt-ignis\' dependency to your \'package.json\'. Proceed?')
  } catch (error) {
    console.error('Error adding \'nuxt-ignis\' dependency:\n', error.message)
  }

  // 1.2 - adjust pnpm settings
  const pnpmSettings = auto || await promptUser('This will adjust pnpm settings in your \'package.json\'. Proceed?')
  if (pnpmSettings) {
    try {
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
    } catch (error) {
      console.error('Error adjusting pnpm settings:\n', error.message)
    }
    try {
      await updateJsonFile('package.json', 'packageManager', 'pnpm@10.17.0', true)
    } catch (error) {
      console.error('Error setting packageManager:\n', error.message)
    }
  }

  // 2 - add nuxt-ignis module to nuxt.config.ts
  try {
    await updateConfigFile('nuxt.config.ts', {
      extends: [
        'nuxt-ignis',
      ],
    }, auto, 'This will add \'nuxt-ignis\' module to your \'nuxt.config.ts\'. Continue?')
  } catch (error) {
    console.error('Error enabling \'nuxt-ignis\' module:\n', error.message)
  }

  // 3 - .npmrc file
  try {
    await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/heads/main/core/.npmrc',
      '.npmrc', auto, 'This will set \'.npmrc\' file for your project. Continue?')
  } catch (error) {
    console.error('Error setting .npmrc file:\n', error.message)
  }

  // 4 - .gitignore file
  try {
    await updateTextFile('.gitignore', [
      '',
      '# Nuxt Ignis files',
      '# configuration overview created upon Nuxt Ignis start',
      '_ignis-config.json',
    ], auto, 'This will add Nuxt Ignis-related entries into your \'.gitignore\'. Continue?')
  } catch (error) {
    console.error('Error updating .gitignore file:\n', error.message)
  }
}

nuxtIgnisSetup().catch((err) => {
  console.error(err)
  process.exit(1)
})
