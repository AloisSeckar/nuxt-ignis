<!--
    https://nuxt.com/docs/guide/directory-structure/pages

    An example of Nuxt page.
    Nuxt automaticaly provides routing and displays this page when user visits root URL or `/index`.

    AppFeatureList
     - an example usage of auto-imported Nuxt component declared in `/components` directory
     - this contains a list of available features configured in current Nuxt Ignis setup

    NuxtLink
     - special component for improved handling for HTML links (<a> tags)
-->

<template>
  <div>
    <AppFeatureList />
    <div class="link">
      <NuxtLink to="/second">
        {{ useT("goto2") }}
      </NuxtLink>
    </div>
  </div>
</template>
