# Changelog

Overview of the newest features in Nuxt Ignis.

## 0.5.3

`2026-01-03`

- BREAKING: bump `nuxt-neon` to `v8` for security reasons (see [new docs](https://nuxt-neon.netlify.app/))
- docs: fix two broken links
- build: bump `Nuxt` to `4.2.2` and `Vue` to `3.5.26` 
- build: switch to `Vite v8`
- build: harden `pnpm` security settings ([#146](https://github.com/AloisSeckar/nuxt-ignis/issues/146)) ([#147](https://github.com/AloisSeckar/nuxt-ignis/issues/147))
- chore: revised ESLint config for the project

## 0.5.2

`2025-11-28`

- feat: bring in `Nuxt Social Share` module ([#140](https://github.com/AloisSeckar/nuxt-ignis/issues/140))
- feat: bump `Nuxt UI` to v4
- feat: bump `@nuxt/image` to v2
- build: bump `Nuxt` to `4.2.1`
- build: bump `Valibot` to `1.2.0` (solve CVE-2025-66020)
- chore: introduced pnpm catalog for easier dependency management ([#129](https://github.com/AloisSeckar/nuxt-ignis/issues/129))

## 0.5.1

`2025-10-31`

- fix: workaround for Nuxt `4.2.0` issue with some ESM modules ([#135](https://github.com/AloisSeckar/nuxt-ignis/issues/135))
- fix: corrected linked version tags in CLI scripts
- docs: add usage notice of `better-sqlite3` for `Nuxt Content` ([#55](https://github.com/AloisSeckar/nuxt-ignis/issues/55))
- docs: add notice about default `app.vue` for projects scaffolded from Nuxt template ([#133](https://github.com/AloisSeckar/nuxt-ignis/issues/133))
- docs: add more info about `nuxt-spec` and `elrh-cosca`
- docs: fix link to Vueform config file
- test: added tests to have version tags in-sync between package-json and CLI scripts / docs ([#132](https://github.com/AloisSeckar/nuxt-ignis/issues/132))
- build: security update of `tar` (CVE-2025-64118)

## 0.5.0

`2025-10-27`

- BREAKING: added `Nuxt v4` support and adjusted project structure accordingly (see [migration guide](https://nuxt.com/docs/4.x/getting-started/upgrade))
- BREAKING: bumped `@nuxtjs/i18n` to `v10` (see [migration guide](https://i18n.nuxtjs.org/docs/guide/migrating))
- feat: `/_ignis-welcome` page exposed separately even after default page is overwritten
- feat: `NuxtRouteAnnouncer` included into default `app.vue` to improve a11y ([#108](https://github.com/AloisSeckar/nuxt-ignis/issues/108))
- feat: quick validator utils were added for `zod` and `valibot` ([#109](https://github.com/AloisSeckar/nuxt-ignis/issues/109))
- feat: date-formatting helper based on `date-fns` added ([#111](https://github.com/AloisSeckar/nuxt-ignis/issues/111))
- feat: CLI tool (`npx nuxt-ignis setup`) for quick project setup
- feat: CLI tool (`npx nuxt-ignis set-css`) for scaffolding default CSS file to allow easy adjustments ([#100](https://github.com/AloisSeckar/nuxt-ignis/issues/100))
- fix: dropped custom settings for `nuxt-security` ([#46](https://github.com/AloisSeckar/nuxt-ignis/issues/46))
- fix: more consistent CSS for built-in pages ([#116](https://github.com/AloisSeckar/nuxt-ignis/issues/116))
- fix: display config overview in console only once using Nuxt hook
- fix: re-enable `open-props` gradients
- fix: corrected warn message in `useT` function
- fix: passing constructed Nuxt config object via spread operator to avoid Proxy issues
- fix: added proper typing for NuxtConfig object
- build: bump `Nuxt` to `4.2.0` + update other deps to latest versions (as of 2025-10-27)
- refactor: code updates in built-in pages
- chore: renamed `.env.public` to `.env.example` for more consistency with other projects
- docs: moved to new https://nuxt-ignis.com/ domain
- docs: new CLI page + related updates
- docs: numerous updates to keep up with the changes
- docs: added link sections for all dependencies ([#95](https://github.com/AloisSeckar/nuxt-ignis/issues/95))
- docs: use specific tags in GitHub links ([#123](https://github.com/AloisSeckar/nuxt-ignis/issues/123))
- docs: added [`Made with Ignis`](https://nuxt-ignis.com/1-3-showcase.html) showcase page

## 0.4.0

`2025-07-26`

- feat: `Magic Regexp` library integrated
- feat: `Nuxt Charts` library integrated
- feat: CLI tool for scaffolding `eslint.config.mjs` file
- feat: redesigned `Formkit` config loading
- feat: new config option for passing in HTML page title
- feat: new config option for passing in HTML lang attribute
- feat: new config option for passing in custom CSS files
- feat: new default CSS file + new config option for optional disabling it
- feat: internal CSS files are now prefixed with `ignis-` to avoid conflicts
- feat: new built-in page for configuration overview
- feat: built-in pages (Welcome page, Features overview and Configuration overview) redesigned
- feat: re-wamped Nuxt Ignis logo
- refactor: dropped `app.config.ts` file
- fix: made `pslo` and `Nuxt Content integration` work again
- fix: `<CurrentTime>` component is an always active feature
- fix: `<CurrentTime>` output format set to "YYYY-MM-DD, HH:mm:ss"
- fix: re-wamped `useT` composable function
- test: improved tests (still WIP)
- build: bump `Nuxt` to `3.17.7` + update other deps to latest versions (as of 2025-07-07)
- build: experimental `rolldown-vite` used for docs
- docs: CHANGELOG.md file moved into docs section
- docs: new internal component for displaying NPM package references
- docs: significantly more information added

## 0.3.3

`2025-06-21`

- feat: schema validation via `zod` and `valibot` integrated
- feat: `Vue Equipment` utils collection integrated
- feat: global error and warn handlers are now available by default
- feat: `date-fns` is now used to get timestamps for logs
- fix: redesigned `Vueform` and `Nuxt Content` config loading
- docs: improved structure + added more information

## 0.3.2

`2025-06-07`

- feat: (slightly) better solution for using `Vueform` and `@nuxt-content` (see usage notice in docs)
- fix: incorrect _"both DB connector modules"_ warning
- fix: provide solution for Tailwind CSS sourcemap warning during build
- build: bump `Nuxt` to `3.17.5` + update all other deps to latest versions (as of 2025-06-07)

## 0.3.1

`2025-05-21`

- fix: broken preset evaluation ignoring direct values for optional modules
- fix: temporary bridge `Tailwind CSS v4` via Vite plugin instead of Nuxt module

## 0.3.0

`2025-05-21`

- BREAKING CHANGE: migrated to `Tailwind CSS v4` - see [migration guide](https://tailwindcss.com/docs/upgrade-guide)
- BREAKING CHANGE: changed way of locating i18n JSON files from `@assets/lang` to `@/i18n/locales` to match current `i18n` module default structure
- feat: `@nuxtjs/seo`, `nuxt-auth-utils`, `Vueform`  added as optional modules
- feat: new preset for `forms` to choose between `Vueform` and `FormKit`
- feat: warn when duplicate db/forms solutions are used (can be surpressed by config)
- feat: even "core" modules can be disabled by configuration
- feat: improved overview page - display enabled/disabled status for ALL features, implemented as separate page/component, non-dependant on any optional features
- feat: `nuxt-time` module dropped in favor of now-native `<NuxtTime>` component
- fix: extend default `Tailwind CSS` config to allow it in `/content` folder
- docs: established standalone `Vitepress` based docs at <https://nuxt-ignis.com/>
- docs: updated to reflect latest change
- build: bump `Nuxt` to `3.17.4` + update all other deps to latest versions (as of 2025-05-21)

## 0.2.5

`2025-03-26`

- build: move `vue` and `vue-router` to devDepencencies (should allow smooth Netlify deployment)
- build: fix Vite security issue

## 0.2.4

`2025-03-20`

- build: bump `Nuxt` to `3.16.1`, `Nuxt Content` to `3.4.0` + update other deps
- build: fix some security issues
- fix: update necessary default config for `@nuxtjs/i18n`

## 0.2.3

`2025-03-08`

- build: bump `Nuxt` to `3.16.0` + update other deps

## 0.2.2

`2025-02-25`

- build: bump `nuxt-spec` and `nuxt-neon`
- build: return `postcss-jit-props` dependency after a [bug gets fixed](https://github.com/GoogleChromeLabs/postcss-jit-props/commit/0c98b5367935b9c048a547400ee8346cb6c07b00)

## 0.2.1

`2025-02-17`

- feat: `@nuxt/fonts` included into built-in dependencies
- fix: added default content.config.ts to avoid warning on startup
- build: fixed couple of version issues in lock file

## 0.2.0

`2025-02-09`

- feat: breaking change update to `@nuxt/content v3` - in case of problems, see [migration guide](https://content.nuxt.com/docs/getting-started/migration)
- feat: `@nuxt/scripts` included into built-in dependencies
- build: Vite and Nuxt Kit version fix

## 0.1.10

`2025-02-06`

- feat: update `nuxt-neon` to allow server-side exports
- feat: remove `useIgnisI18n` again as it is NOT needed
- fix: pin down `i18n` due to current regression
- build: security updates

## 0.1.9

`2025-02-03`

- feat: expose `useI18n` composable via custom `useIgnisI18n`

## 0.1.8

`2025-02-02`

- build: fix `nuxt-neon` security issue
- build: fix `vite` security issue

## 0.1.7

`2025-01-31`

- feat: unified test-pack included via separate `nuxt-spec` layer
- feat: support `ssr` and `pages` settings
- feat: display log level setting on startup
- refactor: log level setting moved inside `ignis` config
- build: updated deps

## 0.1.6

`2024-12-25`

- build: bump Nuxt to `3.15.0` + update other deps

## 0.1.5

`2024-12-21`

- feat: more flexible config for `i18n` and `formkit`
- docs: improved instructions for using as a layer

## 0.1.4

`2024-12-07`

- feat: include `elrh-pslo` text utility
- docs: add instructions for using as a layer

## 0.1.3

`2024-12-05`

- build: bump nuxt-neon to `0.2.4`

## 0.1.2

`2024-12-05`

- fix: update package.json according to Nuxt docs

## 0.1.1

`2024-12-05`

- build: bump nuxt-neon to `0.2.0`
- fix: features page listing
- docs: add CHANGELOG.md

## 0.1.0

`2024-12-02`

- initial release [v0.1.0](https://github.com/AloisSeckar/nuxt-ignis/releases/tag/v0.1.0)