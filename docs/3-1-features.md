# Nuxt Ignis features
This section contains the full list of NPM packages included in Nuxt Ignis.

## Packages of root features
| Package | Version | Description |
| --- | --- | :-- |
| `nuxt` | `3.17.5` | Underlying Nuxt application itself |
| `vue` | `3.5.16` | Explicit devDependency due to [Netlify behavior](https://github.com/nuxt/nuxt/discussions/30187) |
| `vue-router` | `4.5.1` | Explicit devDependency due to [Netlify behavior](https://github.com/nuxt/nuxt/discussions/30187) |
| `typescript` | `5.8.3` | Explicit dependency, mainly due to correct `eslint` functionality |
| `defu` | `6.1.4` | Used for merging user configurations with defaults |
| `date-fns` | `4.1.0` | Used to get timestamps in readable format |
| `consola` | `3.4.2` | Improved centralized logging solution |
| `nuxt-spec` | `0.0.4` | Experimental aggregated testing solution (`vitest` && `playwright` && Nuxt/Vue test utils) |

## Packages of core features
| Package | Version | Description |
| --- | --- | :-- |
| `@nuxt/eslint` | `1.4.1` | Official module for code linting via `eslint` |
| `@nuxt/fonts` | `0.11.4` | Official module for working with web fonts |
| `@nuxt/image` | `1.10.0` | Official module for optimizing images |
| `@nuxt/scripts` | `0.11.8` | Official module for integrating 3rd party scripts |
| `nuxt-security` | `2.2.0` | Module for establishing best security practices |
| `@vueuse/core` | `13.3.0` | Collection of handy Vue utility functions |
| `@vueuse/nuxt` | `13.3.0` | Nuxt connector for `VueUse` |
| `pinia` | `0.11.1` | Current ecosystem standard for state management |
| `@pinia/nuxt` | `0.11.1` | Nuxt connector for `pinia` |

## Packages of optional modules
| Package | Version | Description |
| --- | --- | :-- |
| `@nuxt/ui` | `3.1.3` | Official UI library for Nuxt (free version) |
| `@nuxtjs/tailwindcss` | `6.14.0` | Connector module for `Tailwind CSS` (**TEMP DISABLED**) |
| `@tailwindcss/vite` | `4.1.8` | Vite connector for `Tailwind CSS` (**TEMP WORKAROUND**) |
| `nuxt-neon` | `0.6.2` | Connector module for `Neon` database |
| `@nuxtjs/supabase` | `1.5.1` | Connector module for `Supabase` database |
| `@vueform/nuxt` | `1.15.0` | Connector module for `Vueform` form builder |
| `@formkit/nuxt` | `1.6.9` | Connector module for `FormKit` form builder |
| `@nuxtjs/i18n` | `9.5.5` | Module for adding `i18n` internalization into apps |
| `@nuxt/content` | `3.5.1` | Official module for displaying `.md` content |
| `@nuxtjs/seo` | `3.0.3` | Official module for easier SEO configuration |
| `nuxt-auth-utils` | `0.5.20` | Module for easier authentication |

## Packages of optional features
| Package | Version | Description |
| --- | --- | :-- |
| `zod` | `3.25.64` | Schema validation solution |
| `valibot` | `1.1.0` | Schema validation solution |
| `open-props` | `1.7.15` | Pre-defined CSS classes library |
| `postcss-jit-props` | `1.0.16` | PostCSS plugin to inject `open-props` |
| `@maas/vue-equipment` | `1.0.0-beta.30` | Collection of Vue utilities |
| `elrh-pslo` | `1.1.6` | Utility for adding non-breakable spaces into text |
