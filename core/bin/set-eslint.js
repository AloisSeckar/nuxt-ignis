#!/usr/bin/env node

// CLI tool to create an ESLint configuration file with Nuxt Ignis defaults
// usage: `npx set-eslint` in target folder

import { createFileFromTemplate } from 'elrh-cosca'

async function main() {
  await createFileFromTemplate('eslint.config.mjs', 'eslint.config.mjs')
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
