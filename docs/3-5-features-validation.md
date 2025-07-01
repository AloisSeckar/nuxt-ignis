# Validation features
Nuxt Ignis offers two alternatives for schema validation:

## Zod integration
- Packages: `zod`
- Version: `3.25.67`

[Zod](https://zod.dev/) is a TypeScript-first schema declaration and validation library that allows you to define schemas for your data and validate them at runtime. It provides a simple and intuitive API for defining schemas and validating data against them.

`Zod` integration is **disabled** by default. To enable it, you can use following environment variable:

```env
NUXT_PUBLIC_IGNIS_ZOD=true
```
Or [Validation preset](/2-3-optional-features.html#validation-preset):
```env
NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=zod
```

### Zod usage notice

In order to  use `zod` in Nuxt Ignis conditionally, we wrapped its import into a composable. In order to use it, you need to import it in a file like this:

```ts [your-zod-validator.ts]
const z = (await useZod())!
```

You can then use `z` object as you would normally do in your project.

**NOTE:** We are using `await` here, because the import is dynamic at runtime. And because the composable may technically return `undefined` (only if the relevant setting is not enabled), we add exclamation mark to avoid TS complaints.

## Valibot integration
- Packages: `valibot`
- Version: `1.1.0`

[Valibot](https://valibot.dev/) is a TypeScript-first schema validation library that allows you to define schemas for your data and validate them at runtime. It provides a simple and intuitive API for defining schemas and validating data against them.

`Valibot` integration is **disabled** by default. To enable it, you can use following environment variable:

```env
NUXT_PUBLIC_IGNIS_VALIBOT=true
```
Or [Validation preset](/2-3-optional-features.html#validation-preset):
```env
NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=valibot
```

### Valibot usage notice

In order to  use `valibot` in Nuxt Ignis conditionally, we wrapped its import into a composable. In order to use it, you need to import it in a file like this:

```ts [your-valibot-validator.ts]
const v = (await useValibot())!
```

You can then use `v` object as you would normally do in your project.

**NOTE:** We are using `await` here, because the import is dynamic at runtime. And because the composable may technically return `undefined` (only if the relevant setting is not enabled), we add exclamation mark to avoid TS complaints.
