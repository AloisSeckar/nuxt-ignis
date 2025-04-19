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
    class: 'bg-slate-900 m-auto text-center text-white',
  },
})
initConsola()

log.info('Nuxt Ignis was here!')

const pages = useRuntimeConfig().public.ignis.pages
</script>

<style scoped>
.ignis-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
}
.ignis-logo {
  display: inline;
  width: 64px;
  height: 64px;
}
.ignis-title {
  margin-top: 15px;
}
</style>
