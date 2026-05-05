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

The CLI command will perform following steps. You can also do them manually if you want to keep more control.

1) Add the required dependency into `package.json`:

```json [package.json]
{
  "dependencies": {
    "nuxt-ignis": "0.5.3"
  }
}
```

2) Remove `nuxt`, `vue` and `vue-router` dependencies from `package.json`.

<details>
<summary>Reason why</summary>

Those dependencies are already included in `nuxt-ignis`. Removing is recommended to avoid version clashes and potential issues. If you need to rely on specific versions, you are advised to use [deduping](https://www.youtube.com/watch?v=TTlgfMPFYwM).
</details>

3) If `pnpm` is used (will be detected from the command used), set of `onlyBuiltDependencies` and `packageManager` entries will be added into `package.json`:

```json [package.json]
{
  "pnpm": {
    "onlyBuiltDependencies": [
      "@parcel/watcher",
      "@tailwindcss/oxide",
      "esbuild",
      "maplibre-gl",
      "puppeteer",
      "sharp",
      "unrs-resolver",
      "vue-demi"
    ]
  },
  "packageManager": "pnpm@10.33.0"
}
```

<details>
<summary>Reason why</summary>

Without `onlyBuiltDependencies`, `pnpm` will block any scripts that are being executed during the installation of these packages. This may lead to errors and inconsistencies. You will be still prompted to allow them manually using `pnpm approve-builds`. This is the way to ease things up. Check more in the [pnpm docs](https://pnpm.io/cli/approve-builds).

The `packageManager` tries to ensure same `pnpm` version is used as during the development of testing `nuxt-ignis`. However, extra setup might be required. Check more in the [Node.js docs](https://nodejs.org/download/release/v22.11.0/docs/api/packages.html#packagemanager).
</details>

4) Add following section into your `nuxt.config.ts` to extend the `nuxt-ignis` layer:

```ts [nuxt.config.ts]
{
  "extends": [
    "nuxt-ignis"
  ]
}
```

5) If you use `pnpm`, create or adjust `pnpm-workspace.yaml` file to contain following line:

```yaml [pnpm-workspace.yaml]
shamefully-hoist: true
```

<details>
<summary>Reason why</summary>

This is required to ensure `pnpm` will hoist all dependences from `nuxt-ignis` without you having to specify them in your own `package.json`. It is also recommened practice for Nuxt apps managed by `pnpm` in general. Check more in the [pnpm docs](https://pnpm.io/npmrc#shamefully-hoist).
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

7) Optionally set things up for built-in testing provided by [`nuxt-spec`](/3-9-features-devex.html#testing) package. The dependencies are included in `nuxt-ignis` itself, so you just need to create `vitest.config.ts` with following content:

```ts [vitest.config.ts]
import { loadVitestConfig } from 'nuxt-spec/config'

export default loadVitestConfig({
  // custom config here
})
```

<details>
<summary>Reason why</summary>

Technically, this step is not required. Your tests will run even with absolutely zero config with `vitest` defaults. However, written like this, you can mix your override with the additional default setup provided by the test tool. Check more details in [`nuxt-spec` docs](https://github.com/AloisSeckar/nuxt-spec/blob/v0.2.2/README.md#configuration).
</details>

It is also possible to add following test-related scripts to `package.json` for simplier execution:

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

This might be just a matter of personal preference, but someone might find the shorthands useful. Check more detailed explanation for each variant in [`nuxt-spec` docs](https://github.com/AloisSeckar/nuxt-spec//blob/v0.2.2/README.md#running-tests).
</details>

8) Delete `node_modules` folder and your lock file (based on the package manager you're using).

<details>
<summary>Reason why</summary>

Hands-on eachxperience shows things may end up acting weirdly if new packages from `nuxt-ignis` are just added into existing `node_modules`. Deleting current set of modules and the lock file ensures all dependencies are freshly resolved and correctly wired up. In most scenarios this is a simple and convenient way to avoid potential issues.

In rare cases, when you need to keep your dependencies intact due to specific overrides, [deduping](https://www.youtube.com/watch?v=TTlgfMPFYwM) might help to mitigate some of the more common problems related to package resolution.
</details>

### Customization

To tailor Nuxt Ignis to fit your project needs, setup your `.env` file accordingly. Check [the reference](/2-5-full-reference.html) for all available config options.

### Running the app

**Congratulations!** You are now armed ready to build your next awesome project in Nuxt!

Start your dev server with `pnpm dev` (or `nuxt dev` if you don't have the script alias set up) and start benefiting from all the features provided by `nuxt-ignis`.

#### Notice for projects scaffolded from Nuxt template

Please note, that project scaffolded using `pnpm create nuxt@latest` will have default `/app/app.vue` that doesn't contain `<NuxtPage />` component. Applying `nuxt-ignis` setup as described above will have following consequences:

1) You will get `Your project has pages but the <NuxtPage /> component has not been used.` warning upon starting the dev server
2) You will not be able to navigate to [built-in pages](/3-11-features-built-ins.html) as there is nowhere to display them

Ways to fix this:

1) Add `<NuxtPage />` into your existing `/app/app.vue` file manually
2) Use CLI tool to [scaffold Nuxt Ignis default `/app/app.vue`](/3-12-features-cli#set-app-vue) into your project
3) Set `NUXT_PUBLIC_IGNIS_CONFIG_NUXT_PAGES=false` in your `.env` file (or `ignis: { config: { nuxt: { pages: false } } }` in `nuxt.config.ts`) to declare your project is not using pages (you will lose access to built-in pages)

We are currently [investigating ways](https://github.com/AloisSeckar/nuxt-ignis/issues/133) to improve this experience in future releases.

## More info

- Proceed to the [Configuration](/2-1-configuration.html) section to get the big picture and learn how to set `nuxt-ignis` up for your project.
