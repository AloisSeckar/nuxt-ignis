# AGENTS.md - Nuxt Ignis

## Project summary

**Nuxt Ignis** is an _optionated_ base layer for [Nuxt](https://nuxt.com/) web applications, distributed as the [`nuxt-ignis`](https://www.npmjs.com/package/nuxt-ignis) NPM package. It bundles a curated stack of modules and features behind a single dependency, while letting end users decide via `.env` and/or `nuxt.config.ts` what actually ends up in the final build.

- Website: https://nuxt-ignis.com/
- Docs source: [docs/](docs/)
- Package source: [core/](core/)
- Modules source: [modules/](modules/)
- Demo apps: [demos/](demos/)

## Key features

- **Single-dependency Nuxt layer** - one package replaces a long list of common Nuxt dependencies.
- **Optionated, not opinionated** - features are toggled via environment variables (`NUXT_PUBLIC_IGNIS_*`) so `nuxt.config.ts` can stay static while builds stay flexible.
- **Default features** - sensible defaults always on (with most being switchable off): ESLint, logging via `consola`, `date-fns`, `defu`, `nuxt-spec`, etc.
- **Optional feature modules** - domain-driven submodules under `@nuxt-ignis/*`:
  - `@nuxt-ignis/default` - core defaults
  - `@nuxt-ignis/ui` - UI: Nuxt UI, Tailwind, Open Props, charts
  - `@nuxt-ignis/db` - DB: Neon, Supabase
  - `@nuxt-ignis/forms` - Forms: Vueform or FormKit
  - `@nuxt-ignis/validation` - Validation: Valibot or Zod
  - `@nuxt-ignis/content` - Nuxt Content, I18N
  - `@nuxt-ignis/utils` - utility helpers (e.g. equipment, regexp)
- **Presets** - shorthand selectors (e.g. `forms: 'vueform' | 'formkit' | 'off'`) that translate into module configs via `resolveXxxPreset()` helpers.
- **CLI tools** - `npx nuxt-ignis setup` and related commands (see [core/bin/](core/bin/)) for project bootstrap, ESLint/CSS/Netlify/app.vue setup.

## Repository layout

- [core/](core/) - sources for the published `nuxt-ignis` package (Nuxt layer, modules, CLI, tests).
  - `core/modules/01-config.ts` - config module (HTML, Nuxt, logging, runtime config injection).
  - `core/modules/02-features.ts` - orchestrator that conditionally loads `@nuxt-ignis/*` submodules.
  - `core/modules/utils/` - `activation.ts`, `presets.ts`, `duplicates.ts`, `env.ts`.
  - `core/app/` - default `app.vue`, components, composables, pages, plugins, utils.
  - `core/test/` - `unit/` and `e2e/` Vitest suites.
- [modules/](modules/) - sources for individual `@nuxt-ignis/*` submodules (`01-default` ... `07-utils`) plus shared publish/test scripts.
- [demos/](demos/) - feature-specific demo apps used as integration showcases.
- [docs/](docs/) - documentation site source (Markdown chapters + Nuxt site).

## Tooling

- Package manager: **pnpm** (workspace, see [pnpm-workspace.yaml](pnpm-workspace.yaml)).
- Node: `^20.19.0 || >=22.12.0`.
- Lint: ESLint via `@nuxt/eslint` - `pnpm eslint`.
- Tests: Vitest - `pnpm test`, `pnpm test-unit`, `pnpm test-e2e`.
- Build: `pnpm build` (runs docs + core build with tests).

## Conventions for agents

- Prefer editing existing files; do not introduce new abstractions or features beyond the request.
- Respect the **WHAT/WHY** comment style already present in the codebase.
- Env variables follow the `NUXT_PUBLIC_IGNIS_<MODULE>_<KEY>` pattern and override `nuxt.config.ts` values.
- Configs are merged with `defu()`; runtime gating is done via `useRuntimeConfig().public.ignis.*`.
- When touching forms/validation/UI/db/content, check both `core/` (layer-level wiring) and `modules/<feature>/` (module implementation).
- Do not try to verify solution by running tests or starting dev server. Do not build or deploy new versions of core package and/or modules. Only perform code changes and do a summary of them.
