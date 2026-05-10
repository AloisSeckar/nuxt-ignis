import type { Plugin } from 'vite'

// TEMPORARY FIX for https://github.com/tailwindlabs/tailwindcss/discussions/16119
export function ignisTailwindFix(): Plugin {
  return {
    name: 'nuxt-ignis:ignore-tailwind-sourcemap-warnings',
    apply: 'build',
    configResolved(config) {
      config.build.rollupOptions.onwarn = (warning, warn) => {
        if (
          warning.code === 'SOURCEMAP_BROKEN'
          && warning.plugin === '@tailwindcss/vite:generate:build'
        ) {
          return
        }

        warn(warning)
      }
    },
  }
}
