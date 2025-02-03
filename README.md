# Nuxt Ignis

![Nuxt Ignis](https://github.com/AloisSeckar/nuxt-ignis/blob/main/public/nuxt-ignis.png)

This is a template starter for Nuxt web applications. It is being built as the setup I'd currently use to start with a new "real world" [Nuxt](https://nuxt.com/) webapp. It will improve and grow together with my skills. I also try to include **WHAT** and **WHY** comments based on my knowledge about the framework and used libraries.

## How to use

### As standalone template
1. Do a `git checkout` from https://github.com/AloisSeckar/nuxt-ignis.git
2. Open in IDE and run `pnpm install` in terminal
3. Configure modules via `.env` properties
4. Start dev server with `pnpm dev` command
5. Visit `localhost:3000` in browser

You are ready to build your next awesome project in Nuxt!

### As a layer (RECOMMENDED)
Aside from being "forked", `nuxt-ignis` is also available as [NPM package](https://www.npmjs.com/package/nuxt-ignis) that can be referenced as a single-import with all the features incoming.

1) Add following dependency into your `package.json`:
```
"nuxt-ignis": "0.1.9"
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

#### Netlify deployment note
If you use [Netlify](https://www.netlify.com/) for deployment then for some reasons [not yet clear to me](https://github.com/nuxt/nuxt/discussions/30187) after extending from Nuxt Ignis you have to add two explicit dependencies into your `package.json`, namely:
```
"vue": "latest",
"vue-router": "latest"
```
Without this workaround the project builds and deploys but will hit runtime error 500 upon loading the page. Hopefully, this is just a temporary issue (12/2024).

## Overview

**Fundamentals**
- [`pnpm`](https://pnpm.io/) based project
- [Nuxt](https://nuxt.com/) application framework built atop [Vue.js](https://vuejs.org/)
- Available as a starter template or standalone NPM package to extend from

**Built-in features**
- linting for maintaining coding standards and improving code quality via [`@nuxt/eslint`](https://nuxt.com/modules/eslint) 
- zero-config OWASP security patterns for Nuxt via [`nuxt-security`](https://nuxt-security.vercel.app/)
- de-facto standard state management library for Vue apps via [`@pinia/nuxt`](https://pinia.vuejs.org/ssr/nuxt.html)
- integration with utility functions library for Vue apps via [`@vueuse/nuxt`](https://vueuse.org/nuxt/README.html)
- handful tools for working with images via [`@nuxt/image`](https://image.nuxt.com/) 
- SSR-friendly component for rendering dynamic date/time via [`nuxt-time`](https://nuxt.com/modules/time)
- logging via [`consola](https://github.com/unjs/consola)

**Configurable features**
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
- all `.json` files with messages in `@assets/lang` folder will be auto-scanned
- if [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/main/i18n.config.ts) is not suitable for your project, you may specify path to your own using `NUXT_PUBLIC_IGNIS_I18N_CONFIG`

#### Formkit options
- you can select default language locale via `NUXT_PUBLIC_IGNIS_FORMKIT_LOCALE`
- if [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/main/i18n.config.ts) is not suitable for your project, you may specify path to your own using `NUXT_PUBLIC_IGNIS_FORMKIT_CONFIG`

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
