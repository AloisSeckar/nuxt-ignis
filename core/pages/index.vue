<!--
    https://nuxt.com/docs/guide/directory-structure/pages

    An example of Nuxt page.
    Nuxt automaticaly provides routing and displays this page when user visits root URL or `/index`.

    IgnisInfo
     - an example usage of auto-imported Nuxt component declared in `/components` directory
     - it is a wrapper around couple of possible components defined by "content" prop
     - this one contains a list of available features configured in current Nuxt Ignis setup
-->

<template>
  <IgnisInfo :content="'Welcome'" />
</template>
