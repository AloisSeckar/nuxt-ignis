# Changelog

## 0.2.1 (2025-02-17)
- feat: `@nuxt/fonts` included into built-in dependencies
- fix: added default content.config.ts to avoid warning on startup
- build: fixed couple of version issues in lock file

## 0.2.0 (2025-02-09)
- feat: breaking change update to `@nuxt/content v3` - in case of problems, see [migration guide](https://content.nuxt.com/docs/getting-started/migration)
- feat: `@nuxt/scripts` included into built-in dependencies
- build: Vite and Nuxt Kit version fix

## 0.1.10 (2025-02-06)
- feat: update `nuxt-neon` to allow server-side exports
- feat: remove `useIgnisI18n` again as it is NOT needed
- fix: pin down `i18n` due to current regression
- build: security updates

## 0.1.9 (2025-02-03)
- feat: expose `useI18n` composable via custom `useIgnisI18n`

## 0.1.8 (2025-02-02)
- build: fix `nuxt-neon` security issue
- build: fix `vite` security issue

## 0.1.7 (2025-01-31)
- feat: unified test-pack included via separate `nuxt-spec` layer
- feat: support `ssr` and `pages` settings
- feat: display log level setting on startup
- refactor: log level setting moved inside `ignis` config
- build: updated deps

## 0.1.6 (2024-12-25)
- build: bump Nuxt to `3.15.0` + update other deps

## 0.1.5 (2024-12-21)
- feat: more flexible config for `i18n` and `formkit`
- docs: improved instructions for using as a layer

## 0.1.4 (2024-12-07)
- feat: include `elrh-pslo` text utility
- docs: add instructions for using as a layer

## 0.1.3 (2024-12-05)
- build: bump nuxt-neon to `0.2.4`

## 0.1.2 (2024-12-05)
- fix: update package.json according to Nuxt docs

## 0.1.1 (2024-12-05)
- build: bump nuxt-neon to `0.2.0`
- fix: features page listing
- docs: add CHANGELOG.md

## 0.1.0 (2024-12-02)
- initial release [v0.1.0](https://github.com/AloisSeckar/nuxt-ignis/releases/tag/v0.1.0)
