import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { hasText } from 'elrh-cosca'
import app from '../package.json' assert { type: 'json' }

// extract the versions from package.json
const { version, config, packageManager } = app

// Nuxt Ignis

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

  test('setup.js', () => {
    expect(hasText('bin/setup.js', ignisLink)).toBe(true)
  })
})

describe(`Nuxt Ignis version should be the same as in package.json (${version})`, () => {
  test('setup.js', () => {
    expect(hasText('bin/setup.js', `{ 'nuxt-ignis': '${version}' }`)).toBe(true)
  })
})

// Nuxt Spec

// parse nuxt-spec version from pnpm-workspace.yaml catalog
const workspaceYaml = readFileSync(new URL('../../pnpm-workspace.yaml', import.meta.url), 'utf-8')
const nuxtSpecMatch = workspaceYaml.match(/^\s+nuxt-spec:\s+(.+)$/m)
const specVersion = nuxtSpecMatch?.[1]?.trim() || 'unknown'

const specLink = `https://raw.githubusercontent.com/AloisSeckar/nuxt-spec/refs/tags/v${specVersion}/`

describe(`Nuxt Spec links should lead to same version tag as in package.json (${specVersion})`, () => {
  test('setup.js', () => {
    expect(hasText('bin/setup.js', specLink)).toBe(true)
  })
})

// pnpm

const pnpmVersion = packageManager?.split('@')[1] || 'unknown'

describe(`pnpm version should be the same as in package.json (${pnpmVersion})`, () => {
  test('setup.js', () => {
    expect(hasText('bin/setup.js', `'packageManager', 'pnpm@${pnpmVersion}'`)).toBe(true)
  })
})

// compatbility date

const date = config?.date || 'unknown'

describe(`nuxt.config.ts compatibilityDate should be the same as in package.json (${date})`, () => {
  test('setup.js', () => {
    expect(hasText('nuxt.config.ts', `compatibilityDate: '${date}',`)).toBe(true)
  })
})
