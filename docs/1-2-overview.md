# Overview

## Key characteristics

- Nuxt Ignis is [`pnpm`](https://pnpm.io/) based project
- It uses [Nuxt](https://nuxt.com/) application framework built atop [Vue.js](https://vuejs.org/)
- It is available as standalone NPM package defining a _base layer_ to extend from

## Flexibility

With Nuxt Ignis you have guaranteed control over the final shape of your app via environment variables. Learn more in the [configuration](/2-1-configuration) section.

## Core features

Nuxt Ignis is designed to be as **optionated** as possible. You can control most of the behavior via `.env` provided to the build process. This allows to keep the `nuxt.config.ts` file static, while still being able to adjust the final build. Like that, the project should not bloat with tons of actually unused depeondencies.

With that in mind, some packages are still enabled by default, because they provide functionality that are often repeatedly used. Those we call _**"core features"**_. Most of them can be turned off via respective environment variables. A small number of excptions cannot be turned off at all due to current technical limitations.

[More info about the core features](/2-2-core-features)

## Optional features

Most of the available are disabled by default and are meant to be opted-in by a respective environment variable. Those we address as _**"optional features"**_. This general term also inclues all other Nuxt Ignis configuration that is available.

[More info about the optional features](/2-3-optional-features)

## More info

- Check [showcase](/1-3-showcase) of live projects using `nuxt-ignis`.
- Go to [installation](/1-4-installation) to learn how to start using Nuxt Ignis.
