# Optional features

So-called _"optional features"_ are disabled by default in Nuxt Ignis. You can turn them on via environment variables.

## Presets

Some of the optional solutions are meant to be alternatives. Nuxt Ignis defines simplified configuration _"presets"_ for such cases. Learn more about this concept in [presets section](/2-4-presets).

However, you are not limited to presets only. Every optional module or feature can be enabled individually.

## Optional modules

Currently, following modules are optional to use:

- [`@nuxt/ui`](/3-2-features-ui.html#nuxt-ui) - set `NUXT_PUBLIC_IGNIS_UI` to `true | false`
- [`@nuxtjs/tailwindcss`](/3-2-features-ui.html#tailwindcss) - set `NUXT_PUBLIC_IGNIS_TAILWIND` to `true | false` (ignored if `NUXT_PUBLIC_IGNIS_UI=true`)
- [`nuxt-neon`](/3-3-features-db.html#neon) - set `NUXT_PUBLIC_IGNIS_NEON` to `true | false`
- [`@nuxtjs/supabase`](/3-3-features-db.html#supabase) - set `NUXT_PUBLIC_IGNIS_SUPABASE_ENABLED` to `true | false`
- [`@vueform/nuxt`](/3-4-features-forms.html#vueform) - set `NUXT_PUBLIC_IGNIS_VUEFORM` to `true | false`
- [`@formkit/nuxt`](/3-4-features-forms.html#formkit) - set `NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED` to `true | false`
- [`@nuxt/content`](/3-6-features-content.html#nuxt-content) - set `NUXT_PUBLIC_IGNIS_CONTENT` to `true | false`
- [`@nuxtjs/i18n`](/3-6-features-content.html#i18n) - set `NUXT_PUBLIC_IGNIS_I18N_ENABLED` to `true | false`
- [`@nuxtjs/seo`](/3-7-features-utils.html#nuxt-seo) - set `NUXT_PUBLIC_IGNIS_SEO` to `true | false`
- [`@stefanobartoletti/nuxt-social-share`](/3-7-features-utils.html#nuxt-social-share) - set `NUXT_PUBLIC_IGNIS_SOCIAL_ENABLED` to `true | false`
- [`magic-regexp`](/3-7-features-utils.html#magic-regexp) - set `NUXT_PUBLIC_IGNIS_REGEXP` to `true | false`
- [`nuxt-charts`](/3-2-features-ui.html#nuxt-charts) - set `NUXT_PUBLIC_IGNIS_CHARTS` to `true | false`

Default values are **false** (not included) for all optional modules.

## Extra features

Currently, following extra features (not using separate Nuxt Modules) are optional:

- [`zod`](/3-5-features-validation.html#zod) - set `NUXT_PUBLIC_IGNIS_ZOD` to `true | false`
- [`valibot`](/3-5-features-validation.html#valibot) - set `NUXT_PUBLIC_IGNIS_VALIBOT` to `true | false`
- [`Open Props CSS`](/3-2-features-ui.html#open-props) - set `NUXT_PUBLIC_IGNIS_OPENPROPS` to `true | false`
- [`Vue Equipment`](/3-7-features-utils.html#vueequipment) - set `NUXT_PUBLIC_IGNIS_EQUIPMENT_ENABLED` to `true | false`
- [`elrh-pslo`](/3-6-features-content.html#pslo) - set `NUXT_PUBLIC_IGNIS_PSLO_ENABLED` to `true | false`

Default values are **false** (not included) for all optional features.

## More info

- See details about technologies available via Nuxt Ignis in [features section](/3-1-features).
