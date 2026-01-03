#!/usr/bin/env node

import { createFileFromWebTemplate } from 'elrh-cosca'

/**
 * CLI tool to create Nuxt default CSS file to allow adjusting it.
 * The file will be created as `app/assets/css/ignis.css` folder.
 * In the final build, it will override the baked-in default.
 *
 * Usage: `npx nuxt-ignis set-css` in target folder.
 */
export async function setCSS() {
  try {
    await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/tags/v0.5.3/core/app/assets/css/ignis.css', 'app/assets/css/ignis.css')
  } catch (error) {
    console.error('Error creating Ignis CSS file:\n', error.message)
  }
  // make sure the process won't hang
  process.exit(0)
}
