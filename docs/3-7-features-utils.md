# Utility features

Nuxt Ignis offers following utility options:

## VueUse integration

- Packages: `@vueuse/core`
- Version: `13.4.0`

[VueUse](https://vueuse.org/) is a collection of essential Vue Composition Utilities that provides a set of reusable functions and utilities for Vue.js applications. It includes features like reactive state management, event handling, and more.

`VueUse` integration is a [core feature](/2-2-core-features.html) and it is **enabled** by default. To disable it, you can use following environment variable:

```env
NUXT_PUBLIC_IGNIS_CORE_VUEUSE=false
```

## VueEquipment integration

- Packages: `@maas/vue-equipment` 
- Version: `1.0.0-beta.30`

[VueEquipment](https://www.vue.equipment/) is a collection of Vue composables and plugins that provides a set of reusable functions and utilities for Vue.js applications.

`VueEquipment` integration is an [optional feature](/2-3-optional-features.html) and it is **disabled** by default. To enable it, you can use following environment variable:

```env
NUXT_PUBLIC_IGNIS_EQUIPMENT_ENABLED=true
```

### Additional `VueEquipment` options

Simply enabling `VueEquipment` actually does **nothing** as you also need to specifify which composables and/or plugins you want to use.

There are two config values for this purpose:
- `NUXT_PUBLIC_IGNIS_EQUIPMENT_COMPOSABLES` - which `Vue Equipment` composables should be imported (coma-separated list)
- `NUXT_PUBLIC_IGNIS_EQUIPMENT_PLUGINS` - which `Vue Equipment` plugins should be imported (coma-separated list)

The values must be a coma-separated list of available composables and plugins(see [the docs](https://www.vue.equipment/overview/getting-started.html)).

For example:

```[.env]
NUXT_PUBLIC_IGNIS_EQUIPMENT_COMPOSABLES=useCountdown
NUXT_PUBLIC_IGNIS_EQUIPMENT_PLUGINS=MagicNoise, MagicMarquee
```

Whitespaces around will be trimmed, so it doesn't matter if you add or omit them.
