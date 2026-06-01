# Configuration

It is possible to select which Nuxt modules and other features will be activated in your project. All dependencies are being downloaded into local `node_modules`, but Nuxt build process will ensure only relevant packages will be bundled for production.

There are **two equivalent ways** to configure Nuxt Ignis:

1. **`ignis` key in `nuxt.config.ts`** - pass a typed configuration object directly to the Nuxt config. This is a bit more convenient way, but creates rather "static" state that is fixed on build time and requires code changes to adjust.
2. **Environment variables** - set `NUXT_PUBLIC_IGNIS_*` values in your `.env` file or directly in your hosting provider's settings. This is more flexible for different environments.

Both approaches can be even mixed. When the same option is provided in both places, **environment variables take precedence** over values from `nuxt.config.ts` (this allows you to override per-environment without editing the static config). 

When nothing is provided, Nuxt Ignis falls back to its default settings.

For example, disabling default ESLint integration can be expressed in either of these ways:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['nuxt-ignis'],
  ignis: {
    default: {
      eslint: false,
    },
  },
})
```

```dotenv [.env]
NUXT_PUBLIC_IGNIS_DEFAULT_ESLINT=false
```

The full structure of the `ignis` key mirrors the env variable namespaces (`NUXT_PUBLIC_IGNIS_<SECTION>_<KEY>` &harr; `ignis.<section>.<key>`). 

See [full reference](/2-5-full-reference) for the complete list of configuration options.

## The big picture

The _first generation_ of Nuxt Ignis (pre-release versions prior to `v0.6.0`) was trying to generate "dynamic `nuxt.config.ts`" via reading `process.env.*` variables and dynamically construct config object for `defineNuxtConfig` function before the actual build. While the contents of `nuxt.config.ts` must be and remain static at build time, there was a chance to call an utility function before the build really happened.

This was working, but it was limited only to use `.env` variables, and it quickly choke upon itself as the number of possible integrations and dependencies listed in `package.json` grew. Also the size of the output bundle become concerning.

### Modules for the rescue

The natural steer was to split up the big monolith. We introduced several internal modules, that are responsible only for a certain domain. We have `@nuxt-ignis/ui` for UI integrations, `@nuxt-ignis/db` for database drivers and so on. Those Nuxt modules are distributed as standalone packages and the core `nuxt-ignis` package is depending on them. In its core, there is a special "dispatcher" module that checks the received config and calls the sub-module, if at least one relevant config option was passed. If not (i.e. user doesn't want to include any database solution), the module is completely skipped. If the module runs, it is conditionally turning on integrations, that are mostly done via an existing Nuxt module. We use `moduleDependencies` section of `@nuxt/kit`'s standard `defineNuxtModule` function to say which modules shall also be included, resolve and pass special configuration, if needed, and then Nuxt automatically does the rest. For some extra features, `setup` function is also used.

Because Nuxt modules can expose their own config keys, that are then automatically augmented into standard `NuxtOptions`, this change also allowed Nuxt Ignis to be conveniently and type-safely configured via `nuxt.config.ts` using `ignis` config key. You just need to run the dev server for the first time to let Nuxt generate necessary files.

Last, but not least. This mechanism allows you to pass configuration into modules used for integrations as you are used to and they will just flow into the final resolution. There are only a few exceptions where Nuxt Ignis passes some configuration into the modules on its own and they are described in each integration detail in [section 3](/3-1-features.html).

### Default vs. optional

Nuxt Ignis aims to provide maximum flexibility and freedom. Still, we feel like some integrations (mostly to Nuxt official modules) are important and useful enough to have them turned on by default. You can still opt-out from most of them. Those integrations are grouped into `@nuxt-ignis/default` module.

All other integrations and features are opt-in and their modules won't even run, if nothing is requested from them.

### Defu-merge

<PackagesReference :packages="[{ name: 'defu', version: '6.1.7' }]" />

Handling varying configuration options could become tricky pretty fast. That's why Nuxt itself uses [`unjs/defu`](https://github.com/unjs/defu) which is the smart tool for deep merging (config) objects together. It allows to supply default values while being able to override them with user-defined values.

Nuxt Ignis is also leveraging `defu` wherever possible. Thanks to that, you are almost never constrained by Nuxt Ignis defaults. You can add or change almost every config, while you are always backed by a sensible default provided by us. The most significant usage is when final `nuxt.config.ts` is being scaffolded prior to build phase and also for constructing config files for certain features that rely on them.

This principle is addressed as _"defu-merge"_ throughout the docs and in source codes comments.

### Runtime config

All existing config options are also defined as [public runtime config values](https://nuxt.com/docs/guide/directory-structure/nuxt.config#runtime-config) in a standard Nuxt fashion - i.e. `NUXT_PUBLIC_IGNIS_CONFIG_NUXT_SSR` (or `ignis.config.nuxt.ssr` in `nuxt.config.ts`) can be accessed as `useRuntimeConfig().public.ignis.config.nuxt.ssr`. While this doesn't affect the build process itself, it can be used for runtime checks if certain feature is enabled or not.

There are several examples of such usage in Nuxt Ignis codebase, starting in [`app.vue` file](https://github.com/AloisSeckar/nuxt-ignis/blob/v0.6.0-rc.3/core/app/app.vue).

## More info

- See [default features](/2-2-default-features) for features that are included by default, but (mostly) can be disabled.
- See [optional features](/2-3-optional-features) for extra features that can be enabled in your project.
- See [features section](/3-1-features) for more details about each individual Nuxt Ignis feature.
