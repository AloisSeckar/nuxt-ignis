# UI features

Nuxt Ignis contains following customizable UI related features:

## Nuxt UI

- Packages: `@nuxt/ui`
- Version: `3.1.3`

[`Nuxt UI`](https://ui.nuxt.com/) is an official UI library for Nuxt, providing a set of components and utilities to build user interfaces. It is designed to be flexible and easy to use and it might be a natural choice when building Nuxt applications. It also brings in `Tailwind CSS` and `Nuxt Icon` modules out of the box.

`Nuxt UI` is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_UI=true
```
Or [UI preset](/2-3-optional-features.html#ui-preset):
```dotenv
NUXT_PUBLIC_IGNIS_PRESET_UI=nuxt-ui
```

### Usage notice

To abstract users from the requirment of [adding CSS files manually](https://ui.nuxt.com/getting-started/installation/nuxt#import-tailwind-css-and-nuxt-ui-in-your-css), Nuxt Ignis is automatically including `ignis-nuxt-ui.css` with necessary import directives:

```css [ignis-nuxt-ui.css ~vscode-icons:file-type-css~]
@import "tailwindcss";
@import "@nuxt/ui";
```

Your custom CSS files may be added via [dedicated option](#custom-css).

## Tailwind CSS

- Packages: `@tailwindcss/vite`
- Version: `4.1.10`

**NOTE:** Integration via [`@nuxtjs/tailwindcss` module](https://nuxt.com/modules/tailwindcss) is temporarily bridged by direct Vite integration until `v7` with updated `Tailwind v4` support is released.

[`Tailwind CSS`](https://tailwindcss.com/) is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML. It is highly customizable and can be extended with plugins.

`Tailwind CSS` is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_TAILWIND=true
```
Or [UI preset](/2-3-optional-features.html#ui-preset):
```dotenv
NUXT_PUBLIC_IGNIS_PRESET_UI=tailwind
```

**NOTE:** If `@nuxt/ui` is enabled, this setting is <span style="color: red">**ignored**</span> as `Tailwind CSS` is already included.

### Usage notice

To abstract users from the requirment of [adding CSS files manually](https://tailwindcss.com/docs/installation/), Nuxt Ignis is automatically including `ignis-tailwind.css` with necessary import directive:

```css [ignis-tailwind.css]
@import "tailwindcss";
```

Your custom CSS files may be added via [dedicated option](#custom-css).

**Note:** In order to use `Tailwind CSS` utility classes in your custom CSS files, you still need to import `tailwindcss` set in each of them:

```css [custom.css]
@import "tailwindcss";

/* your custom CSS with Tailwind utility classes */
```

## Open Props

- Packages: `open-props`
- Version: `1.7.15`

[`Open Props`](https://open-props.style/) is a collection of CSS custom properties (variables) that can be used to style your application. It provides a set of design tokens that can be used to create consistent and reusable styles across your application.

Open Props are **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_OPENPROPS=true
```

### Usage notice

To abstract users from the requirment of adding CSS files manually, Nuxt Ignis is automatically including `ignis-open-props.css` with necessary import directives. The file also contains definition for style shown on the `Ignis Features` overview page:

```css [ignis-open-props.css]
@import "open-props/normalize";
@import "open-props/buttons";

.openprops-feature {
  background: var(--gradient-18);
  color: var(--gray-12);
}
```

Your custom CSS files may be added via [dedicated option](#custom-css).

## Custom CSS

You can provide paths to your custom CSS files via `NUXT_PUBLIC_IGNIS_CSS` environment variable. The values must be valid CSS file paths delimited by commas (`,`). Nuxt aliases (eg. `@` or `~`) are supported. Whitespaces around will be trimmed, so it doesn't matter if you add or omit them.

For example:

```[.env]
NUXT_PUBLIC_IGNIS_CSS='@/assets/custom1.css, @/assets/custom2.css'
```

Provided values will be [defu-merged](/2-1-configuration.html#defu-merge) into `nuxt.config.ts` under `css` property::

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  css: [
    '@/assets/custom1.css',
    '@/assets/custom2.css'
  ]
})
```
