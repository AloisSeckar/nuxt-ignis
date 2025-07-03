# Core features

So-called _"core features"_ are enabled by default in Nuxt Ignis. Once you include `nuxt-ignis` module in your project, all of them are available for you to use. However, to keep things most configurable as possible, you can disable most of them via environment variables.

## Integrated features

Following packages are currently deeply integrated into Nuxt Ignis and **cannot be disabled**:
- [Nuxt](https://nuxt.com/) itself - because obviously it is required to run everything uder the hood
- merging configurations via [`defu`](https://github.com/unjs/defu) - used for merging defaults with user-defined config in various modules
- date operations via [`date-fns`](https://github.com/date-fns/date-fns) - `format` function is used to get timestamps
- logging via [`consola`](https://github.com/unjs/consola) ([opened task to make it optional](https://github.com/AloisSeckar/nuxt-ignis/issues/79))
- test suite via [`nuxt-spec`](https://github.com/AloisSeckar/nuxt-spec) ([opened task to make it optional](https://github.com/AloisSeckar/nuxt-ignis/issues/81))

## Core modules

Pre-defined set of Nuxt modules is being automatically included by default. You can opt-out from using them by setting respective config value to `false`.
d
- use `NUXT_PUBLIC_CORE_ESLINT=false` to disable [`@nuxt/eslint`](/3-8-features-devex.html#eslint)
- use `NUXT_PUBLIC_CORE_FONTS=false` to disable `@nuxt/fonts`
- use `NUXT_PUBLIC_CORE_IMAGE=false` to disable `@nuxt/image`
- use `NUXT_PUBLIC_CORE_SCRIPTS=false` to disable `@nuxt/scripts`
- use `NUXT_PUBLIC_CORE_SECURITY=false` to disable `nuxt-security`
- use `NUXT_PUBLIC_CORE_VUEUSE=false` to disable [`@vueuse/nuxt`](/3-7-features-utils.html#vueuse)
- use `NUXT_PUBLIC_CORE_PINIA=false` to disable `@pinia/nuxt`

## More info

- See details about technologies available via Nuxt Ignis in [features section](/3-1-features).
