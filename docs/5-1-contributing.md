# Contributing Guide

<p style="color: gold">NOTE: This guide (except "Testing") was auto-generated and sooner or later it should be improved by the human contributors.</p>

Thank you for your interest in contributing to our project! We welcome contributions from the community and appreciate your help in making our project better.

## How to Contribute

1. **Report Bugs**: If you find a bug, please open an issue on our GitHub repository. Include as much detail as possible, including steps to reproduce the issue.

2. **Suggest Features**: We love to hear your ideas for new features! Please open an issue to discuss your suggestion before implementing it.

3. **Submit Pull Requests**: If you want to contribute code, please fork the repository and create a new branch for your feature or bug fix. Once you're ready, submit a pull request for review.

## Development Setup

<p style="color: gold">TODO instructions</p>

Necessary prerequisite is to have Node.js installed on your machine. Should be at least version 18.x, but we recommend using the latest LTS version.

Recommended IDE is [Visual Studio Code](https://code.visualstudio.com/).

Recommended package manager is [pnpm](https://pnpm.io/).

## Testing

Nuxt Ignis uses [Vitest](https://vitest.dev/) for testing. More specificly, it uses proprietary [Nuxt Spec](https://github.com/AloisSeckar/nuxt-spec) package that provides a base layer for testing Nuxt modules and applications united under single dependency. With that you have access to:
- `vitest` as the fundamental testing framework
- `happy-dom` as the headless browser runtime
- `playwright-core` as the headless browser testing framework
- `@vue/test-utils` for testing Vue stuff
- `@nuxt/test-utils` for testing Nuxt stuff

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

Technically, the apps only require to be directly dependent on `nuxt` itself. The only exception is `Nuxt Content` module, that also requires `better-sqlite3` as it is using it for creating in-memory database for content collections.

We are adding `@nuxt/eslint` and `typescript` dependencies as well to allow lint checks and updates on save via VS Code [`ESLint` extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). The required eslint configuration is defined inside `/.vscode/settings.json` file and should be thus automatically applied when you open Nuxt Ignis in VS Code.

For demo apps we are deliberately **not committing** `pnpm-lock.yaml` and `eslint.config.mjs` to reduce Git repository size. The files will be auto-generated when you run `pnpm install` and `pnpm dev` for the first time. Linting won't work until `eslint.config.mjs` exists.

## License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).
