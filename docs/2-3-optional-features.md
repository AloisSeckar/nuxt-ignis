# Optional features

So-called _"optional features"_ are disabled by default in Nuxt Ignis. You can turn them on via environment variables.

## Presets

Some of the optional solutions are meant to be alternatives. Nuxt Ignis defines simplified configuration _"presets"_ for such cases. Learn more about this concept in [presets section](/2-4-presets).

However, you are not limited to presets only. Every optional module or feature can be enabled individually.

## Optional modules

Currently, following modules are optional to use:
- `@nuxt/ui` - set `NUXT_PUBLIC_IGNIS_UI` to `true | false`
- `@nuxtjs/tailwindcss` - set `NUXT_PUBLIC_IGNIS_TAILWIND` to `true | false` (ignored if `NUXT_PUBLIC_IGNIS_UI=true`)
- `nuxt-neon` - set `NUXT_PUBLIC_IGNIS_NEON` to `true | false`
- `@nuxtjs/supabase` - set `NUXT_PUBLIC_IGNIS_SUPABASE` to `true | false`
- `@nuxtjs/i18n` - set `NUXT_PUBLIC_IGNIS_I18N_ENABLED` to `true | false`
- `@formkit/nuxt` - set `NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED` to `true | false`
- `@vueform/nuxt` - set `NUXT_PUBLIC_IGNIS_VUEFORM` to `true | false`
- `@nuxt/content` - set `NUXT_PUBLIC_IGNIS_CONTENT` to `true | false`
- `@nuxtjs/seo` - set `NUXT_PUBLIC_IGNIS_SEO` to `true | false` 
- `nuxt-auth-utils` - set `NUXT_PUBLIC_IGNIS_AUTH` to `true | false` 

Default values are **false** (not included) for all optional modules.

## Optional features

Currently, following extra features (not using separate Nuxt Modules) are optional:
- `valibot` - set `NUXT_PUBLIC_IGNIS_VALIBOT` to `true | false`
- `zod` - set `NUXT_PUBLIC_IGNIS_ZOD` to `true | false`
- `Open Props CSS` - set `NUXT_PUBLIC_IGNIS_OPENPROPS` to `true | false`
- `Vue Equipment` - set `NUXT_PUBLIC_IGNIS_EQUIPMENT_ENABLED` to `true | false`
- `elrh-pslo` - set `NUXT_PUBLIC_IGNIS_PSLO_ENABLED` to `true | false`

Default values are **false** (not included) for all optional features.

## More info

- See details about technologies available via Nuxt Ignis in [Features section](/3-1-features).
