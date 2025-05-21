# Getting started

`nuxt-ignis` is available as [NPM package](https://www.npmjs.com/package/nuxt-ignis) that can be referenced as a single dependency with all the features incoming.

## Installation

1) Add the following dependency into your `package.json`:
```
"nuxt-ignis": "0.3.1"
```

2) Add following section into your `nuxt.config.ts`:
```
extends: [
  'nuxt-ignis'
]
```

3) Add `.npmrc` file with following content (if you don't have it yet):
```
shamefully-hoist=true
strict-peer-dependencies=false
```

4) Setup your `.env` to fit your project needs. Check [Configuration](/2-2-configuration.html) section for reference.

You are ready to build your next awesome project in Nuxt!
