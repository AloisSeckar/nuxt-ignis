import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'
import { hasText } from 'elrh-cosca'
import app from '../../package.json' with { type: 'json' }

const { version, packageManager, config } = app

// Nuxt Ignis version - should match package.json

const ignisLink = `https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/tags/v${version}/`

describe(`Nuxt Ignis links should lead to same version tag as in package.json (${version})`, () => {
  test('set-app-vue.js', () => {
    expect(hasText('bin/set-app-vue.js', ignisLink)).toBe(true)
  })

  test('set-css.js', () => {
    expect(hasText('bin/set-css.js', ignisLink)).toBe(true)
  })

  test('set-eslint.js', () => {
    expect(hasText('bin/set-eslint.js', ignisLink)).toBe(true)
  })

  test('set-netlify.js', () => {
    expect(hasText('bin/set-netlify.js', ignisLink)).toBe(true)
  })

  test('setup.js', () => {
    expect(hasText('bin/setup.js', ignisLink)).toBe(true)
  })
})

describe(`Nuxt Ignis version should be the same as in package.json (${version})`, () => {
  test('setup.js', () => {
    expect(hasText('bin/setup.js', `{ 'nuxt-ignis': '${version}' }`)).toBe(true)
  })
})

// pnpm version - should match package.json

const pnpmVersion = packageManager?.split('@')[1] || 'unknown'

describe(`pnpm version should be the same as in package.json (${pnpmVersion})`, () => {
  test('setup.js', () => {
    expect(hasText('bin/setup.js', `'packageManager', 'pnpm@${pnpmVersion}'`)).toBe(true)
  })
})

// compatbility date - should match package.json

const date = config?.date || 'unknown'

describe(`nuxt.config.ts compatibilityDate should be the same as in package.json (${date})`, () => {
  test('setup.js', () => {
    expect(hasText('nuxt.config.ts', `compatibilityDate: '${date}',`)).toBe(true)
  })
})

// Nuxt Spec version - should match pnpm catalog

const workspaceYaml = readFileSync(resolve(__dirname, '../../../pnpm-workspace.yaml'), 'utf-8')
const specVersion = workspaceYaml.match(/'nuxt-spec':\s*(.+)/)?.[1]?.trim()

const specLink = `https://raw.githubusercontent.com/AloisSeckar/nuxt-spec/refs/tags/v${specVersion}/`

describe(`Nuxt Spec links should lead to same version tag as in package.json (${specVersion})`, () => {
  test('setup.js', () => {
    expect(hasText('bin/setup.js', specLink)).toBe(true)
  })
})
