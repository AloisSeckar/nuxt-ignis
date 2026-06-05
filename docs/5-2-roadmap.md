# Road Map

Features we plan to implement.

So far, this is rather an un-ordered list that might get prioritized later.

Do you have other ideas? Feel free to [open an issue](https://github.com/AloisSeckar/nuxt-ignis/issues).

## (build) Set staged publishing + GitHub provenance

To harden Nuxt Ignis from future supply-chain attacks, better publishing process should be established. Right now it is a manual action requiring to login and fill 2FA code every time. This is sub-optimal and current best practices should be adopted as soon as possible.

## (docs) Rewrite to honor new modular structure

The features described in chapter 3 were divided by some domain-driven logic, but now it feels "random" in comparison to newly introduced internal `@nuxt-ignis/*` modules. It makes more sense to re-organize them to align with each module. And possibly introduce new modules (i.e. `@nuxt-ignis/devex` is one of the candidates) if we identify some new domains.

## (docs) Interactive configuration editor

Nuxt Ignis relies heavily on configuration and we know it might not be easy to set it up properly (after all, we see it when working with demo apps). Therefore, we plan to enhance the docs website with a _WYSIWYG_ editor allowing you to pick features you want to have and immediately see the `nuxt.ignis.ts` config object or `.env` values required to make it work in your app.

## (cli) CLI configuration editor

Once the above is ready, we might bring this idea even further and incorporate config editor directly into CLI tools. Similar to how Nuxt allows you to pick some features and modules during its setup, the Nuxt Ignis configuration might get scaffolded based on your choices.

## (docs) Bundle size information

We try to keep the basic Nuxt Ignis package rather small. But with every new integration turned on, the bundle size increases. Some packages are small, others bigger. Target users should know and understand what will happen, if they incorporate this and that. We need to develop a reliable and quick way of measuring this, so we are able to provide up-to-date _"Turning `x` on will increase your bundle size by `y`"_ information for all our integrations.

## (test) Optimize testing

Right now, we have some number of Vitest unit tests both in core `nuxt-ignis` package and the `@nuxt-ignis/*` internal modules. Those always run before attempting to publish a new version. In addition, we are able to run e2e tests that - will start each demo application in `/demo` and do basic visual verification that the app starts correctly by comparing a screenshot taken with stored baselines.

The problems are:

- unit tests collection is likely smaller than it should be
- e2e tests are slow to run because `pnpm build` is still required to run for every demo when anything changes (trying to start dev server for each demo was even slower)
- tests run mostly ad-hoc and project lacks codified way of testing (like testing every PR or at least some daily workflows)

So there is a vast area for possible improvement and it should be done ASAP to ensure better stability and reliability.
