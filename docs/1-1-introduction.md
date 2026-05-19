# Why Nuxt Ignis?

![Nuxt Ignis](https://raw.githubusercontent.com/AloisSeckar/nuxt-ignis/refs/heads/main/core/public/nuxt-ignis.png)

Nuxt Ignis is a _not-another-template-starter_ for [Nuxt](https://nuxt.com/) web applications. Unlike other heavily opinionated solutions, this one is designed to be **optionated**.

The main goal is to abstract from difficult and repetitive dependency management across multiple Nuxt projects. Instead of managing a long list of dependencies in `package.json`, you can depend on just a single `nuxt-ignis` package.

This is possible, because we are leveraging the power of [Nuxt Layers](https://nuxt.com/docs/getting-started/layers). Not only you can re-use the components, composables and utils by _extending_ from the layer, you can also bring in the NPM packages that are defined in there and use them in the extending application.

Like so, Nuxt Ignis incorporates a number of modules and features and it is super simple to start using them. But this alone would mean bloated "fat" packages full of things you don't really need and want. Thus the goal is also to keep the setup flexible as possible and the end user shall control what will really appear in the final bundle. This is technically achieved thanks to another cool Nuxt feature - [Nuxt Modules](https://nuxt.com/docs/getting-started/modules).

Nuxt Ignis is divided into several internal modules. Based on flexible configuration, the core mechanism decides which modules are requested to be activated and then those modules decide, what will be activated, during their setup phases. The configuration can either be inlined in `nuxt.config.ts` in the `ignis` config key, or passed via the Nuxt runtime config mechanism using `.env` variables. The result is almost fully customizable based on your needs. And you still import only one package!

Learn more about the idea in the [configuration section](/2-1-configuration).

## More info

- Continue to the [overview](/1-2-overview) for summary of all the available features.
- Go to [installation](/1-4-installation) to learn how to start using Nuxt Ignis.
- See [changelog](4-1-changelog.html) to display the latest changes.
