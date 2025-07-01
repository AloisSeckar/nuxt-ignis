# Configuration

It is possible to select which Nuxt modules and other features will be activated in your project. All dependencies are being downloaded into local `node_modules`, but Nuxt build process will ensure only relevant packages will be bundled for production.

The "magic" is done via environment variables, which you can set in your `.env` file or directly in your hosting provider's settings.

## The big picture

[Nuxt](https://nuxt.com/) application is (by default) being assembled by [Vite](https://vitejs.dev/) during a phase called `build step`. Vite is a smart `bundler` responsible for putting all parts into a working package. Aside from `package.json` common to all Node.js-based JavaScript projects, Nuxt apps use `nuxt.config.ts` file to describe additional config and modules that should be included in the final build.

The very nature of the process requires `nuxt.config.ts` to be static. The bundler must get a snapshot of its current state and construct the output based on it. However, this doesn't mean you have to hardcode everything in it. The build process itself runs in Node.js (or other JS runtime) and thanks to that, environment variables are available via `process.env` object.

Nuxt Ignis emerged from embracing this fact. Provided environment variables are processed in [`setFeatures()` function](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/features.ts) which happens to return a Nuxt config-like object. The output of this function is then merged into the final `nuxt.config.ts` file. This happens before the build step is executed, so the environment variables apply as intended.

The typical application is to include or exclude certain Nuxt module. For example Nuxt Ignis is including `@nuxt/eslint` into `module` array of the config object, but if the feature function sees `NUXT_PUBLIC_IGNIS_CORE_ESLINT=false` environment variable, it will omit it. Some config options also imply other modifications in the config object, but the idea remains the same.

### Defu-merge

Handling varying configuration options could become tricky pretty fast. That's why Nuxt Ignis uses [`unjs/defu`](https://github.com/unjs/defu) which is the smart tool for deep merging (config) objects together. It allows to supply default values while being able to override them with user-defined values. Thanks to that, you are almost never constrained by Nuxt Ignis defaults. You can add or change almost every config, while you are always backed by a sensible default.

This is used when `nuxt.config.ts` is being scaffolded and also when constructing config files for certain features that rely on them.

This principle is addressed as _"defu-merge"_ throughout the docs and in source codes comments.

### Runtime config

All existing config options are also defined as [public runtime config values](https://nuxt.com/docs/guide/directory-structure/nuxt.config#runtime-config) in a standard Nuxt fashion - i.e. `NUXT_PUBLIC_IGNIS_SSR` can be accessed as `useRuntimeConfig().public.ignis.ssr`. While this doesn't affect the build process itself, it can be used for runtime checks if certain feature is enabled or not.

There are several examples of such usage in Nuxt Ignis core codebase, starting in [app.vue](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/app.vue) file.

## More info

- See [core features](/2-2-core-features) for features that are included by default, but (mostly) can be disabled.
- See [optional features](/2-3-optional-features) for extra features that can be enabled in your project.
- See [features section](/3-1-features) for more details about each individual Nuxt Ignis feature.
