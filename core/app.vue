<template>
  <UApp v-if="ui">
    <NuxtPage v-if="pages" />
    <IgnisInfo v-else />
  </UApp>
  <div v-else>
    <NuxtPage v-if="pages" />
    <IgnisInfo v-else />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: useAppConfig().textTitle,
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class: 'ignis-body',
  },
})
initConsola()

log.info('Nuxt Ignis was here!')

const config = useRuntimeConfig().public.ignis
const pages = config.pages
const ui = config.ui || config.preset.ui
</script>

<style scoped>
/* bg-slate-900 m-auto text-center text-white */
.ignis-body {
  margin: auto;
  background-color: #0f172a;
  color: white;
  text-align: center;
}
</style>
