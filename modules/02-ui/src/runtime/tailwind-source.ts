import type { Plugin } from 'vite'

// Includes `source()` directive into `@import "tailwindcss"` statements of CSS files.
// Otherwise Tailwind source detection would stuggle in certain scenarios
// (i.e. when used within .md files processed via @nuxt/content).
// Must run BEFORE @tailwindcss/vite (enforce: 'pre').
export function ignisTailwindSource(rootDir: string): Plugin {
  return {
    name: 'nuxt-ignis:tailwind-source-rewrite',
    enforce: 'pre',
    transform(code, id) {
      // strip any Vite query suffix (e.g. ?vue&type=style) before matching
      const file = id.split('?', 1)[0]

      // only apply to following files:
      const targets = ['ignis-tailwind.css', 'ignis-nuxt-ui.css']
      if (!targets.some(t => file?.endsWith(t))) return

      // match the import statement and augment it with runtime source path
      const re = /@import\s+(["'])tailwindcss\1(?!\s*source\b)\s*;/g
      if (!re.test(code)) return
      re.lastIndex = 0
      return {
        code: code.replace(re, `@import "tailwindcss" source("${rootDir}");`),
        map: null,
      }
    },
  }
}
