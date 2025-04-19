# Nuxt Ignis

![Nuxt Ignis](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/public/nuxt-ignis.png)

This is a _not-another-template-starter_ for Nuxt web applications. It is mostly based on the setup I'd currently use to start a new "real world" [Nuxt](https://nuxt.com/) webapp. The main goal is to abstract from difficult and repetitive dependency management across more Nuxt projects. All common features are replaced with just one `package.json` dependency (+ the specific ones for the project).

However, instead of being heavily opinionated as usual, Nuxt Ignis is **optionated**. It incorporates a wast spectrum of modules and features, but the end user controls what will appear in the final bundle. This is achieved by (not) adding modules and configuration into `nuxt.config.ts`. Although this file must remain static on build time and cannot be changed afterwards, nothing is preventing it from being dynamically prepared. And in this phase, `.env` variables can be used to ajdust what makes it into the actual build.

The project will improve and grow together with my skills. And - hopefully - by adressing the feedback from you, the (future) users. I also try to include **WHAT** and **WHY** comments based on my knowledge about the framework and used libraries.

## How to use

### As standalone template
1. Do a `git checkout` from https://github.com/AloisSeckar/nuxt-ignis.git
2. Open in IDE and go to `/core` directory
3. run `pnpm install` in terminal
4. Configure modules via `.env` properties
5. Start dev server with `pnpm dev` command
6. Visit `localhost:3000` in browser

You are ready to build your next awesome project in Nuxt!

### As a layer (RECOMMENDED)
Aside from being "forked", `nuxt-ignis` is also available as [NPM package](https://www.npmjs.com/package/nuxt-ignis) that can be referenced as a single-import with all the features incoming.

1) Add following dependency into your `package.json`:
```
"nuxt-ignis": "0.2.5"
```

2) Add following section into your `nuxt.config.ts`:
```
extends: [
  'nuxt-ignis'
]
```

