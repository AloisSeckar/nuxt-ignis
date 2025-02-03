<template>
  <div class="p-3">
    <div class="ignis-header">
      <img src="/nuxt-ignis.png" class="ignis-logo" :title :alt>
      <h1 class="my-4 text-4xl text-amber-400 font-bold">
        {{ useT("title") }}
      </h1>
      <img src="/nuxt-ignis.png" class="ignis-logo" :title :alt>
    </div>
    <div>{{ useT("subtitle") }}</div>
    <NuxtPage v-if="pages" />
    <AppFeatureList v-else />
    <CurrentTime />
    <div class="link text-xs">
      <NuxtLink to="https://github.com/AloisSeckar/nuxt-ignis">
        https://github.com/AloisSeckar/nuxt-ignis
      </NuxtLink>
    </div>
  </div>
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

const title = useT('title')
const alt = title

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
