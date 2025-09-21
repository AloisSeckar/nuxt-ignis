# DevEx

For better developer experience, Nuxt Ignis offers following features:

## ESlint

<PackagesReference :packages="[{ name: '@nuxt/eslint', version: '1.9.0' }, { name: 'typescript', version: '5.9.2' }]" />

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

Because Nuxt Ignis author is _opinionated_ about some of the default rules, there is also a config override available. A CLI tool is provided to generate a default ESLint configuration file enhanced with some rule overrides.

To create Nuxt Ignis default instead of plain `@nuxt/eslint` version, use the following command:

```bash
npx set-eslint
```

Check the [file template](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/eslint.config.mjs) for more details and explanation.

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

## Error handling

By default, Nuxt Ignis registers global Vue [error](https://vuejs.org/api/application.html#app-config-errorhandler) and [warn](https://vuejs.org/api/application.html#app-config-warnhandler) handler to process errors and warnings in your app. The error/warn object is sent to `consola` error/warn function. Additional info provided by Vue is also captured in debug mode. Check the [implementation](https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/heads/main/core/plugins/errorHandler.ts).

If you don't want to rely on the default behavior, you can disable those handlers by setting `NUXT_PUBLIC_IGNIS_ERROR` to `false`.

## Testing

<PackagesReference :packages="[{ name: 'nuxt-spec', version: '0.1.8' }]" />

See [testing section](/5-1-contributing.html#testing) in contributing guide.

## Nuxt Security

<PackagesReference :packages="[{ name: 'nuxt-security', version: '2.4.0' }]" />

Nuxt Ignis includes [`nuxt-security` module](https://nuxt-security.vercel.app/) by default to help you establish best security practices in your Nuxt application. It provides a set of security headers and other features to protect your app from common vulnerabilities.

The module is imported as-is with default configuration used. Its behavior can be altered by adjusting `security` option in `nuxt.config.ts` file in your target app. Refer to [the documentation](https://nuxt-security.vercel.app/getting-started/configuration) for available options.

You can disable module inclusion by setting the following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_CORE_SECURITY=false
```

## CLI tools

<PackagesReference :packages="[{ name: 'elrh-cosca', version: '0.2.7' }]" />

Using experimental [elrh-cosca](https://github.com/AloisSeckar/elrh-cosca) library, Nuxt Ignis provides couple of CLI tools to help you set up your project:

- `npx set-eslint`: Creates a new ESLint configuration file with Nuxt Ignis defaults.
- `npx set-gitignore`: Adds Nuxt Ignis-related files into .gitignore.
