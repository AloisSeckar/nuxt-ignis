import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { compareScreenshot } from 'nuxt-spec/utils'

export async function testDemo(demo: string) {
  describe(`demos/${demo}`, async () => {
  // start the Nuxt application
  // @ts-expect-error nitro is typed as `never` in @nuxt/schema, but it is required
  // to correctly point the test to pre-built output folder
    await setup(getSetupConfig(demo))

    // check that demo started and index page is rendered as expected

    test('index page renders correctly', async () => {
      await testIndexPage(demo)
    })
  })
}

function getSetupConfig(demo: string) {
  return {
    rootDir: fileURLToPath(new URL(`../../../demos/${demo}`, import.meta.url)),
    server: true,
    // we point to pre-built outputs of demo apps for faster tests
    build: false,
    nuxtConfig: {
      nitro: {
        output: {
          dir: fileURLToPath(new URL(`../../../demos/${demo}/.output`, import.meta.url)),
        },
      },
    },
    env: {
      // required to avoid error from nuxt-auth-utils
      NUXT_SESSION_PASSWORD: '0123456789abcdef0123456789abcdef',
    },
  }
}

async function testIndexPage(demo: string) {
  const page = await createPage(undefined, { viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
  await page.goto(url('/'), { waitUntil: 'hydration' })

  // by default visual tests allow 2% difference in pixels due to cross-platform differences
  // can be adjusted on 0-1 scale by setting VITE_TEST_DIFF_RATIO in .env file
  const diffRatio = process.env.VITE_TEST_DIFF_RATIO ? parseFloat(process.env.VITE_TEST_DIFF_RATIO) : 0.02

  // @ts-expect-error - the type of `page` is correct
  expect(await compareScreenshot(page, { fileName: `${demo}-index.jpg`, maxDiffPixelRatio: diffRatio })).toEqual(true)
}
