# Why Nuxt Ignis?

![Nuxt Ignis](https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/heads/main/core/public/nuxt-ignis.png)

Nuxt Ignis is a _not-another-template-starter_ for [Nuxt](https://nuxt.com/) web applications. Unlike other heavily opinionated solutions, this one is designed to be **optionated**.

The main goal is to abstract from difficult and repetitive dependency management across multiple Nuxt projects. Instead of managing a long list of dependencies in `package.json`, you can use just one dependency . `nuxt-ignis`. We are leveraging the power of [Nuxt Layers](https://nuxt.com/docs/getting-started/layers). Not only you can re-use the components, composables and utils. You can also bring in the npm packages that are defined in the layer and used in the extending application.

Nuxt Ignis incorporates a number of modules and features. But to keep the setup flexible as well, the end user controls what will appear in the final bundle. This is technically achieved by (not) adding modules and configuration into `nuxt.config.ts`. Although this file must remain static at build time and cannot be changed afterwards, it can be dynamically prepared. During this phase, `.env` variables can be used to adjust what makes it into the actual build.

Learn more about the idea in the [configuration](/2-1-configuration) section.

See [changelog](4-1-changelog.html) for the latest changes.

## What is Nuxt Ignis?

Continue to the [Overview](/1-2-overview) section for summary of the features that are available.
