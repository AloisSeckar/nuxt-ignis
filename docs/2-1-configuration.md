# Configuration

It is possible to select which Nuxt modules and other features will be activated in your project. All dependencies are being downloaded into local `node_modules`, but Nuxt build process will ensure only relevant packages will be bundled for production.

There are **two equivalent ways** to configure Nuxt Ignis:

1. **`ignis` key in `nuxt.config.ts`** - pass a typed configuration object directly to the Nuxt config. This is a bit more convenient way, but creates rather "static" state that is fixed on build time and requires code changes to adjust.
2. **Environment variables** - set `NUXT_PUBLIC_IGNIS_*` values in your `.env` file or directly in your hosting provider's settings. This is more flexible for different environments.

Both approaches can be even mixed. When the same option is provided in both places, **environment variables take precedence** over values from `nuxt.config.ts` (this allows you to override per-environment without editing the static config). 

When nothing is provided, Nuxt Ignis falls back to its default settings.

For example, disabling ESLint can be expressed in either of these ways:

```dotenv [.env]
NUXT_PUBLIC_IGNIS_DEFAULT_ESLINT=false
```

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

The full structure of the `ignis` key mirrors the env variable namespaces (`NUXT_PUBLIC_IGNIS_<SECTION>_<KEY>` &harr; `ignis.<section>.<key>`). See [full reference](/2-5-full-reference) for the complete list.

## The big picture

[Nuxt](https://nuxt.com/) application is (by default) being assembled by [Vite](https://vitejs.dev/) during a phase called `build step`. Vite is a smart `bundler` responsible for putting all parts into a working package. Aside from `package.json` common to all Node.js-based JavaScript projects, Nuxt apps use `nuxt.config.ts` file to describe additional config and modules that should be included in the final build.

The very nature of the process requires `nuxt.config.ts` to be static. The bundler must get a snapshot of its current state and construct the output based on it. However, this doesn't mean you have to hardcode everything in it. The build process itself runs in Node.js (or other JS runtime) and thanks to that, environment variables are available via `process.env` object.

Nuxt Ignis emerged from embracing this fact. Provided environment variables are processed in [`setFeatures()` function](https://github.com/AloisSeckar/nuxt-ignis/blob/v0.5.3/core/features.ts) which happens to return a Nuxt config-like object. The output of this function is then merged into the final `nuxt.config.ts` file. This happens before the build step is executed, so the environment variables apply as intended.

The typical application is to include or exclude certain Nuxt module. For example Nuxt Ignis is including [`@nuxt/eslint`](https://nuxt.com/modules/eslint) into `module` array of the config object, but if the feature function sees `NUXT_PUBLIC_IGNIS_DEFAULT_ESLINT=false` environment variable, it will omit it. Some config options also imply other modifications in the config object, but the idea remains the same.

### Defu-merge

<PackagesReference :packages="[{ name: 'defu', version: '6.1.7' }]" />

Handling varying configuration options could become tricky pretty fast. That's why Nuxt itself uses [`unjs/defu`](https://github.com/unjs/defu) which is the smart tool for deep merging (config) objects together. It allows to supply default values while being able to override them with user-defined values.

Nuxt Ignis is also leveraging `defu` wherever possible. Thanks to that, you are almost never constrained by Nuxt Ignis defaults. You can add or change almost every config, while you are always backed by a sensible default provided by us. The most significant usage is when final `nuxt.config.ts` is being scaffolded prior to build phase and also for constructing config files for certain features that rely on them.

This principle is addressed as _"defu-merge"_ throughout the docs and in source codes comments.

### Runtime config

All existing config options are also defined as [public runtime config values](https://nuxt.com/docs/guide/directory-structure/nuxt.config#runtime-config) in a standard Nuxt fashion - i.e. `NUXT_PUBLIC_IGNIS_CONFIG_NUXT_SSR` (or `ignis.config.nuxt.ssr` in `nuxt.config.ts`) can be accessed as `useRuntimeConfig().public.ignis.config.nuxt.ssr`. While this doesn't affect the build process itself, it can be used for runtime checks if certain feature is enabled or not.

There are several examples of such usage in Nuxt Ignis codebase, starting in [`app.vue` file](https://github.com/AloisSeckar/nuxt-ignis/blob/v0.5.3/core/app/app.vue).

## More info

- See [default features](/2-2-default-features) for features that are included by default, but (mostly) can be disabled.
- See [optional features](/2-3-optional-features) for extra features that can be enabled in your project.
- See [features section](/3-1-features) for more details about each individual Nuxt Ignis feature.
