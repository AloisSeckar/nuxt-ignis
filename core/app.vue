<template>
  <UApp>
    <NuxtPage v-if="pages" />
    <IgnisInfo v-else />
  </UApp>
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

const pages = useRuntimeConfig().public.ignis.pages
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
