import { fileURLToPath } from 'node:url'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, expect, test } from 'vitest'
import { compareScreenshot } from 'nuxt-spec/utils'

// by default visual tests allow 2% difference in pixels due to cross-platform differences
// can be adjusted on 0-1 scale by setting VITE_TEST_DIFF_RATIO in .env file
const diffRatio = process.env.VITE_TEST_DIFF_RATIO ? parseFloat(process.env.VITE_TEST_DIFF_RATIO) : 0.02
console.log(`Visual tests allowed diff ratio: ${diffRatio}`)

describe('demos/01-02-bare', async () => {
  // start the Nuxt application
  await setup({
    rootDir: fileURLToPath(new URL('../../../demos/01-02-bare', import.meta.url)),
    build: false,
    server: true,
    nuxtConfig: {
      nitro: {
        output: {
          dir: fileURLToPath(new URL('../../../demos/01-02-bare/.output', import.meta.url)),
        },
      },
    },
  })

  // VISUAL TESTS

  test('_ignis-info matches screenshot', async () => {
    const page = await createPage()
    await page.setViewportSize({ width: 1280, height: 720 }) // important for consistent results!
    await page.goto(url('/_ignis-info'), { waitUntil: 'hydration' })

    expect(await compareScreenshot(page, { fileName: '01-02-info.jpg', selector: '#ignis-info', maxDiffPixelRatio: diffRatio })).toEqual(true)
  })

  test('_ignis-config matches screenshot', async () => {
    const page = await createPage()
    await page.setViewportSize({ width: 1280, height: 720 }) // important for consistent results!
    await page.goto(url('/_ignis-config'), { waitUntil: 'hydration' })

    expect(await compareScreenshot(page, { fileName: '01-02-config.jpg', selector: '#ignis-config', maxDiffPixelRatio: diffRatio })).toEqual(true)
  })

  // ADDITIONAL DOM-only TESTS

  test('features - @nuxt/image', async () => {
    const page = await createPage()
    await page.goto(url('/feat-image'), { waitUntil: 'hydration' })
    const html = await page.content()
    expect(html).not.toContain('alt="NuxtImg demo image"')
    expect(html).toContain('Image module is not enabled')
  })
})
