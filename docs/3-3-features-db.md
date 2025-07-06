# DB features

Nuxt Ignis contains following customizable DB related features:

## Neon

<PackagesReference :packages="[{ name: 'nuxt-neon', version: '0.6.2' }]" />

[Neon](https://neon.tech/) is a serverless Postgres database that is designed to be fast, scalable, and easy to use. It provides a fully managed database service with automatic scaling and high availability.

The [`nuxt-neon`](https://github.com/AloisSeckar/nuxt-neon) module integrates `Neon` into your Nuxt application by providing `useNeon` composable that wraps around [Neon Serverless Driver](https://neon.com/docs/serverless/serverless-driver) and provides convenient methods for executing SQL queries towards given `Neon` instance.

`Neon` integration is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_NEON=true
```
Or [DB preset](/2-3-optional-features.html#db-preset):
```dotenv
NUXT_PUBLIC_IGNIS_PRESET_DB=neon
```

### Usage notice

To configure `Neon` connection you need to provide following env variables:
- `NUXT_NEON_HOST`
- `NUXT_NEON_USER`
- `NUXT_NEON_PASS`
- `NUXT_NEON_DB`

For details and more config options see the [`nuxt-neon` docs](https://github.com/AloisSeckar/nuxt-neon).

## Supabase

<PackagesReference :packages="[{ name: '@nuxtjs/supabase', version: '1.5.2' }]" />

[Supabase](https://supabase.com/) is an open-source Firebase alternative that provides a suite of tools for building applications, including a Postgres database, authentication, and real-time subscriptions.

The integration is provided via [`@nuxtjs/supabase` module](https://supabase.nuxtjs.org/).

`Supabase` integration is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_SUPABASE=true
```
Or [DB preset](/2-3-optional-features.html#db-preset):
```dotenv
NUXT_PUBLIC_IGNIS_PRESET_DB=supabase
```

### Usage notice

To configure `Supabase` connection you need to provide following env variables:
- `SUPABASE_URL`
- `SUPABASE_KEY`

For details and more config options see the [`@nuxtjs/supabase` docs](https://supabase.nuxtjs.org/getting-started/introduction).
