# Changelog

Overview of the newest features in Nuxt Ignis.

## 0.6.0

`2026-06-06`

- BREAKING: former monolithic project structure was split into several internal `@nuxt-ignis/*` module packages - instead of "manual" assembling of `nuxt.config.ts` inside custom `features.ts` file, those Nuxt modules are now orchestrated to turn various integrations and features on/off
- BREAKING: many configuration variables were renamed for better consistency and clarity - please refer to the [configuration reference](https://nuxt-ignis.com/2-5-full-reference) for details
- BREAKING: re-designed i18n integration - default config file dropped in favor of direct config in `nuxt.config.ts` or environment variables (as suggested in module docs) (#159)
- feat: thanks to switching to Nuxt modules, it is now possible to use `ignis` config key in `nuxt.config.ts` along with the environment variables - it is also recommended because of the intellisense and type-safety (using environment variables is still possible and will override the config values if used together)
- feat: incorrect environment variable values now get rejected upon startup (#171)
- feat: new internal option for Supabase integration to control usage of [types](https://supabase.nuxtjs.org/getting-started/introduction#types)
- feat: use Node-native SQLite connector in Nuxt Content (#162)
- feat: bumped Formkit to v2
- feat: expose Valibot and Zod features server-side (#152)
- feat: revised and updated default CSS file (#161)
- feat: scaffold default .vscode/settings.json (#117)
- feat: scaffold default netlify.toml (#130)
- feat: gracefully handle latest changes into Nuxt SEO behavior (#169) (#170)
- feat: setup for default `pnpm-workspace.yaml` reviewed and updated (#150) (#167)
- feat: various updates and improvements in CLI setup script (#133) (#190) (#191)
- fix: exclude Nuxt UI components from Vue resolution if integration is not active (#193)
- refactor: re-implemented Vueform, Formkit and Nuxt Content config setup
- refactor: new way of getting Nuxt Ignis startup config into `ignis-config.json` + storing full `_nuxt-config.json` for debug reference
- refactor: reorganized demo apps in `/demo` folder to align better with the new modular structure
- build: bump `Nuxt` to `4.4.7` + updated other deps to latest versions (as of 2026-06-03)
- build: use `pnpm` catalog and establish monorepo setup with root `pnpm-workspace.yaml` (#160)
- build: new `pnpm` scripts to manage running tests and building modules more easily
- build: bump TypeScript to v6 (#177)
- build: bump `Vite` to v8
- test: added more Vitest unit tests to ensure core and module packages stability
- test: added basic visual regression tests for demo apps in `/demo` folder
- docs: updated info to reflect latest changes
- docs: added [road map overview](https://nuxt-ignis.com/5-2-roadmap) to give future insight

## 0.6.0-rc.5

`2026-06-03`

- feat: ability to install node_modules automatically in CLI setup (#191)
- fix: exclude nuxt-ui components from Vue resolution if integration is not active (#193)
- fix: adjust pnpm setup for smoother installation experience
- fix: bump version in `.nuxtrc` to match latest `nuxt-spec`

## 0.6.0-rc.4

`2026-06-02`

- feat: remove `compatibilityDate` from `nuxt.config.ts` during CLI setup (#190)
- fix: add overrides to `pnpm-workspace.yaml` template (#188)
- fix: set correct path to `pnpm-workspace.yaml` template in CLI setup
- fix: create `.nuxtrc` file in CLI setup to avoid `@nuxt/test-utils` auto-setup
- build: bump `Nuxt` to `4.4.7` + other deps

## 0.6.0-rc.3

`2026-06-01`

- fix: prevent @nuxt/test-utils from auto-running its setup (#187)
- fix: use optional chaining when checking runtime config

## 0.6.0-rc.2

`2026-05-27`

- fix: review dependencies and devDependencies in sub-modules (#185)
- fix: hide misleading warning (#179)
- refactor: optimize `nuxt-ignis` package size by omitting local build files

## 0.6.0-rc.1

`2026-05-23`

- BREAKING: new modular structure, renamed variables and a couple of other important changes
- this is the initial release candidate to test the new modular structure and setup on real projects
- full change log will be included in the final `v0.6.0` release

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
- feat: warn when duplicate db/forms solutions are used (can be suppressed by config)
- feat: even "core" modules can be disabled by configuration
- feat: improved overview page - display enabled/disabled status for ALL features, implemented as separate page/component, non-dependant on any optional features
- feat: `nuxt-time` module dropped in favor of now-native `<NuxtTime>` component
- fix: extend default `Tailwind CSS` config to allow it in `/content` folder
- docs: established standalone `Vitepress` based docs at <https://nuxt-ignis.com/>
- docs: updated to reflect latest change
- build: bump `Nuxt` to `3.17.4` + update all other deps to latest versions (as of 2025-05-21)

## 0.2.5

`2025-03-26`

- build: move `vue` and `vue-router` to devDependencies (should allow smooth Netlify deployment)
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