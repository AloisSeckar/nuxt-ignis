# Overview

## Key characteristics

- Nuxt Ignis is [`pnpm`](https://pnpm.io/) based project
- It uses [Nuxt](https://nuxt.com/) application framework built atop [Vue.js](https://vuejs.org/)
- It is available as standalone NPM package defining a _base layer_ to extend from

### Notice on `pnpm` usage

Technically, you shouldn't be forced into using `pnpm` in order to use Nuxt Ignis. The other package managers should, in theory, behave similarly enough to allow the same experience. But so far we are unable to provide reliable support for alternative tooling.

The most limiting factor is that you need mechanism that allows automated hoising of transitive dependencies into root level `node_modules` to avoid having them listed in `package.json`. Plain old `npm` just does so by default (but it comes with several other drawbacks which is why it wasn't the first choice). Making `pnpm` behave like this requires some adjustments, but we provide them and regularly test our setups. For `yarn`, `bun`, `deno` and whatever else may exists, the behavior is not tested and not guaranteed. Contribution is welcome, if you have something to say regarding any alternative.

## Flexibility

With Nuxt Ignis you are in full control over the final shape of your app via `nuxt.config.ts` configuration and/or `.env` variables. We recommend the first option thanks to better type support. On the other hand, environment variables do not require code changes and re-build upon change and allow having different instances.

Learn more in the [configuration](/2-1-configuration) section.

## Default features

Nuxt Ignis is designed to be as **optionated** as possible and you can configure almost everything. With that in mind, some packages are still enabled by default, because they provide functionality that are often repeatedly used. Those we call _**"default features"**_. Most of them can be turned off via respective environment variables. A small number of excptions cannot be turned off at all due to current technical limitations.

[More info about the default features](/2-2-default-features)

## Optional features

Most of the available integrations are disabled by default and are meant to be opted-in by a respective configuration. Those we address as _**"optional features"**_. This general term also includes all other Nuxt Ignis specific configuration that is available.

[More info about the optional features](/2-3-optional-features)

## CLI tools

A number of CLI commands is available to help you moving on faster.

[More info about the CLI](/3-12-features-cli)

## More info

- Check [showcase](/1-3-showcase) of live projects using `nuxt-ignis`.
- Go to [installation](/1-4-installation) to learn how to start using Nuxt Ignis.
