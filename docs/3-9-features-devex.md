# DevEx

For better developer experience, Nuxt Ignis offers following features:

## ESlint

<PackagesReference :packages="[{ name: '@nuxt/eslint', version: '1.9.0' }, { name: 'typescript', version: '5.9.3' }]" />

Nuxt Ignis utilizes `@nuxt/eslint` module for convenient [ESLint](https://eslint.org/) integration in your project. For [VS Code](https://code.visualstudio.com/), it is recommended to install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for even better integration including "linting on save" configuration.

To ensure correct functionality, `typescript` [must be included](https://eslint.nuxt.com/packages/module#quick-setup) as an explicit dependency.

`@nuxt/eslint` is a [core feature](/2-2-core-features.html) and it is **enabled** by default. To disable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_CORE_ESLINT=false
```

The default configuration in Nuxt Ignis' `nuxt.config.ts` is:

```ts [nuxt.config.ts]
// ...
  eslint: {
    config: {
      stylistic: true,
    },
  },
// ...
```

So the module is also checking for styling issues. [Prettier](https://prettier.io/) or other solution is **NOT** used.

### Usage notice

`@nuxt/eslint` module automatically generates ready-to-use `eslint.config.mjs` file in your project root directory, if not yet present. This file is scaffolded to include recommended Nuxt-related ESLint rules.

The template looks like this:

```js [eslint.config.mjs]
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
)
```

As it inherits from generated Nuxt content, running `pnpm dev` for the first time is **REQUIRED** to make linting work in your projects.

Because Nuxt Ignis author is _opinionated_ about some of the default rules, there is also a config override available. To create Nuxt Ignis default instead of plain `@nuxt/eslint` version, you can use the CLI tool to [scaffold the default file](/3-12-features-cli.html#set-eslint) into your project.

## Logging

<PackagesReference :packages="[{ name: 'consola', version: '3.4.2' }, { name: 'date-fns', version: '4.1.0' }]" />

Use `NUXT_PUBLIC_IGNIS_LOG_LEVEL` to set level of log messages captured with `consola`. The default value is `info`.

Possible values are: `fatal`, `error`, `warn`, `log`, `info`, `success`, `debug`, `trace`, `silent`, `verbose`

Timestamps for logs are formatted using `date-fns` library, which is also available in target apps. You can invoke it like this:

```ts [your-code.ts]
import { format } from 'date-fns'

const formatString = 'yyyy-MM-dd HH:mm:ss'
const formattedDate = format(new Date(), formatString)
// sample output: 2025-08-01 11:12:13
```

**Note:** Formatting via `date-fns` is also exported as an util function [`ignisDate`](/3-11-features-built-ins.html#date-formatting).

## Error handling

By default, Nuxt Ignis registers global Vue [error](https://vuejs.org/api/application.html#app-config-errorhandler) and [warn](https://vuejs.org/api/application.html#app-config-warnhandler) handler to process errors and warnings in your app. The error/warn object is sent to `consola` error/warn function. Additional info provided by Vue is also captured in debug mode. Check the [implementation](https://github.com/AloisSeckar/nuxt-ignis/blob/v0.5.0/core/app/plugins/errorHandler.ts).

If you don't want to rely on the default behavior, you can disable those handlers by setting `NUXT_PUBLIC_IGNIS_ERROR` to `false`.

## Testing

<PackagesReference :packages="[{ name: 'nuxt-spec', version: '0.1.14' }]" />

Nuxt Ignis embraces [Vitest](https://vitest.dev/) as its test runner library. More specifically, it uses proprietary **Nuxt Spec** package that provides a base layer for testing Nuxt modules and applications united under single dependency. With that you have out-of-the-box access to:

- [vitest](https://www.npmjs.com/package/vitest) **v4** as the fundamental testing framework
- [@vitest/browser](https://www.npmjs.com/package/@vitest/browser) as the experimental browser runner
- [happy-dom](https://www.npmjs.com/package/happy-dom) as the headless browser runtime
- [playwright-core](https://www.npmjs.com/package/playwright-core) as the headless browser testing framework
- [@vue/test-utils](https://www.npmjs.com/package/@vue/test-utils) for testing Vue stuff
- [@nuxt/test-utils](https://www.npmjs.com/package/@nuxt/test-utils) for testing Nuxt stuff

Nuxt Spec is currently an opinionated solution and one of the few features that are fully baked into Nuxt Ignis without an opt-out. I am sorry for that, but hopefully it will provide you enough options to test your apps in a meaningful and convenient way.

If you follow the [default installation](/1-4-installation.html#setup-steps), you will get following:

- default `vitest.config.ts` file created in your project root
- example test files created in `/test` folder
- shorthand commands for running tests in `package.json` scripts:
  - `test` to run the test suite once
  - `test-u` to run the test once and update snapshot files if they changed
  - `test-i` to run the test suite in interactive mode

## Nuxt Security

<PackagesReference :packages="[{ name: 'nuxt-security', version: '2.4.0' }]" />

Nuxt Ignis includes [`nuxt-security` module](https://nuxt-security.vercel.app/) by default to help you establish best security practices in your Nuxt application. It provides a set of security headers and other features to protect your app from common vulnerabilities.

The module is imported as-is with default configuration used. Its behavior can be altered by adjusting `security` option in `nuxt.config.ts` file in your target app. Refer to [the documentation](https://nuxt-security.vercel.app/getting-started/configuration) for available options.

You can disable module inclusion by setting the following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_CORE_SECURITY=false
```

## CLI tools

<PackagesReference :packages="[{ name: 'elrh-cosca', version: '0.3.4' }]" />

Using experimental [elrh-cosca](https://github.com/AloisSeckar/elrh-cosca) library, Nuxt Ignis provides couple of CLI tools to help you set up your project:

- `npx set-eslint`: Creates a new ESLint configuration file with Nuxt Ignis defaults.
- `npx set-gitignore`: Adds Nuxt Ignis-related files into .gitignore.
