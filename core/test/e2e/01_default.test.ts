import { fileURLToPath } from 'node:url'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, expect, test } from 'vitest'
import { compareScreenshot } from 'nuxt-spec/utils'

describe('demos/01_default', async () => {
  // start the Nuxt application
  await setup({
    rootDir: fileURLToPath(new URL('../../../demos/01_default', import.meta.url)),
  })

  test('Home page matches screenshot', async () => {
    const page = await createPage()
    await page.goto(url('/'), { waitUntil: 'hydration' })

    expect(await compareScreenshot(page, 'index.jpg')).toEqual(true)
  })

  test('_ignis-info matches screenshot', async () => {
    const page = await createPage()
    await page.goto(url('/_ignis-info'), { waitUntil: 'hydration' })

    expect(await compareScreenshot(page, 'info.jpg')).toEqual(true)
  })

  test('_ignis-config matches screenshot', async () => {
    const page = await createPage()
    await page.goto(url('/_ignis-config'), { waitUntil: 'hydration' })

    expect(await compareScreenshot(page, 'config.jpg')).toEqual(true)
  })
})
