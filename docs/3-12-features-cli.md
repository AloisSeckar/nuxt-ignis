# CLI

Nuxt Ignis comes with couple of CLI commands to help you move faster.

## Quick-start

Nuxt Ignis provides a `one-command-to-set-them-all` way to set everything up in your project. It can be invoked as:

::: code-group
```sh [pnpm]
pnpx nuxt-ignis setup
```

```sh [npm]
npx nuxt-ignis setup
```

```sh [yarn]
yarn dlx nuxt-ignis setup
```

```sh [bun]
$ bunx nuxt-ignis setup
```

```sh [deno]
$ deno run --allow-run npm:npx nuxt-ignis setup
```
:::

First, the CLI tool will ask whether you want to do the setup automatically:

- If you choose `y`es, all actions will be subsequently performed automatically.
- If you choose `n`o, you will be guided through the setup step-by-step prompting every action.

If action associated with each step was already performed or the code snippet is already present in the target file, the tool will skip to next one. In case an error occurs, the script continues towards the next step. This allows you to fix the issue later and run the command again to finish everything.

All the setup steps are described in detail in the [installation guide](/1-4-installation.html#setup-steps).

## Code scaffolding

As a base [layer](https://nuxt.com/docs/getting-started/layers), Nuxt Ignis includes a number of built-ins that are automatically brought into your project just by extending from it. Since this might not always be exactly what you need and want, you are free to overwrite everything by your own files. However, sometimes you might just need a little tweak to the defaults and not a complete rewrite. To save you from digging into the source code and copy-pasting things into new files manually, there is a collection of CLI commands to scaffold the default files into your project so you can start editing them with little to no effort.

Currently, following options are available:

### set-app-vue

For adjusting the application main entrypoint and its behavior, you can scaffold the default `app/app.vue` file into your project using:

::: code-group
```sh [pnpm]
pnpx nuxt-ignis set-app-vue
```

```sh [npm]
npx nuxt-ignis set-app-vue
```

```sh [yarn]
yarn dlx nuxt-ignis set-app-vue
```

```sh [bun]
$ bunx nuxt-ignis set-app-vue
```

```sh [deno]
$ deno run --allow-run npm:npx nuxt-ignis set-app-vue
```
:::

The file will be created as `app/app.vue` and will be equal to the [Nuxt Ignis default](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/app/app.vue).

### set-css

For adjusting the default CSS styling, you can scaffold the default `app/assets/css/ignis.css` file into your project using:

::: code-group
```sh [pnpm]
pnpx nuxt-ignis set-css
```

```sh [npm]
npx nuxt-ignis set-css
```

```sh [yarn]
yarn dlx nuxt-ignis set-css
```

```sh [bun]
$ bunx nuxt-ignis set-css
```

```sh [deno]
$ deno run --allow-run npm:npx nuxt-ignis set-css
```
:::

The file will be created as `app/assets/css/ignis.css` and will be equal to the [Nuxt Ignis default](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/app/assets/css/ignis.css).


**NOTE:** If `NUXT_IGNIS_COPRENUXT_PUBLIC_IGNIS_CORE_CSS` is set to `false`, this file is **NOT** included in the project automatially. You either need to re-enable it or [set it manually](https://nuxt.com/docs/4.x/api/nuxt-config#css).

**NOTE:** Due to current library limitations, you need to ensure path `app/assets/css` exists in your project before running the command. This should be [fixed](https://github.com/AloisSeckar/elrh-cosca/issues/6) soon.

### set-eslint

For adjusting the ESLint configuration, you can scaffold the default `eslint.config.mjs` file into your project using:

::: code-group
```sh [pnpm]
pnpx nuxt-ignis set-eslint
```

```sh [npm]
npx nuxt-ignis set-eslint
```

```sh [yarn]
yarn dlx nuxt-ignis set-eslint
```

```sh [bun]
$ bunx nuxt-ignis set-eslint
```

```sh [deno]
$ deno run --allow-run npm:npx nuxt-ignis set-eslint
```
:::

The file will be created as `eslint.config.mjs` and will be equal to the [Nuxt Ignis default](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/eslint.config.mjs).
