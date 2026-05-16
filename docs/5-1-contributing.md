# Contributing Guide

<p style="color: gold">NOTE: This guide (except "Testing") was auto-generated and sooner or later it should be improved by the human contributors.</p>

Thank you for your interest in contributing to our project! We welcome contributions from the community and appreciate your help in making our project better.

## How to Contribute

1. **Report Bugs**: If you find a bug, please open an issue on our GitHub repository. Include as much detail as possible, including steps to reproduce the issue.

2. **Suggest Features**: We love to hear your ideas for new features! Please open an issue to discuss your suggestion before implementing it.

3. **Submit Pull Requests**: If you want to contribute code, please fork the repository and create a new branch for your feature or bug fix. Once you're ready, submit a pull request for review.

## Development Setup

<p style="color: gold">TODO instructions</p>

Necessary prerequisite is to have Node.js installed on your machine. At least `v22.5.0` is required, but we recommend using the latest LTS version.

Recommended IDE is [Visual Studio Code](https://code.visualstudio.com/).

Recommended package manager is [pnpm](https://pnpm.io/) (version `11.0.8` is used across the project).

## Package Management

We use `pnpm` as our package manager with monorepo support with `pnpm-workspace.yaml` file located in the repository root.

Following settings are applied:

```yaml [pnpm-workspace.yaml]
# subfolders where those monorepo settings apply
packages:
  - core
  - demos/*
  - docs
  - modules/*

# https://pnpm.io/settings#nodelinker
# avoid certain linking issues by having all deps physically in root /node_modules
nodeLinker: hoisted

# https://pnpm.io/catalogs#defining-catalogs
# global version definition for the repeated packages
catalog:
  # see https://github.com/AloisSeckar/nuxt-ignis/blob/v0.5.3/pnpm-workspace.yaml for current values

# https://pnpm.io/settings#minimumreleaseage
# new packages cannot be installed earlier than one week after release
minimumReleaseAge: 4320
# trusted and verified packages may be excluded using following list
minimumReleaseAgeExclude:
# - package-name

# https://pnpm.io/settings#allowBuilds
allowBuilds:
  # post-install scripts required for correct behavior
  '@parcel/watcher': true
  '@tailwindcss/oxide': true
  esbuild: true
  sharp: true
  unrs-resolver: true
  vue-demi: true
  # post-install scripts that can be ignored
  maplibre-gl: false
  puppeteer: false

# https://pnpm.io/settings#overrides
# specific package versions (mostly temporary because known vulnerabilities)
overrides:
  # - package-name
  # see https://github.com/AloisSeckar/nuxt-ignis/blob/v0.5.3/pnpm-workspace.yaml for current values

# https://pnpm.io/settings#trustpolicy
# packages cannot change from trusted to untrusted
trustPolicy: no-downgrade

# https://pnpm.io/settings#verifydepsbeforerun
# check and throw error if node_modules are not installed corectly
# do NOT auto-install via 'install' value
verifyDepsBeforeRun: error
```

### Reasoning for `allowBuilds` setup

Following packages require their post-install scripts to run:

- **`@parcel/watcher`** — runs `node-gyp-build`: picks a precompiled native `.node` binary for your OS/arch (falls back to compiling C++ via node-gyp). Provides fast FS watching used by Nuxt/Vite.
- **`@tailwindcss/oxide`** — runs `node-gyp-build`: selects the prebuilt Rust binary for Tailwind v4's engine.
- **`esbuild`** — runs `node install.js`: verifies/links the platform-specific `@esbuild/<os>-<arch>` binary into `node_modules/esbuild/bin`.
- **`sharp`** — runs `node install/check`: verifies the prebuilt `libvips`/`@img/sharp-*` native binaries are usable; can rebuild from source if not. Required by `@nuxt/image` and similar.
- **`unrs-resolver`** — runs `napi-postinstall`: links the platform-specific `@unrs/resolver-binding-*` (Rust/NAPI) native binary used by ESLint and Nuxt module resolution.
- **`vue-demi`** — runs `node scripts/postinstall.js`: switches its own `dist/` shim files to point at Vue 2 or Vue 3 based on the resolved `vue` version. Required by Pinia and VueUse.

Following packages may be skipped as their post-install scripts are not related:

- **`maplibre-gl`** — has a `prepare` script that is a no-op for registry installs; only relevant when installed directly from a git ref, which we don't do.
- **`puppeteer`** — runs `node install.mjs`: would download a full Chromium (~150–300 MB) from `storage.googleapis.com`. Not needed — e2e tests use Playwright via `@nuxt/test-utils`. Chromium download is also blocked at source via `PUPPETEER_SKIP_DOWNLOAD=true` in `.npmrc`.

## Testing

Nuxt Ignis ships with proprietary [Nuxt Spec](https://github.com/AloisSeckar/nuxt-spec) package that provides a Vitest-based layer for testing Nuxt modules and applications united under single dependency. See [Testing section](/3-9-features-devex.html#testing) in DevEx features overview for more details.

### Test suite

To run the test suite, use the following command:

```[pnpm]
pnpm test
```

This runs `vitest run` under the hood, which executes all tests in the project. We prefer to have test files located in the `/core/tests` directory and follow the naming convention `*.test.ts`.

Vitest snapshot files should be stored in the `/core/tests/[test_file_name]` directory. If you need to create/update snapshot files, you can run:

```[pnpm]
pnpm test -u
```

Default behavior of the test suite is to run once and end. If you prefer, Vitest interactive mode is also available via:

```[pnpm]
pnpm test -i
```

### Demo applications

Inside `/demos` folder there are growing collection of simple demo apps that can be used for evaluating and testing Nuxt Ignis features.

Unlike real applications that extend `nuxt-ignis` layer from an NPM package, those demos follow the mono-repo pattern with:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: [
    '../../core',
  ]
})
```

This allows us to immediately test new changes without the need to publish them first as a new version of `nuxt-ignis` NPM package.

Technically, the apps only require to be directly dependent on `nuxt` itself.

We are adding `@nuxt/eslint` and `typescript` dependencies as well to allow lint checks and updates on save via VS Code [`ESLint` extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). The required eslint configuration is defined inside `/.vscode/settings.json` file and should be thus automatically applied when you open Nuxt Ignis in VS Code.

For demo apps we are deliberately **not committing** `pnpm-lock.yaml` and `eslint.config.mjs` to reduce Git repository size. The files will be auto-generated when you run `pnpm install` and `pnpm dev` for the first time. Linting won't work until `eslint.config.mjs` exists.

## License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](https://github.com/AloisSeckar/nuxt-ignis/blob/main/LICENSE).
