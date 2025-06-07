// TEMPORARY FIX for https://github.com/tailwindlabs/tailwindcss/discussions/16119
export const ignisTailwindcssFix = {
  name: 'vite-plugin-ignore-sourcemap-warnings',
  apply: 'build',
  // @ts-expect-error no-implicit-any
  configResolved(config) {
    // @ts-expect-error no-implicit-any
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
