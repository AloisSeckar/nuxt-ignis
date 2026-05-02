import { loadVitestConfig } from 'nuxt-spec/config'

export default loadVitestConfig({
  test: {
    fileParallelism: false,
    testTimeout: 10000,
  },
}, false)
