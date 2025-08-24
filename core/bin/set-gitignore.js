#!/usr/bin/env node

// CLI tool to add Nuxt Ignis-related files into .gitignore
// usage: `npx set-gitignore` in target folder

import { updateTextFile } from 'elrh-cosca'

async function main() {
  await updateTextFile('.gitignore', [
    '',
    '# Nuxt Ignis files',
    '# configuration overview created upon Nuxt Ignis start',
    '_ignis-config.json',
  ])
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
