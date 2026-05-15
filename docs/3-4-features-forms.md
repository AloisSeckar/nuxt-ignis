# Forms features

Nuxt Ignis contains following customizable forms related features:

## Vueform

<PackagesReference :packages="[{ name: '@vueform/nuxt', version: '1.29.0' }, { name: '@vueform/vueform', version: '1.13.11' }]" />

[Vueform](https://vueform.com/) is a powerful form library for Vue.js that provides a set of components and utilities for building forms with ease. It includes features like validation, error handling, and custom components.

The integration is provided via [`@vueform/nuxt` module](https://vueform.com/docs/installation#manual-installation) (check instructions for Nuxt) provided by the Vueform team.

`Vueform` integration is **disabled** by default. To enable it, you can use following environment variable:

```dotenv [.env]
NUXT_PUBLIC_IGNIS_FORMS_VUEFORM_ENABLED=true
```

Or [Forms preset](/2-3-optional-features.html#forms-preset):

```dotenv [.env]
NUXT_PUBLIC_IGNIS_PRESET_FORMS=vueform
```

Or equivalently in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['nuxt-ignis'],
  ignis: {
    forms: { vueform: { enabled: true } },
    // or via preset:
    // preset: { forms: 'vueform' },
  },
})
```

### Usage notice

In order to use `vueform` via Nuxt Ignis, it is currently required to create a custom config file in the root of your project named `vueform.config.ts` with following contents:

```ts [vueform.config.ts]
import { loadVueformConfig } from '@nuxt-ignis/forms/vueform-config'

export default loadVueformConfig({
  // your custom config here
})
```

Nuxt Ignis will scaffold default `vueform.config.ts` file on startup if none exists yet.

This will reference [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/v0.5.3/core/app/utils/config/vueform.ts) for `Vueform` in your project. The extra step is required as it seems not possible to transfer the config file from the layer.

Referencing config like this allows to pass in a custom config that will be [defu-merged](/2-1-configuration.html#defu-merge) with the defaults provided by Nuxt Ignis. Alternatively, you can ignore Nuxt Ignis' default config and create your own file based on [Vueform docs](https://vueform.com/docs/installation#manual-installation) (check instructions for Nuxt).

## Formkit

<PackagesReference :packages="[{ name: '@formkit/nuxt', version: '2.0.0' }]" />

[Formkit](https://formkit.com/) is a powerful form library for Vue.js that provides a set of components and utilities for building forms with ease. It includes features like validation, error handling, and custom components.

The integration is provided via [`@formkit/nuxt` module](https://formkit.com/getting-started/installation) (check instructions for Nuxt) provided by the Formkit team.

`Formkit` integration is **disabled** by default. To enable it, you can use following environment variable:

```dotenv [.env]
NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_ENABLED=true
```

Or [Forms preset](/2-3-optional-features.html#forms-preset):

```dotenv [.env]
NUXT_PUBLIC_IGNIS_PRESET_FORMS=formkit
```

Or equivalently in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['nuxt-ignis'],
  ignis: {
    forms: { formkit: { enabled: true } },
    // or via preset:
    // preset: { forms: 'formkit' },
  },
})
```

### Usage notice

In order to use `formkit` via Nuxt Ignis, you need a config file in the root of your project named `formkit.config.ts` with following contents:

```ts [formkit.config.ts]
import { loadFormkitConfig } from '@nuxt-ignis/forms/formkit-config'

const config = loadFormkitConfig({
  // your custom config here
})

// required for Formkit
export default config
```

Nuxt Ignis will scaffold default `formkit.config.ts` file on startup if none exists yet.

This will reference [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/v0.5.3/core/app/utils/config/formkit.ts) for `Formkit` in your project. The extra step is required as it seems not possible to transfer the config file from the layer. Note that `export default config` is a required syntax as `Formkit` expects such export in `formkit.config.ts` file.

Referencing config like this allows to pass in a custom config that will be [defu-merged](/2-1-configuration.html#defu-merge) with the defaults provided by Nuxt Ignis. Alternatively, you can provide your own config file (see [Additional options](#additional-options)) ignore Nuxt Ignis' default config and create your own file based on [Formkit docs](https://formkit.com/getting-started/installation) (check instructions for Nuxt).

### Additional options

- you can select default language locale via `NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_DEFAULT` (or `ignis.forms.formkit.default` in `nuxt.config.ts`)
- if [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/v0.5.3/core/app/utils/config/formkit.ts) is not suitable for your project, you may specify path to your own using `NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_CONFIG` (or `ignis.forms.formkit.config` in `nuxt.config.ts`)
