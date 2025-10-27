#!/usr/bin/env node

import { getPackageManager } from 'elrh-cosca'

/**
 * CLI tool to scaffold necessary adjustments in project folder.
 *
 * Supported commands:
 * `setup` - setup Nuxt Ignis in current folder
 * `set-css` - scaffolds default CSS file to allow editing it
 * `set-eslint` - scaffolds default ESLint config file to allow editing it
 * `set-app-vue` - scaffolds default app/app.vue file to allow editing it
 *
 * Second parameter for `setup` might be a boolean to indicate auto mode
 * (no prompts, force = true) or manual mode (with prompts, force = false).
 */

// get parameters passed by user
const args = process.argv.slice(2);

// execute actions based on first param
// additional params might be passed into the called functions
(async () => {
  let status = 0
  try {
    switch (args[0]) {
      case 'setup':
        await (await import('./setup.js')).nuxtIgnisSetup(args[1] || false)
        break
      case 'set-css':
        await (await import('./set-css.js')).setCSS()
        break
      case 'set-eslint':
        await (await import('./set-eslint.js')).setESLint()
        break
      case 'set-app-vue':
        await (await import('./set-app-vue.js')).setAppVue()
        break
      default:
        console.log(`Usage: \`${getCmd()} nuxt-ignis setup|set-css|set-eslint|set-app-vue [true|false]\``)
        status = 1
    }
  } catch (error) {
    console.error('Unexpected Nuxt Ignis error:', error.message)
    status = 1
  }
  process.exit(status)
})()

// try detecting what package manager was used
// to give user apropriate usage hint
function getCmd() {
  const packageManager = getPackageManager()
  switch (packageManager) {
    case 'pnpm':
      return 'pnpx'
    case 'yarn':
      return 'yarn dlx'
    case 'bun':
      return 'bunx'
    case 'deno':
      return 'deno run --allow-run npm:npx'
    default:
      return 'npx'
  }
}
