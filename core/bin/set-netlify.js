#!/usr/bin/env node

import { createFileFromWebTemplate } from 'elrh-cosca'

/**
 * CLI tool to create default `netlify.toml` file.
 * The file will be created in the root folder.
 * In the final build, it will override the baked-in default.
 *
 * Usage: `npx nuxt-ignis set-netlify` in target folder.
 */
export async function setNetlify() {
  try {
    await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/tags/v0.5.3/core/bin/templates/netlify.toml.template', 'netlify.toml')
  } catch (error) {
    console.error('Error creating Netlify TOML file:\n', error.message)
  }
  // make sure the process won't hang
  process.exit(0)
}
