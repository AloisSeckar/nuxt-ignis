# DevEx

For better developer experience, Nuxt Ignis offers following features:

## Nuxt config overrides

You can always modify your `nuxt.config.ts` file directly and override any setting you need. However, Nuxt Ignis also provides a way to override some of the settings via environment variables. This might be useful for both 

allows you to change the behavior of your Nuxt app without modifying the config file directly, which can be useful for different environments (development, production, etc.).

Currently, it is possible to override following Nuxt config via .env variables:
- `NUXT_PUBLIC_IGNIS_SSR` - set to `false` to disable SSR (results in `ssr: false` in Nuxt Config)
- `NUXT_PUBLIC_IGNIS_PAGES` - set to `false` to disable multiple pages in simple projects (results in `pages: false` in Nuxt Config)

## Logging

Use `NUXT_PUBLIC_INGIS_LOG_LEVEL` to set level of log messages captured with `consola`. The default value is `info`.

Possible values are: `fatal`, `error`, `warn`, `log`, `info`, `success`, `debug`, `trace`, `silent`, `verbose`

## Error handling

By default, Nuxt Ignis registers global Vue [error](https://vuejs.org/api/application.html#app-config-errorhandler) and [warn](https://vuejs.org/api/application.html#app-config-warnhandler) handler to process errors and warnings in your app. The error/warn object is sent to `consola` error/warn function. Additional info provided by Vue is also captured in debug mode. Check the implementation [here](https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/heads/main/core/plugins/errorHandler.ts).

If you don't want to rely on the default behavior, you can disable those handlers by setting `NUXT_PUBLIC_IGNIS_ERROR` to `false`.

## Testing

See [testing section](/5-1-contributing.html#testing) in contributing guide.
