#!/usr/bin/env node

import { createFileFromWebTemplate } from 'elrh-cosca'

/**
 * CLI tool to create Nuxt default app.vue file to allow adjusting it.
 * The file will be created as `app/app.vue` folder.
 * In the final build, it will override the baked-in default.
 *
 * Usage: `npx nuxt-ignis set-app-vue` in target folder.
 */
export async function setAppVue() {
  try {
    await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/tags/v0.5.1/core/app/app.vue', 'app/app.vue')
  } catch (error) {
    console.error('Error creating Ignis `app.vue` file:\n', error.message)
  }
  // make sure the process won't hang
  process.exit(0)
}
