# Performance

Following modules helps you with your app performance:

## Nuxt Fonts

<PackagesReference :packages="[{ name: '@nuxt/fonts', version: '0.13.2' }]" />

[Nuxt Fonts](https://fonts.nuxt.com/) is an official module for working with web fonts. It allows you to easily integrate and optimize web fonts.

`@nuxt/fonts` is a [core feature](/2-2-core-features.html) and it is **enabled** by default. To disable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_CORE_FONTS=false
```

## Nuxt Image

<PackagesReference :packages="[{ name: '@nuxt/image', version: '2.0.0' }]" />

[Nuxt Image](https://image.nuxt.com/) is an official module for working with images. Resize and transform your images using built-in optimizer or your favorite images CDN.

`@nuxt/image` is a [core feature](/2-2-core-features.html) and it is **enabled** by default. To disable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_CORE_IMAGE=false
```

**Note**: Nuxt Ignis uses [`@nuxt/image` v2](https://nuxt.com/blog/nuxt-image-v2) which includes some breaking changes. Please refer to the [migration guide](https://image.nuxt.com/migration/v2) if you experience troubles after switching.

## Nuxt Scripts

<PackagesReference :packages="[{ name: '@nuxt/scripts', version: '0.13.0' }]" />

[Nuxt Scripts](https://scripts.nuxt.com/) is an official module for working with scripts. It lets you load third-party scripts with better performance, privacy, security and DX. It includes many popular third-parties out of the box.

`@nuxt/scripts` is a [core feature](/2-2-core-features.html) and it is **enabled** by default. To disable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_CORE_SCRIPTS=false
```

## Pinia

<PackagesReference :packages="[{ name: 'pinia', version: '3.0.4' }, { name: '@pinia/nuxt', version: '0.11.3' }]" />

[Pinia](https://pinia.vuejs.org/) is a de-facto standard Vue solution for state management. It is type safe, extensible, modular by design and SSR-friendly with tiny runtime. 

`pinia` is a [core feature](/2-2-core-features.html) and it is **enabled** by default. To disable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_CORE_PINIA=false
```
