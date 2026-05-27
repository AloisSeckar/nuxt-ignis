#!/usr/bin/env node

import { createFileFromWebTemplate } from 'elrh-cosca'

/**
 * CLI tool to create default `.vscode/settings.json` file.
 * The file will be created in the `.vscode` folder.
 * In the final build, it will override the baked-in default.
 *
 * Usage: `npx nuxt-ignis set-vscode` in target folder.
 */
export async function setVSCode() {
  try {
    await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/tags/v0.6.0-rc.2/core/bin/templates/vscode-settings.json.template', '.vscode/settings.json')
  } catch (error) {
    console.error('Error creating VS Code settings file:\n', error.message)
  }
  // make sure the process won't hang
  process.exit(0)
}
