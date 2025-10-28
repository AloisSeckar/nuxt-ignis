import { describe, expect, test } from 'vitest'
import { hasText } from 'elrh-cosca'
import app from '../../core/package.json' assert { type: 'json' }

// extract the versions from package.json
const { version, dependencies, packageManager } = app

// Nuxt Ignis

const ignisLink = `https://github.com/AloisSeckar/nuxt-ignis/blob/v${version}/`

describe(`Nuxt Ignis links should lead to same version tag as in package.json (${version})`, () => {
  test('2-1-configuration.md', () => {
    expect(hasText('2-1-configuration.md', ignisLink)).toBe(true)
  })

  test('3-2-features-ui.md', () => {
    expect(hasText('3-2-features-ui.md', ignisLink)).toBe(true)
  })

  test('3-4-features-forms.md', () => {
    expect(hasText('3-4-features-forms.md', ignisLink)).toBe(true)
  })

  test('3-6-features-content.md', () => {
    expect(hasText('3-6-features-content.md', ignisLink)).toBe(true)
  })

  test('3-9-features-devex.md', () => {
    expect(hasText('3-9-features-devex.md', ignisLink)).toBe(true)
  })

  test('3-11-features-built-ins.md', () => {
    expect(hasText('3-11-features-built-ins.md', ignisLink)).toBe(true)
  })

  test('3-12-features-cli.md', () => {
    expect(hasText('3-12-features-cli.md', ignisLink)).toBe(true)
  })
})

describe(`Nuxt Ignis version should be the same as in package.json (${version})`, () => {
  test('1-4-installation.md', () => {
    expect(hasText('1-4-installation.md', `"nuxt-ignis": "${version}"`)).toBe(true)
  })
})

// Nuxt Spec

const specVersion = dependencies['nuxt-spec']
const specLink = `https://github.com/AloisSeckar/nuxt-spec/blob/v${specVersion}/`

describe(`Nuxt Spec links should lead to same version tag as in package.json (${specVersion})`, () => {
  test('1-4-installation.md', () => {
    expect(hasText('1-4-installation.md', specLink)).toBe(true)
  })
})

// pnpm

const pnpmVersion = packageManager?.split('@')[1] || 'unknown'

describe(`pnpm version should be the same as in package.json (${pnpmVersion})`, () => {
  test('1-4-installation.md', () => {
    expect(hasText('1-4-installation.md', `"packageManager": "pnpm@${pnpmVersion}"`)).toBe(true)
  })
})
