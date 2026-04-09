import type { IgnisOptions } from '../02-features'

export function checkForDuplicateModules(ignis: IgnisOptions) {
  // UI
  if (ignis.ui?.ui === true && ignis.ui?.tailwind === true) {
    console.warn('You have both Nuxt UI and Tailwind CSS active. Nuxt Ignis is ignoring Tailwind CSS setting, as Nuxt UI already includes it. If this is intentional, you can set `ignis.config.warn.duplicates` to `false` to surpress this warning.')
  }

  // DB
  if (ignis.db?.neon?.enabled === true && ignis.db?.supabase?.enabled === true) {
    console.warn('You have both DB connector modules (Neon and Supabase) active, which is not recommended. If this is intentional, you can set `ignis.config.warn.duplicates` to `false` to surpress this warning.')
  }

  // Forms
  if (ignis.forms?.vueform?.enabled === true && ignis.forms?.formkit?.enabled === true) {
    console.warn('You have both Form solution provider modules (Vueform and Formkit) active, which is not recommended. If this is intentional, you can set `ignis.config.warn.duplicates` to `false` to surpress this warning.')
  }

  // Validation
  if (ignis.validation?.zod === true && ignis.validation?.valibot === true) {
    console.warn('You have both validation libraries (Zod and Valibot) active, which is not recommended. If this is intentional, you can set `ignis.config.warn.duplicates` to `false` to surpress this warning.')
  }
}

export const x = {
  config:
   { html: { lang: 'en', title: 'Nuxt Ignis App' },
     nuxt: { ssr: true, pages: true, css: '', error: true },
     log: { level: 'info' },
     warn: { duplicates: true },
   },
  core:
   { eslint: false,
     fonts: false,
     image: false,
     scripts: false,
     security: false,
     auth: false,
     vueuse: false,
     pinia: false,
     css: false },
  preset: { ui: 'off', db: 'off', forms: 'off', validation: 'off' },
  ui: { ui: false, tailwind: false, openprops: false, charts: false },
  db: { neon: { enabled: false }, supabase: { enabled: false, types: false } },
  forms:
   { formkit: { enabled: false, default: '', config: '' },
     vueform: { enabled: false } },
  validation: { zod: false, valibot: false },
  content:
   { content: { enabled: false },
     i18n: { enabled: false, default: '' },
     seo: { enabled: false },
     social: { enabled: false, url: '' },
     pslo: { enabled: false, content: false } },
  utils:
   { equipment: { enabled: false, composables: '', plugins: '' },
     regexp: { enabled: false } },
}
