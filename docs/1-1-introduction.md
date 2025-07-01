# Why Nuxt Ignis?

![Nuxt Ignis](https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/heads/main/core/public/nuxt-ignis.png)

Nuxt Ignis is a _not-another-template-starter_ for [Nuxt](https://nuxt.com/) web applications. Unlike other heavily opinionated solutions, this one is designed to be **optionated**.

The main goal is to abstract from difficult and repetitive dependency management across multiple Nuxt projects. Instead of managing a long list of dependencies in `package.json`, you can depend just on single `nuxt-ignis` package. 

This is possible, because we are leveraging the power of [Nuxt Layers](https://nuxt.com/docs/getting-started/layers). Not only you can re-use the components, composables and utils like that. You can also bring in the NPM packages that are defined in the layer and use them in the extending application.

Nuxt Ignis incorporates a number of modules and features. But to keep the setup flexible as well, the end user controls what will appear in the final bundle. This is technically achieved by (not) adding modules and configuration into `nuxt.config.ts`. Although this file must remain static at build time and cannot be changed afterwards, it can be dynamically prepared. During this phase, environment variables can be used to adjust what makes it into the actual build.

Learn more about the idea in the [configuration section](/2-1-configuration).

## More info

- Continue to the [overview](/1-2-overview) for summary of all the available features.
- See [changelog](4-1-changelog.html) to display the latest changes.