3) Add `.npmrc` file with following content (if you don't have it yet):
```
shamefully-hoist=true
strict-peer-dependencies=false
```

4) Setup your `.env` to fit your project needs. Check [Configuration](#Configuration) section for reference.

You are ready to build your next awesome project in Nuxt!

## Overview

**Fundamentals**
- [`pnpm`](https://pnpm.io/) based project
- [Nuxt](https://nuxt.com/) application framework built atop [Vue.js](https://vuejs.org/)
- Available as a starter template or standalone NPM package to extend from

**Core features**
- linting for maintaining coding standards and improving code quality via [`@nuxt/eslint`](https://nuxt.com/modules/eslint) 
- zero-config OWASP security patterns for Nuxt via [`nuxt-security`](https://nuxt-security.vercel.app/)
- de-facto standard state management library for Vue apps via [`@pinia/nuxt`](https://pinia.vuejs.org/ssr/nuxt.html)
- integration with utility functions library for Vue apps via [`@vueuse/nuxt`](https://vueuse.org/nuxt/README.html)
- handful tools for working with images via [`@nuxt/image`](https://image.nuxt.com/)
- simple integration of various fonts via [`@nuxt/fonts`](https://fonts.nuxt.com/)
- optimized scripts loading via [`@nuxt/scripts`](https://scripts.nuxt.com/)
- SSR-friendly component for rendering dynamic date/time via [`nuxt-time`](https://nuxt.com/modules/time)
- logging via [`consola](https://github.com/unjs/consola)

**Optional features**
- UI (pick 0-1)
  - **Nuxt UI** - UI component and CSS library via [`@nuxt/ui`](https://ui.nuxt.com/) 
  - **Tailwind CSS** - CSS library (included in Nuxt UI) via [`@nuxtjs/tailwindcss`](https://tailwindcss.nuxtjs.org/) 
- Database (pick 0-1)
  - **Neon** - serverless PostgreSQL database via [`nuxt-neon`](https://github.com/AloisSeckar/nuxt-neon/) 
  - **Supabase** - serverless PostgreSQL database via [`@nuxtjs/supabase`](https://supabase.nuxtjs.org/) 
- Other (opt-in)
  - **I18N** - translations and internalization made easy via [`@nuxtjs/i18n`](hhttps://i18n.nuxtjs.org/) 
  - **FormKit** - for handling input forms via [`@formkit/nuxt`](https://nuxt.com/modules/formkit) 
  - **Content** - for working with website content in `.md` or `.json` via [`@nuxt/content`](https://content.nuxt.com/) 
  - **Open Props** - extra CSS styles via [Open Props](https://open-props.style/)
  - **pslo** - treating single letter words at the end of line via [elrh-pslo](https://open-props.style/)

## Configuration
It is possible to select which Nuxt modules will be activated in your project. All dependencies are being downloaded into local `node_modules`, but Nuxt build process will ensure only relevant packages will be bundled for production.

### Core modules
Pre-defined set of Nuxt modules are being automatically included by default. However, for greater flexibility you can opt-out from using them by setting respecitve config value to `false`:
- use `NUXT_PUBLIC_CORE_ESLINT=false` to disable `@nuxt/eslint`
- use `NUXT_PUBLIC_CORE_FONTS=false` to disable `@nuxt/fonts`
- use `NUXT_PUBLIC_CORE_IMAGE=false` to disable `@nuxt/image`
- use `NUXT_PUBLIC_CORE_PINIA=false` to disable `@pinia/nuxt`
- use `NUXT_PUBLIC_CORE_TIME=false` to disable `nuxt-time`
- use `NUXT_PUBLIC_CORE_SCRIPTS=false` to disable `@nuxt/scripts`
- use `NUXT_PUBLIC_CORE_SECURITY=false` to disable `nuxt-security`
- use `NUXT_PUBLIC_CORE_VUEUSE=false` to disable `@vueuse/nuxt`

The usage of `consola` is integrated at deeper level and cannot be opted out.

### UI preset
It is possible to pick from three options:
- `nuxt-ui` - full https://ui.nuxt.com/ via `@nuxt/ui` connector module **[RECOMMENDED]**
- `tailwind` - only https://tailwindcss.com/ via `@nuxtjs/tailwindcss` connector module
- `off` - no UI library preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_UI` env variable.

Value other than `off` will override Optional modules setting.

### Database preset
It is possible to pick from three options:
- `neon` - https://neon.tech/ via `nuxt-neon` connector module **[RECOMMENDED]**
- `supabase` - https://supabase.com/ via `@nuxtjs/supabase` connector module
- `off` - no database module preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_DB` env variable.

Value other than `off` will override Optional modules setting.

### Optional modules
Currently, following modules are opinionated:
- `@nuxt/ui` - set `NUXT_PUBLIC_IGNIS_UI` to `true | false`
- `@nuxtjs/tailwindcss` - set `NUXT_PUBLIC_IGNIS_TAILWIND` to `true | false` (ignored if `NUXT_PUBLIC_IGNIS_UI=true`)
- `nuxt-neon` - set `NUXT_PUBLIC_IGNIS_NEON` to `true | false`
- `@nuxtjs/supabase` - set `NUXT_PUBLIC_IGNIS_SUPABASE` to `true | false`
- `@nuxtjs/i18n` - set `NUXT_PUBLIC_IGNIS_I18N_ENABLED` to `true | false`
- `@formkit/nuxt` - set `NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED` to `true | false`
- `@nuxt/content` - set `NUXT_PUBLIC_IGNIS_CONTENT` to `true | false`

Default values are **false** (not included) for all optional modules.

#### I18N options
- you can select default language locale via `NUXT_PUBLIC_IGNIS_I18N_LOCALE`
- all `.json` files with messages in `@/i18n/locales` folder will be auto-scanned.
- if [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/core/main/i18n.config.ts) is not suitable for your project, you may specify path to your own using `NUXT_PUBLIC_IGNIS_I18N_CONFIG`

#### Formkit options
- you can select default language locale via `NUXT_PUBLIC_IGNIS_FORMKIT_LOCALE`
- if [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob//core/main/formkit.config.ts) is not suitable for your project, you may specify path to your own using `NUXT_PUBLIC_IGNIS_FORMKIT_CONFIG`

### Optional features
Currently, following extra features (not using separate Nuxt Modules) are opinionated:
- `Open Props CSS` - set `NUXT_PUBLIC_IGNIS_OPENPROPS` to `true | false`
- `elrh-pslo` - set `NUXT_PUBLIC_IGNIS_PSLO_ENABLED` to `true | false`

Default values are **false** (not included) for all optional features.

#### elrh-pslo options
There are two config values for this feature:
- `NUXT_PUBLIC_IGNIS_PSLO_ENABLED` - setting to true will allow utility function `pslo` to treat texts in your app
- `NUXT_PUBLIC_IGNIS_PSLO_CONTENT` - if both `elrh-pslo` and `@nuxt/content` are enabled, this allows or disallows Markdown content pre-processing with `pslo` function

### Nuxt config overrides
Currently, it is possible to override following Nuxt config via .env variables:
- `NUXT_PUBLIC_IGNIS_SSR` - set to `false` to disable SSR (results in `ssr: false` in Nuxt Config)
- `NUXT_PUBLIC_IGNIS_PAGES` - set to `false` to disable multiple pages in simple projects (results in `pages: false` in Nuxt Config)

### Logging
Use `NUXT_PUBLIC_INGIS_LOG_LEVEL` to set level of log messages captured with `consola`. The default value is `info`.

Possible values are: `fatal`, `error`, `warn`, `log`, `info`, `success`, `debug`, `trace`, `silent`, `verbose`
