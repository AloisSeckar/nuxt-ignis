#!/usr/bin/env node

import {
  createFileFromWebTemplate, deletePath, getPackageManager, hasJsonKey,
  pathExists, promptUser, removeFromJsonFile, showMessage,
  updateConfigFile, updateJsonFile, updateTextFile,
} from 'elrh-cosca'

/**
 * CLI tool to setup Nuxt Ignis for a new project.
 *
 * Usage: `npx nuxt-ignis setup [true|false]` in target folder.
 *
 * The script will first ask whether to run in "auto" mode (no prompts, force = true) or "manual" mode (with prompts, force = false). If `autoRun = true` is passed, no prompt will be shown.
 *
 * The script will:
 *  1) add `nuxt-ignis` into `package.json` dependencies, remove `nuxt`, `vue` and `vue-router` if present and adjust `pnpm` settings if `pnpm` is used
 *  2) add `extends: ['nuxt-ignis']` to `nuxt.config.ts`
 *  3) create/update `.npmrc` file (only if pnpm is used)
 *  4) update `.gitignore` file
 *  5) create default `vitest.config.ts` file and add test-related scripts into `package.json`
 *  6) clear node_modules and lock file(s)
 */
export async function nuxtIgnisSetup(autoRun = false) {
  showMessage('NUXT IGNIS SETUP')
  showMessage('This CLI tool will help you include Nuxt Ignis in your project.')
  showMessage('Refer to the documentation for more information.', 2)

  const isAutoRun = autoRun || await promptUser('Do you want to set everything up automatically (no more prompts)?')
  showMessage('')

  const packageManager = getPackageManager()

  // 1.1 - add nuxt-ignis dependency
  try {
    await updateJsonFile('package.json', 'dependencies', { 'nuxt-ignis': '0.5.3' },
      isAutoRun, 'This will add \'nuxt-ignis\' dependency to your \'package.json\'. Proceed?')
  } catch (error) {
    console.error('Error adding \'nuxt-ignis\' dependency:\n', error.message)
  }

  // 1.2 - remove now obsolete nuxt, vue and vue-router
  const removeDeps = isAutoRun || await promptUser('As \'nuxt-ignis\' provides \'nuxt\', \'vue\' and \'vue-router\' dependencies out of the box, do you want to remove them from your \'package.json\' to avoid duplications and possible version clashes?')
  if (removeDeps) {
    if (hasJsonKey('package.json', 'dependencies.nuxt')) {
      try {
        await removeFromJsonFile('package.json', 'dependencies.nuxt', true)
      } catch (error) {
        console.error('Error removing \'nuxt\' dependency:\n', error.message)
      }
    }
    if (hasJsonKey('package.json', 'dependencies.vue')) {
      try {
        await removeFromJsonFile('package.json', 'dependencies.vue', true)
      } catch (error) {
        console.error('Error removing \'vue\' dependency:\n', error.message)
      }
    }
    if (hasJsonKey('package.json', 'dependencies.vue-router')) {
      try {
        await removeFromJsonFile('package.json', 'dependencies.vue-router', true)
      } catch (error) {
        console.error('Error removing \'vue-router\' dependency:\n', error.message)
      }
    }
    if (hasJsonKey('package.json', 'devDependencies.nuxt')) {
      try {
        await removeFromJsonFile('package.json', 'devDependencies.nuxt', true)
      } catch (error) {
        console.error('Error removing \'nuxt\' devDependency:\n', error.message)
      }
    }
    if (hasJsonKey('package.json', 'devDependencies.vue')) {
      try {
        await removeFromJsonFile('package.json', 'devDependencies.vue', true)
      } catch (error) {
        console.error('Error removing \'vue\' devDependency:\n', error.message)
      }
    }
    if (hasJsonKey('package.json', 'devDependencies.vue-router')) {
      try {
        await removeFromJsonFile('package.json', 'devDependencies.vue-router', true)
      } catch (error) {
        console.error('Error removing \'vue-router\' devDependency:\n', error.message)
      }
    }
  }

  // 1.3 - adjust pnpm settings
  if (packageManager === 'pnpm') {
    const pnpmSettings = isAutoRun || await promptUser('This will adjust pnpm settings in your \'package.json\'. Proceed?')
    if (pnpmSettings) {
      try {
        // allow related build scripts
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
      // set pnpm as package manager
      try {
        await updateJsonFile('package.json', 'packageManager', 'pnpm@10.29.3', true)
      } catch (error) {
        console.error('Error setting packageManager:\n', error.message)
      }
    }
  }

  // 2 - add nuxt-ignis module to nuxt.config.ts
  try {
    await updateConfigFile('nuxt.config.ts', {
      extends: [
        'nuxt-ignis',
      ],
    }, isAutoRun, 'This will add \'nuxt-ignis\' module to your \'nuxt.config.ts\'. Continue?')
  } catch (error) {
    console.error('Error enabling \'nuxt-ignis\' module:\n', error.message)
  }

  // 3 - .npmrc file (only if pnpm is used)
  if (packageManager === 'pnpm') {
    try {
      if (pathExists('.npmrc')) {
        await updateTextFile('.npmrc', ['shamefully-hoist=true'], isAutoRun,
          'This will adjust \'.npmrc\' file in your project. Continue?')
      } else {
        await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/tags/v0.5.3/core/.npmrc',
          '.npmrc', isAutoRun, 'This will add \'.npmrc\' file for your project. Continue?')
      }
    } catch (error) {
      console.error('Error setting \'.npmrc\':\n', error.message)
    }
  }

  // 4 - .gitignore file
  try {
    await updateTextFile('.gitignore', [
      '',
      '# Nuxt Ignis files',
      '# configuration overview created upon Nuxt Ignis start',
      '_ignis-config.json',
    ], isAutoRun, 'This will add Nuxt Ignis-related entries into your \'.gitignore\'. Continue?')
  } catch (error) {
    console.error('Error updating .gitignore file:\n', error.message)
  }

  // 5) nuxt-spec related setup
  const setupNuxtSpec = isAutoRun || await promptUser('Nuxt Ignis comes with support for testing. Do you want to set up the default test settings now?')
  if (setupNuxtSpec) {
    // create vitest.config.ts
    try {
      await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-spec/refs/tags/v0.2.0-alpha.2/config/vitest.config.ts.template',
        'vitest.config.ts', true, 'This will create a new \'vitest.config.ts\' file for your project. Continue?')
    } catch (error) {
      console.error('Error setting up \'vitest.config.ts\':\n', error.message)
    }

    // add scripts for running tests into package.json
    try {
      await updateJsonFile('package.json', 'scripts', {
        'test': 'vitest run',
        'test-u': 'vitest run -u',
        'test-i': 'vitest',
      }, true, 'This will adjust the test-related commands in your \'package.json\'. Continue?')
    } catch (error) {
      console.error('Error adjusting scripts in \'package.json\':\n', error.message)
    }

    // create sample test files
    const createSampleTests = isAutoRun || await promptUser('Do you want to create sample tests in \'/test\' folder?')
    if (createSampleTests) {
      try {
        await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-spec/refs/tags/v0.2.0-alpha.2/test/e2e/nuxt-e2e.test.ts',
          'test/e2e/nuxt-e2e.test.ts', true)
      } catch (error) {
        console.error('Error setting up \'nuxt-e2e.test.ts\':\n', error.message)
      }
      try {
        await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-spec/refs/tags/v0.2.0-alpha.2/test/nuxt/nuxt-unit.test.ts',
          'test/nuxt/nuxt-unit.test.ts', true)
      } catch (error) {
        console.error('Error setting up \'nuxt-unit.test.ts\':\n', error.message)
      }
      try {
        await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-spec/refs/tags/v0.2.0-alpha.2/test/unit/vitest.test.ts',
          'test/unit/vitest.test.ts', true)
      } catch (error) {
        console.error('Error setting up \'vitest.test.ts\':\n', error.message)
      }
    }
  }

  // 6) clear node_modules and lock file(s)
  const prepareForReinstall = isAutoRun || await promptUser('Dependencies should be re-installed now. Do you want to remove node_modules and the lock file?')
  if (prepareForReinstall) {
    if (pathExists('node_modules')) {
      try {
        await deletePath('node_modules', true)
      } catch (error) {
        console.error('Error deleting \'node_modules\':\n', error.message)
      }
    }
    if (pathExists('package-lock.json')) {
      try {
        await deletePath('package-lock.json', true)
      } catch (error) {
        console.error('Error deleting \'package-lock.json\':\n', error.message)
      }
    }
    if (pathExists('pnpm-lock.yaml')) {
      try {
        await deletePath('pnpm-lock.yaml', true)
      } catch (error) {
        console.error('Error deleting \'pnpm-lock.yaml\':\n', error.message)
      }
    }
    if (pathExists('yarn.lock')) {
      try {
        await deletePath('yarn.lock', true)
      } catch (error) {
        console.error('Error deleting \'yarn.lock\':\n', error.message)
      }
    }
    if (pathExists('bun.lockb')) {
      try {
        await deletePath('bun.lockb', true)
      } catch (error) {
        console.error('Error deleting \'bun.lockb\':\n', error.message)
      }
    }
    if (pathExists('deno.lock')) {
      try {
        await deletePath('deno.lock', true)
      } catch (error) {
        console.error('Error deleting \'deno.lock\':\n', error.message)
      }
    }
  }

  // 7) inform user
  showMessage('')
  showMessage('NUXT IGNIS SETUP COMPLETE', 2)
  showMessage(`Proceed with \`${packageManager} install\` to get started.`)

  // make sure the process won't hang
  process.exit(0)
}
