# Nuxt Ignis

![Nuxt Ignis](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/public/nuxt-ignis.png)

This is a _not-another-template-starter_ for Nuxt web applications. It is mostly based on the setup I'd currently use to start a new "real world" [Nuxt](https://nuxt.com/) webapp. The main goal is to abstract from difficult and repetitive dependency management across more Nuxt projects. All common features are replaced with just one `package.json` dependency (+ the specific ones for the project).

However, instead of being heavily opinionated as usual, Nuxt Ignis is **optionated**. It incorporates a vast spectrum of modules and features, but the end user controls what will appear in the final bundle. This is achieved by (not) adding modules and configuration into `nuxt.config.ts`. Although this file must remain static on build time and cannot be changed afterwards, nothing is preventing it from being dynamically prepared. And in this phase, environment variables can be used to adjust what makes it into the actual build.

The project will improve and grow together with my skills. And - hopefully - through addressing the feedback from you, the (future) users. I also try to include **WHAT** and **WHY** comments based on my knowledge about the framework and used libraries.

See [CHANGELOG](https://nuxt-ignis.com/4-1-changelog.html) for the latest changes.

## How to use

`nuxt-ignis` is available as [NPM package](https://www.npmjs.com/package/nuxt-ignis) that can be referenced as a single dependency with all the features incoming.

1) Add the following dependency into your `package.json`:

```json
"nuxt-ignis": "0.4.0"
```

2) Add following section into your `nuxt.config.ts`:

```ts
extends: [
  'nuxt-ignis'
]
```

3) Add `.npmrc` file with following content (if you don't have it yet):

```.npmrc
shamefully-hoist=true
strict-peer-dependencies=false
```

4) Setup your `.env` to fit your project needs. Check [Configuration](https://nuxt-ignis.com/2-1-configuration.html) section for reference.

You are ready to build your next awesome project in Nuxt!

## Docs

Learn more and check all the configuration options at **[Nuxt Ignis Docs](https://nuxt-ignis.com)**

## Contributing

If you want to help making Nuxt Ignis better, please check our [Contributing Guide](https://nuxt-ignis.com/5-1-contributing).
