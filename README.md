# Nuxt Ignis

![Nuxt Ignis](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/public/nuxt-ignis.png)

This is a _not-another-template-starter_ for Nuxt web applications. It is mostly based on the setup I'd currently use to start a new "real world" [Nuxt](https://nuxt.com/) webapp. The main goal is to abstract from difficult and repetitive dependency management across more Nuxt projects. All common features are replaced with just one `package.json` dependency (+ the specific ones for the project).

However, instead of being heavily opinionated as usual, Nuxt Ignis is **optionated**. It incorporates a vast spectrum of modules and features, but the end user controls what will appear in the final bundle. This is achieved by (not) adding modules and configuration into `nuxt.config.ts`. Although this file must remain static on build time and cannot be changed afterwards, nothing is preventing it from being dynamically prepared. And in this phase, environment variables can be used to adjust what makes it into the actual build.

The project will improve and grow together with my skills. And - hopefully - through addressing the feedback from you, the (future) users. I also try to include **WHAT** and **WHY** comments based on my knowledge about the framework and used libraries.

See [CHANGELOG](https://nuxt-ignis.com/4-1-changelog.html) for the latest changes.

## How to use

`nuxt-ignis` is available as [NPM package](https://www.npmjs.com/package/nuxt-ignis) that can be referenced as a single dependency with all the features incoming.

1) Run CLI tool to set it up in root of your project:

```bash
npx nuxt-ignis setup
```

2) Setup your `.env` to fit your project needs. 

3) You are ready to build your next awesome project in Nuxt!


- Check [Installation guide](https://nuxt-ignis.com/1-4-installation.html) for further reference.
- Check [Configuration guide](https://nuxt-ignis.com/2-1-configuration.html) for available options.


## Docs

Learn more in the **[Nuxt Ignis documentation](https://nuxt-ignis.com)**.

## Contributing

If you want to help making Nuxt Ignis better, please check our [Contributing Guide](https://nuxt-ignis.com/5-1-contributing).
