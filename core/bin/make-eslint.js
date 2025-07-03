#!/usr/bin/env node

// CLI tool to create an ESLint configuration file with Nuxt Ignis defaults
// usage: `npx make-eslint` in target folder

import { existsSync } from 'fs'
import { copyFile } from 'fs/promises'
import path from 'path'
import readline from 'readline'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const templatePath = path.resolve(__dirname, '../eslint.config.mjs')
const targetPath = path.resolve(process.cwd(), 'eslint.config.mjs')

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(question + ' (y/N): ', (answer) => {
      rl.close()
      resolve(/^y(es)?$/i.test(answer.trim()))
    })
  })
}

async function main() {
  if (!existsSync(templatePath)) {
    console.error(`Template file not found at ${templatePath}`)
    process.exit(1)
  }

  if (existsSync(targetPath)) {
    const shouldOverwrite = await prompt(
      `'eslint.config.mjs' already exists. Overwrite?`,
    )
    if (!shouldOverwrite) {
      console.log('Aborted.')
      process.exit(0)
    }
  }

  await copyFile(templatePath, targetPath)
  console.log('eslint.config.mjs created successfully.')
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
