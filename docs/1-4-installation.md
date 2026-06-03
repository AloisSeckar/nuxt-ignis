# Installation

`nuxt-ignis` is available as an [NPM package](https://www.npmjs.com/package/nuxt-ignis) that can be referenced as a single dependency with all the features wrapped up.

[Node.js](https://nodejs.org/) version `v22.5.0` or higher is required. Latest LTS version is recommended.

## Adding to your project

To include `nuxt-ignis` in your Nuxt project, you can use the CLI tool to set everything up quickly:

::: code-group
```sh [pnpm]
pnpx nuxt-ignis setup
```

```sh [npm]
npx nuxt-ignis setup
```

```sh [yarn]
yarn dlx nuxt-ignis setup
```

```sh [bun]
$ bunx nuxt-ignis setup
```

```sh [deno]
$ deno run --allow-run npm:npx nuxt-ignis setup
```
:::

Details about the CLI setup command can be found in the [CLI section](/3-12-features-cli.html#setup).

### Setup steps

The CLI command will perform following steps. Each step is prompted unless you select to do everything without asking. 

You can also make the steps manually if you want to keep more control.

1) Add the required dependency into `package.json`:

```json [package.json]
{
  "dependencies": {
    "nuxt-ignis": "0.6.0-rc.5"
  }
}
```

2) Remove `nuxt`, `vue` and `vue-router` dependencies from `package.json`.

<details>
<summary>Reason why</summary>

Those dependencies are already included in `nuxt-ignis`. Removing is recommended to avoid version clashes and potential issues. If you need to rely on specific versions, you are advised to use [deduping](https://www.youtube.com/watch?v=TTlgfMPFYwM).
</details>

3) If `pnpm` is used, add `packageManager` entry into `package.json`:

```json [package.json]
{
  "packageManager": "pnpm@11.1.3"
}
```

<details>
<summary>Reason why</summary>

The `packageManager` tries to ensure same `pnpm` version is used as during the development of testing `nuxt-ignis`. However, extra setup (for Corepack) might be required. Check more in the [Node.js docs](https://nodejs.org/download/release/v22.11.0/docs/api/packages.html#packagemanager).
</details>

4) If you use `pnpm`, create or adjust `pnpm-workspace.yaml` file to contain following lines:

```yaml [pnpm-workspace.yaml]
shamefully-hoist: true

trustPolicy: no-downgrade

minimumReleaseAge: 4320

minimumReleaseAgeExclude:
  - nuxt-ignis
  # add more if needed
  # - package-name

allowBuilds:
  # post-install scripts required for correct behavior
  '@parcel/watcher': true
  '@tailwindcss/oxide': true
  esbuild: true
  sharp: true
  unrs-resolver: true
  vue-demi: true
  # post-install scripts that can be ignored
  maplibre-gl: false
  puppeteer: false
  # add more if needed
  # - package-name: boolean

```

<details>
<summary>Reason why</summary>

Having `pnpm-workspace.yaml` in your project root is the recommended way of keeping the configuration for `pnpm`. Technically, you can aslo use `pnpm` key inside `package.json`, but it is not an official config key and the support might be eventually dropped.

Setting `shamefully-hoist` is **required** to ensure `pnpm` will hoist all dependences from `nuxt-ignis` without you having to specify them in your own `package.json`. It is also recommened practice for Nuxt apps managed by `pnpm` in general. Check more in the [pnpm docs](https://pnpm.io/npmrc#shamefully-hoist).

Without `allowBuilds` entries set to `true`, `pnpm` will block any scripts that are being executed during the installation of these packages. This may lead to errors and inconsistencies. You will be still prompted to allow them manually using `pnpm approve-builds`. This is the way to ease things up. Check more in the [pnpm docs](https://pnpm.io/cli/approve-builds).
</details>

5) Add following section into your `nuxt.config.ts` to extend the `nuxt-ignis` layer:

```ts [nuxt.config.ts]
{
  "extends": [
    "nuxt-ignis"
  ]
}
```

<details>
<summary>Reason why</summary>

Nuxt Ignis is being shipped as a Nuxt layer and this sets your project to **extend** from this layer.
</details>

Optionally, remove existing `compatibilityDate` from your `nuxt.config.ts`.

<details>
<summary>Reason why</summary>

Nuxt Ignis defines its own `compatibilityDate`. Unless you maintain specific date for your project, there is no need to duplicate it (your value will always take precedence though).
</details>


6) Create or adjust `.gitignore` file to exclude Nuxt Ignis-related auxiliary files:

```[.gitignore]
_ignis-config.json
_nuxt-config.json
```

<details>
<summary>Reason why</summary>

Nuxt Ignis always creates `public/_ignis-config.json` and `public/_nuxt-config.json` files when done with resolving `nuxt.config.ts` to expose the actual configuration used for reference and potential debugging. As those files are re-generated automatically everytime the app starts, it is not recommended to add it to Git. They _could_ be stored for reference but this might tempt devs to edit it manually which would have no effect and should cause unnecessary confusion. Since the files are JSONs, comments can't be included to add auto-generation warning.
</details>

7) Optionally replace default `app/app.vue` in fresh project (the file contains `<NuxtWelcome />` component) with the [Nuxt Ignis default](https://github.com/AloisSeckar/nuxt-ignis/blob/v0.6.0-rc.5/core/app/app.vue).

<details>
<summary>Reason why</summary>

Projects scaffolded using `pnpm create nuxt@latest` include a default `/app/app.vue` that only displays the Nuxt welcome page and does **not** contain the `<NuxtPage />` component. This clashes with default `nuxt-ignis` behavior that starts with the assumption that pages are used (unless [explicitly turned off](/3-10-features-nuxt.html#pages)) and results into runtime warning. Plus the [built-in pages](/3-11-features-built-ins.html) won't be accessible without manual changes.

Nuxt Ignis' [default `app.vue`](/3-11-features-built-ins.html#default-app-vue) integrates gracefully with other Nuxt Ignis config and allows to you start implementing your pages right away. 
</details>

8) Optionally set things up for built-in testing provided by [`nuxt-spec`](/3-9-features-devex.html#testing) package. The dependencies are included in `nuxt-ignis` itself, so you just need to create `vitest.config.ts` with following content:

```ts [vitest.config.ts]
import { loadVitestConfig } from 'nuxt-spec/config'

export default loadVitestConfig({
  // custom config here
})
```

<details>
<summary>Reason why</summary>

Technically, this step is not required. Your tests will run even with absolutely zero config with `vitest` defaults. However, written like this, you can mix your override with the additional default setup provided by the test tool. Check more details in [`nuxt-spec` docs](https://github.com/AloisSeckar/nuxt-spec/blob/v0.2.3/README.md#configuration).
</details>

It is also advised to create a `.nuxtrc` file in your project root (if not present yet) with the following content:

```[.nuxtrc]
setups.@nuxt/test-utils="4.0.2"
```

<details>
<summary>Reason why</summary>

Without this file, `@nuxt/test-utils` automatically runs its interactive setup the first time the dev server starts. This process is rather intrusive, cannot be skipped and will create the `.nuxtrc` file anyway (along with other changes).
</details>

You may want to add following test-related scripts to `package.json` for simpler execution:

```json [package.json]
{
  "scripts": {
    "test": "vitest run",
    "test-u": "vitest run -u",
    "test-i": "vitest"
  }
}
```

<details>
<summary>Reason why</summary>

This might be just a matter of personal preference, but someone might find the shorthands useful. Check more detailed explanation for each variant in [`nuxt-spec` docs](https://github.com/AloisSeckar/nuxt-spec/blob/v0.2.3/README.md#running-tests).
</details>

The automatic CLI setup is also capable of creating sample test files based on experience from the `nuxt-spec` package. If you chose to skip this step, you can [check the project](https://github.com/AloisSeckar/nuxt-spec/tree/main/test) to get the idea for manual creation.

9) Delete `node_modules` folder and your lock file (based on the package manager you're using).

<details>
<summary>Reason why</summary>

Hands-on experience shows things may end up acting weirdly if new packages from `nuxt-ignis` are just added into existing `node_modules`. Deleting current set of modules and the lock file ensures all dependencies are freshly resolved and correctly wired up. In most scenarios this is a simple and convenient way to avoid potential issues.

In rare cases, when you need to keep your dependencies intact due to specific overrides, [deduping](https://www.youtube.com/watch?v=TTlgfMPFYwM) might help to mitigate some of the more common problems related to package resolution.
</details>

10) Run fresh `install` command.

<details>
<summary>Reason why</summary>

After clearing `node_modules` and the lock file, a fresh `install` is obviously required to resolve and download all dependencies correctly.
</details>

### Customization

To tailor Nuxt Ignis to fit your project needs, pass optional `ignis` config object into `nuxt.config.ts` or setup your `.env` file accordingly. Check [the reference](/2-5-full-reference.html) for all available configuration options.

### Running the app

**Congratulations!** You are now armed ready to build your next awesome project in Nuxt!

Start your dev server with `pnpm dev` (or `nuxt dev` if you don't have the script alias set up) and start benefiting from all the features provided by `nuxt-ignis`.

#### Notice for projects scaffolded from Nuxt template

Projects scaffolded using `pnpm create nuxt@latest` include a default `/app/app.vue` that does **not** contain the `<NuxtPage />` component. The `setup` CLI command automatically detects and replaces this file with the Nuxt Ignis' default during [step 7](#setup-steps).

If you performed the setup manually, or chose not to replace the default file during setup, you may still encounter the following issues:

1) You will get `Your project has pages but the <NuxtPage /> component has not been used.` warning upon starting the dev server
2) You will not be able to navigate to [built-in pages](/3-11-features-built-ins.html) as there is nowhere to display them

Ways to fix this:

1) Add `<NuxtPage />` into your existing `/app/app.vue` file manually
2) Use the CLI tool to [scaffold Nuxt Ignis default `/app/app.vue`](/3-12-features-cli.html#set-app-vue) into your project any time
3) Set `NUXT_PUBLIC_IGNIS_CONFIG_NUXT_PAGES=false` in your `.env` file or `ignis: { config: { nuxt: { pages: false } } }` in `nuxt.config.ts` to declare your project is not using pages (you will lose access to built-in pages)

## More info

- Proceed to the [Configuration](/2-1-configuration.html) section to get the big picture and learn how to set `nuxt-ignis` up for your project.
