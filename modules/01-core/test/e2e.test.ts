import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr e2e test', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
  })

  test('should render the playground index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h1>@nuxt-ignis/core</h1>')
  })
})
