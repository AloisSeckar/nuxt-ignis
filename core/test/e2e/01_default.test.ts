import { fileURLToPath } from 'node:url'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, expect, test } from 'vitest'
import { compareScreenshot } from 'nuxt-spec/utils'

describe('demos/01_default', async () => {
  // start the Nuxt application
  await setup({
    rootDir: fileURLToPath(new URL('../../../demos/01_default', import.meta.url)),
  })

  test('_ignis-welcome matches screenshot', async () => {
    const page = await createPage()
    await page.goto(url('/_ignis-welcome'), { waitUntil: 'hydration' })

    expect(await compareScreenshot(page, { fileName: 'header.jpg', selector: '#ignis-header' })).toEqual(true)
    expect(await compareScreenshot(page, { fileName: 'welcome.jpg', selector: '#ignis-welcome' })).toEqual(true)
  })

  test('_ignis-info matches screenshot', async () => {
    const page = await createPage()
    await page.goto(url('/_ignis-info'), { waitUntil: 'hydration' })

    expect(await compareScreenshot(page, { fileName: 'info.jpg', selector: '#ignis-info' })).toEqual(true)
  })

  test('_ignis-config matches screenshot', async () => {
    const page = await createPage()
    await page.goto(url('/_ignis-config'), { waitUntil: 'hydration' })

    expect(await compareScreenshot(page, { fileName: 'config.jpg', selector: '#ignis-config' })).toEqual(true)
  })
})
