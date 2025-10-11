#!/usr/bin/env node

import { createFileFromWebTemplate } from 'elrh-cosca'

/**
 * CLI tool to create an ESLint configuration file with Nuxt Ignis defaults.
 *
 * Usage: `npx nuxt-ignis set-eslint` in target folder.
 */
export async function setESLint() {
  try {
    await createFileFromWebTemplate('https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/heads/main/core/eslint.config.mjs', 'eslint.config.mjs')
  } catch (error) {
    console.error('Error creating ESLint config file:\n', error.message)
  }
}
