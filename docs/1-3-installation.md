# Installation

`nuxt-ignis` is available as [NPM package](https://www.npmjs.com/package/nuxt-ignis) that can be referenced as a single dependency with all the features wrapped up.

## Adding to your project

To enable `nuxt-ignis` in your Nuxt project, follow these steps:

1) Add the following dependency into your `package.json`:
```json [package.json]
"nuxt-ignis": "0.3.3"
```

2) Add following section into your `nuxt.config.ts`:
```ts [nuxt.config.ts]
extends: [
  'nuxt-ignis'
]
```

3) Add `.npmrc` file with following content (if you don't have it yet):
```[.npmrc]
shamefully-hoist=true
strict-peer-dependencies=false
```

4) Setup your `.env` to fit your project needs. Check [the reference](/2-5-full-reference.html) for all available config options.

5) **Congratulations!** You are ready to build your next awesome project in Nuxt!

## More info

- Proceed to the [Configuration](/2-1-configuration.html) section to get the big picture and learn how to set `nuxt-ignis` up for your project.
