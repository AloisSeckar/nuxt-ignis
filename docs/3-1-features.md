# Nuxt Ignis features

This section contains the full list of NPM packages included in Nuxt Ignis. More details about each package can be found by clicking the 👁️‍🗨️ icon.

## Packages of root features

| Package | Version | Detail | Description |
| --- | :---: | :---: | :-- |
| `nuxt` | `4.5.2` | [👁️‍🗨️](/3-10-features-nuxt.html) | Underlying Nuxt application itself |
| `vue` | `3.5.41` | [👁️‍🗨️](/3-10-features-nuxt.html)  | Explicit devDependency to align with Nuxt defaults and also due to [Netlify behavior](https://github.com/nuxt/nuxt/discussions/30187) |
| `vue-router` | `5.2.0` | [👁️‍🗨️](/3-10-features-nuxt.html)  | Explicit devDependency to align with Nuxt defaults and also due to [Netlify behavior](https://github.com/nuxt/nuxt/discussions/30187) |
| `vue-tsc` | `3.3.10` | [👁️‍🗨️](/3-9-features-devex.html#vue-language-tools) | Vue-aware typechecking tool (zero runtime dependency) |
| `vue-component-meta` | `3.3.10` | [👁️‍🗨️](/3-9-features-devex.html#vue-language-tools) | Helpers for extracting metadata from components (zero runtime dependency if not explicitly used) |
| `vue-vue-component-type-helpers` | `3.3.10` | [👁️‍🗨️](/3-9-features-devex.html#vue-language-tools) | Helpers for extracting types from components (zero runtime dependency, only type definitions) |
| `typescript` | `6.0.3` | [👁️‍🗨️](/3-9-features-devex.html#eslint) | Explicit dependency included to ensure correct `eslint` functionality |
| `defu` | `6.1.7` | [👁️‍🗨️](/2-1-configuration.html#defu-merge) | Used for merging user configurations with defaults |
| `date-fns` | `4.4.0` | [👁️‍🗨️](/3-9-features-devex.html#logging) | Used to get timestamps in readable format |
| `consola` | `3.4.2` | [👁️‍🗨️](/3-9-features-devex.html#logging) | Improved centralized logging solution |
| `nuxt-spec` | `v0.3.1` | [👁️‍🗨️](/5-1-contributing.html#testing) | Experimental aggregated testing solution (`vitest` && `playwright` && Nuxt/Vue test utils) |
| `elrh-cosca` | `0.3.5` | [👁️‍🗨️](/3-9-features-devex.html#cli-tools) | Experimental library for code-scaffolding Node scripts |
| `cross-env` | `10.1.0` | [👁️‍🗨️](/3-9-features-devex.html#cross-env) | Used in development to set .env variables in Node scripts |

## Packages of default features

| Package | Version | Detail | Description |
| --- | :---: | :---: | :-- |
| `@nuxt/eslint` | `1.17.0` | [👁️‍🗨️](/3-9-features-devex.html#eslint) | Official module for code linting via `eslint` |
| `@nuxt/fonts` | `0.14.0` | [👁️‍🗨️](/3-8-features-performance.html#nuxt-fonts) | Official module for working with web fonts |
| `@nuxt/image` | `2.1.2` | [👁️‍🗨️](/3-8-features-performance.html#nuxt-image) | Official module for optimizing images |
| `@nuxt/scripts` | `1.3.3` | [👁️‍🗨️](/3-8-features-performance.html#nuxt-scripts) | Official module for integrating 3rd party scripts |
| `nuxt-security` | `2.6.0` | [👁️‍🗨️](/3-9-features-devex.html#nuxt-security) | Module for establishing best security practices |
| `nuxt-auth-utils` | `0.5.30` | [👁️‍🗨️](/3-7-features-utils.html#nuxt-auth-utils) | Module for easier authentication |
| `@vueuse/core` | `14.4.0` | [👁️‍🗨️](/3-7-features-utils.html#vueuse) | Collection of handy Vue utility functions |
| `@vueuse/nuxt` | `14.4.0` | [👁️‍🗨️](/3-7-features-utils.html#vueuse) | Nuxt connector for `VueUse` |
| `pinia` | `4.0.2` | [👁️‍🗨️](/3-8-features-performance.html#pinia) | Current ecosystem standard for state management |
| `@pinia/nuxt` | `1.0.1` | [👁️‍🗨️](/3-8-features-performance.html#pinia) | Nuxt connector for `pinia` |

## Packages of optional modules

| Package | Version | Detail | Description |
| --- | :---: | :---: | :-- |
| `@nuxt/ui` | `4.10.0` | [👁️‍🗨️](/3-2-features-ui.html#nuxt-ui) | Official open-source UI library for Nuxt |
| `@nuxtjs/tailwindcss` | `6.14.0` | [👁️‍🗨️](/3-2-features-ui.html#tailwind-css) | Connector module for `Tailwind CSS` (**TEMP DISABLED**) |
| `@tailwindcss` | `4.3.3` | [👁️‍🗨️](/3-2-features-ui.html#tailwind-css) | Base module for `Tailwind CSS` (**TEMP WORKAROUND**) |
| `@tailwindcss/vite` | `4.3.3` | [👁️‍🗨️](/3-2-features-ui.html#tailwind-css) | Vite connector for `Tailwind CSS` (**TEMP WORKAROUND**) |
| `nuxt-neon` | `0.9.0` | [👁️‍🗨️](/3-3-features-db.html#neon) | Connector module for `Neon` database |
| `@nuxtjs/supabase` | `2.0.10` | [👁️‍🗨️](/3-3-features-db.html#supabase) | Connector module for `Supabase` database |
| `@vueform/nuxt` | `1.31.0` | [👁️‍🗨️](/3-4-features-forms.html#vueform) | Connector module for `Vueform` form builder |
| `@vueform/vueform` | `1.13.13` | [👁️‍🗨️](/3-4-features-forms.html#vueform) | Core library for `Vueform` form builder |
| `@formkit/nuxt` | `2.1.2` | [👁️‍🗨️](/3-4-features-forms.html#formkit) | Connector module for `FormKit` form builder |
| `@nuxt/content` | `3.15.2` | [👁️‍🗨️](/3-6-features-content.html#nuxt-content) | Official module for displaying `.md` content |
| `@nuxtjs/i18n` | `10.6.0` | [👁️‍🗨️](/3-6-features-content.html#i18n) | Module for adding `i18n` internationalization into apps |
| `@nuxtjs/seo` | `5.3.12` | [👁️‍🗨️](/3-7-features-utils.html#nuxt-seo) | Official module for easier SEO configuration |
| `@stefanobartoletti/nuxt-social-share` | `3.2.0` | [👁️‍🗨️](/3-7-features-utils.html#nuxt-social-share) | Module for simple sharing to social networks |
| `magic-regexp` | `0.11.0` | [👁️‍🗨️](/3-7-features-utils.html#magic-regexp) | Library for easier working with regular expressions |
| `nuxt-charts` | `2.2.0` | [👁️‍🗨️](/3-2-features-ui.html#nuxt-charts) | Library for easier working with charts |

## Packages of optional features

| Package | Version | Detail | Description |
| --- | :---: | :---: | :-- |
| `zod` | `4.4.3` | [👁️‍🗨️](/3-5-features-validation.html#zod) | Schema validation solution |
| `valibot` | `1.4.2` | [👁️‍🗨️](/3-5-features-validation.html#valibot) | Schema validation solution |
| `open-props` | `1.7.23` | [👁️‍🗨️](/3-2-features-ui.html#open-props) | Pre-defined CSS classes library |
| `postcss-jit-props` | `1.0.16` | [👁️‍🗨️](/3-2-features-ui.html#open-props) | PostCSS plugin to inject `open-props` |
| `@maas/vue-equipment` | `1.0.0-beta.81` | [👁️‍🗨️](/3-7-features-utils.html#vueequipment) | Collection of Vue utilities |
| `elrh-pslo` | `1.1.6` | [👁️‍🗨️](/3-6-features-content.html#pslo) | Utility for adding non-breakable spaces into text |
