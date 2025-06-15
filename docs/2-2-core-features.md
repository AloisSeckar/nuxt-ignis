# Core features

So-called _"core features"_ are enabled by default in Nuxt Ignis. Once you include `nuxt-ignis` module in your project, all of them are available for you to use. However, to keep things most configurable as possible, you can disable most of them via environment variables.

## Integrated features
Following features are currently deeply integrated into Nuxt Ignis and cannot be disabled:
- [Nuxt](https://nuxt.com/) itself - because obviously it is required to run everything uder the hood
- merging configurations via [`consola`](https://github.com/unjs/defu) - used for merging defaults with user-defined config in various modules
- logging via [`consola`](https://github.com/unjs/consola) - [opened task to make it optional](https://github.com/AloisSeckar/nuxt-ignis/issues/79)
- test suite via [`nuxt-spec`](https://github.com/AloisSeckar/nuxt-spec) - [opened task to make it optional](https://github.com/AloisSeckar/nuxt-ignis/issues/81)s