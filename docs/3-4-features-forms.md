# Forms features

Nuxt Ignis contains following customizable forms related features:

## Vueform

- Packages: `@vueform/nuxt`
- Version: `1.16.0`

[Vueform](https://vueform.com/) is a powerful form library for Vue.js that provides a set of components and utilities for building forms with ease. It includes features like validation, error handling, and custom components.

The integration is provided via [`@vueform/nuxt` module](https://vueform.com/docs/installation#manual-installation) (check instructions for Nuxt) provided by the Vueform team.

`Vueform` integration is **disabled** by default. To enable it, you can use following environment variable:

```env
NUXT_PUBLIC_IGNIS_VUEFORM=true
```
Or [Forms preset](/2-3-optional-features.html#forms-preset):
```env
NUXT_PUBLIC_IGNIS_PRESET_FORMS=vueform
```

### Usage notice

In order to use `vueform` via Nuxt Ignis, it is currently required to create a custom config file in the root of your project named `vueform.config.ts` with following contents:

```ts [vueform.config.ts]
export default loadVueformConfig({
  // custom config here
})
```

This will reference [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/utils/config/vueform.config.ts) to inject `Vueform` into your project. The extra step is required as it seems not possible to transfer the config file from the layer. 

Referencing config like this allows to pass in a custom config that will be [defu-merged](/2-1-configuration.html#defu-merge) with the defaults provided by Nuxt Ignis. Alternatively, you can ignore Nuxt Ignis' default config and create your own file based on [Vueform docs](https://vueform.com/docs/installation#manual-installation) (check instructions for Nuxt).

## Formkit

- Packages: `@formkit/nuxt`
- Version: `1.6.9`

[Formkit](https://formkit.com/) is a powerful form library for Vue.js that provides a set of components and utilities for building forms with ease. It includes features like validation, error handling, and custom components.

The integration is provided via [`@formkit/nuxt` module](https://formkit.com/getting-started/installation) (check instructions for Nuxt) provided by the Formkit team.

`Formkit` integration is **disabled** by default. To enable it, you can use following environment variable:

```env
NUXT_PUBLIC_IGNIS_FORMKIT=true
```
Or [Forms preset](/2-3-optional-features.html#forms-preset):
```env
NUXT_PUBLIC_IGNIS_PRESET_FORMS=formkit
```

### Usage notice

In order to use `formkit` via Nuxt Ignis, it is currently _advised_ to create a custom config file in the root of your project named `formkit.config.ts` with following contents:

```ts [formkit.config.ts]
const config = loadFormkitConfig({
  // custom config here
})
// needs to be exported like this
export default config
```

This will reference [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/utils/config/formkit.config.ts) to inject `Formkit` into your project. The extra step is required as it seems not possible to transfer the config file from the layer. Note that `export default config` is a required syntax as `Formkit` expects such export in `formkit.config.ts` file.

Referencing config like this allows to pass in a custom config that will be [defu-merged](/2-1-configuration.html#defu-merge) with the defaults provided by Nuxt Ignis. Alternatively, you can provide your own config file (see [Additional options](#additional-formkit-options)) ignore Nuxt Ignis' default config and create your own file based on [Formkit docs](https://formkit.com/getting-started/installation) (check instructions for Nuxt).

### Additional options

- you can select default language locale via `NUXT_PUBLIC_IGNIS_FORMKIT_LOCALE`
- if [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/core/main/formkit.config.ts) is not suitable for your project, you may specify path to your own using `NUXT_PUBLIC_IGNIS_FORMKIT_CONFIG`
