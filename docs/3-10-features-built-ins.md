# Built-ins

Nuxt Ignis contains couple of built-in pages and components, that will become a part of your applications.

## Welcome page

There is a default content for the `/` or `/index` page featuring a simple welcome component with basic info and links. If your project is using pages (default), the component is served from `/pages/index.vue` within a `<NuxtPage />` boundary. If pages are disabled [via env variable](/3-9-features-nuxt.html#pages), the component is served directly from `/app.vue` instead.

If you provide your own `/pages/index.vue` or `/app.vue`, the defaults will be overriden.

## Features overview

This page, available at `/_ignis-info` and linked from the Welcome component, provides a list of all Nuxt Ignis features and their status based on the current configuration. Active features are marked green, inactive are gray. 

The page route starts with an underscore to avoid clashes with your own routes.

## Configuration overview

This page, available at `/_ignis-config` and linked from the Welcome component, shows complete `nuxt.config.ts` object, as it was constructed during [features resolution](/2-1-configuration.html#the-big-picture). This might be useful for debugging purposes. For example, it would be much appreciated if you attach the output to any future issues and bugreports.

The page route starts with an underscore to avoid clashes with your own routes.
