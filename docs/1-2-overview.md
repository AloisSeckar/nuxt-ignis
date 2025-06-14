---
outline: deep
---

# Overview

## Fundamentals
- [`pnpm`](https://pnpm.io/) based project
- [Nuxt](https://nuxt.com/) application framework built atop [Vue.js](https://vuejs.org/)
- Available as a starter template or standalone NPM package to extend from

## Core features
Core features are included by default, but can be disabled on demand.

The list includes:
- linting for maintaining coding standards and improving code quality via [`@nuxt/eslint`](https://nuxt.com/modules/eslint) 
- zero-config OWASP security patterns for Nuxt via [`nuxt-security`](https://nuxt-security.vercel.app/)
- de-facto standard state management library for Vue apps via [`@pinia/nuxt`](https://pinia.vuejs.org/ssr/nuxt.html)
- integration with utility functions library for Vue apps via [`@vueuse/nuxt`](https://vueuse.org/nuxt/README.html)
- handful tools for working with images via [`@nuxt/image`](https://image.nuxt.com/)
- simple integration of various fonts via [`@nuxt/fonts`](https://fonts.nuxt.com/)
- optimized scripts loading via [`@nuxt/scripts`](https://scripts.nuxt.com/)
- logging via [`consola](https://github.com/unjs/consola)

## Optional features
Optional features are disabled by default, but can be opted-in. 

The list includes:
- UI (pick 0-1)
  - **Nuxt UI** - UI component and CSS library via [`@nuxt/ui`](https://ui.nuxt.com/) 
  - **Tailwind CSS** - CSS library (included in Nuxt UI) via [`@nuxtjs/tailwindcss`](https://tailwindcss.nuxtjs.org/) 
- Database (pick 0-1)
  - **Neon** - serverless PostgreSQL database via [`nuxt-neon`](https://github.com/AloisSeckar/nuxt-neon/) 
  - **Supabase** - serverless PostgreSQL database via [`@nuxtjs/supabase`](https://supabase.nuxtjs.org/) 
- Other (opt-in)
  - **I18N** - translations and internalization made easy via [`@nuxtjs/i18n`](hhttps://i18n.nuxtjs.org/) 
  - **FormKit** - for handling input forms via [`@formkit/nuxt`](https://nuxt.com/modules/formkit) 
  - **Vueform** - for handling input forms via [`@vueform/nuxt`](https://nuxt.com/modules/vueform) 
  - **Content** - for working with website content in `.md` or `.json` via [`@nuxt/content`](https://content.nuxt.com/) 
  - **Open Props** - extra CSS styles via [Open Props](https://open-props.style/)
  - **pslo** - treating single letter words at the end of line via [elrh-pslo](https://open-props.style/)
  - **SEO** - collection of SEO-related modules via [Nuxt SEO](https://nuxtseo.com/)
  - **Auth Utils** -  easy and secure authentication via [nuxt-auth-utils](https://nuxt.com/modules/auth-utils)

## Flexibility
You control is guaranted via `.env` variables. Learn more in the [Configuration](/2-1-overview) section.

## Installation
Continue to the [Installation](/1-3-installation) section for instructions on how to add `nuxt-ignis` into your Nuxt project.
