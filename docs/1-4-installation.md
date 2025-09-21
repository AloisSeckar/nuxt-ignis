# Installation

`nuxt-ignis` is available as [NPM package](https://www.npmjs.com/package/nuxt-ignis) that can be referenced as a single dependency with all the features wrapped up.

## Adding to your project

To enable `nuxt-ignis` in your Nuxt project, you can use the CLI tool to set it up quickly:

```bash
npx nuxt-ignis setup
```

First, the CLI tool will ask you whether you want to do the setup automatically. If you choose `y`es, it will perform all the steps for you. If you choose `n`o, it will guide you through the setup step-by-step prompting every action.

### Setup steps

1) Add the following dependency into your `package.json`:

```json [package.json]
{
  "dependencies": {
    "nuxt-ignis": "0.4.0"
  }
}
```

2) For `pnpm`, you should also configure the `approvedBuilds` and `packageManager`:

```json [package.json]
{
  "pnpm": {
    "onlyBuiltDependencies": [
      "@parcel/watcher",
      "@tailwindcss/oxide",
      "better-sqlite3",
      "esbuild",
      "maplibre-gl",
      "puppeteer",
      "sharp",
      "unrs-resolver",
      "vue-demi"
    ]
  },
  "packageManager": "pnpm@10.17.0"
}
```

3) Add following section into your `nuxt.config.ts` to extend the `nuxt-ignis` layer:

```ts [nuxt.config.ts]
{
  "extends": [
    "nuxt-ignis"
  ]
}
```

4) Adjust `.npmrc` file with following content (if you don't have it yet):

```[.npmrc]
shamefully-hoist=true
```

5) Adjust `.gitignore` file to exclude Nuxt Ignis-related auxiliary files:

```[.gitignore]
_ignis-config.json
```

### Customization

To tailor Nuxt Ignis to fit your project needs, setup your `.env` file accordingly. Check [the reference](/2-5-full-reference.html) for all available config options.

**Congratulations!** You are now armed ready to build your next awesome project in Nuxt!

## More info

- Proceed to the [Configuration](/2-1-configuration.html) section to get the big picture and learn how to set `nuxt-ignis` up for your project.
