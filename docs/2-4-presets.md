# Presets

For common functional areas of webapps you can choose from more than one option using special _"preset"_ configuration variables.

## Existing presets

The list of available presets currently includes:

### UI preset

It is possible to pick from three options:

- `nuxt-ui` - full <https://ui.nuxt.com/> via `@nuxt/ui` connector module **[RECOMMENDED]**
- `tailwind` - only <https://tailwindcss.com/> via `@nuxtjs/tailwindcss` connector module
- `off` - no UI library preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_UI` env variable.

You can still use individual settings for `nuxt-ui` and  `tailwind` modules (check [optional modules](/2-3-optional-features.html#optional-modules) section).

**NOTE:** Currently, this isn't actually _"one or another"_, as `nuxt-ui` is including `tailwind` (v4) automatically.

### Database preset

It is possible to pick from three options:

- `neon` - <https://neon.tech/> via `nuxt-neon` connector module **[RECOMMENDED]**
- `supabase` - <https://supabase.com/> via `@nuxtjs/supabase` connector module
- `off` - no database module preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_DB` env variable.

You can still use individual settings for `neon` and  `supabase` modules (check [optional modules](/2-3-optional-features.html#optional-modules) section).

### Forms preset

It is possible to pick from three options:

- `vueform` - <https://vueform.com/> via `@vueform/nuxt` connector module **[RECOMMENDED]**
- `formkit` - <https://formkit.com/> via `@formkit/nuxt` connector module
- `off` - no forms module preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_FORMS` env variable.

You can still use individual settings for `vueform` and  `formkit` modules (check [optional modules](/2-3-optional-features.html#optional-modules) section).

### Validation preset

It is possible to pick from three options:

- `valibot` - schema validation via <https://valibot.dev/>
- `zod` - schema validation via <https://zod.dev/>
- `off` - no validation module preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_VALIDATION` env variable.

You can still use individual settings for `valibot` and  `zod` modules (check [optional features](/2-3-optional-features.html#optional-features) section).

## Warning for duplicates

By default, Nuxt Ignis doesn't recommend mixing preset solutions. If for example both `Neon` and `Supabase` database solutions are used, a warning will be triggered on startup. For use cases when having both variants together is appropriate and desired, you can set `process.env.NUXT_PUBLIC_IGNIS_WARN_DUPLICATES=false` to suppress this warning.
