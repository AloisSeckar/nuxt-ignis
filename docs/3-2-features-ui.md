# UI features

Nuxt Ignis contains following customizable UI related features:

## Nuxt UI

<PackagesReference :packages="[{ name: '@nuxt/ui', version: '3.1.3' }]" />

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

Your custom CSS files may be added via [dedicated option](/3-9-features-nuxt#css).

## Tailwind CSS

<PackagesReference :packages="[{ name: '@tailwindcss/vite', version: '4.1.10' }]" />

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

Your custom CSS files may be added via [dedicated option](/3-9-features-nuxt#css).

**NOTE:** In order to use `Tailwind CSS` utility classes in your custom CSS files, you still need to import `tailwindcss` set in each of them:

```css [custom.css]
@import "tailwindcss";

/* your custom CSS with Tailwind utility classes */
```

## Open Props

<PackagesReference :packages="[{ name: 'open-props', version: '1.7.15' }, { name: 'postcss-jit-props', version: '1.0.16' }]" />

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

Your custom CSS files may be added via [dedicated option](/3-9-features-nuxt#css).

## Nuxt Charts

<PackagesReference :packages="[{ name: 'nuxt-charts', version: '0.1.11' }]" />

[Nuxt Charts](https://nuxt.com/modules/charts) is a module for creating visualy appealing charts in your Nuxt application.

`Nuxt Charts` integration is an [optional module](/2-3-optional-features.html#optional-modules) and it is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_CHARTS=true
```

### Usage notice

Because `Nuxt Charts` don't work with SSR, you need either to disable SSR in your app or make your charts client only. Check the [dedicated docs page](https://nuxtcharts.com/docs/server-side-rendering) for more details.

## Custom CSS

If you have custom CSS files you want to include in your project, you can do so by defining a comma-delimited array of paths as a value for the `NUXT_PUBLIC_IGNIS_CSS` environment variable.

Refer to [this page](/3-9-features-nuxt#css) for more details.
