<template>
  <header>
    <div class="ignis-header">
      <img src="/nuxt-ignis.png" class="ignis-logo" :title :alt>
      <h1 class="my-4 text-4xl text-amber-400 font-bold">
        {{ useIgnisT("title") }}
      </h1>
      <img src="/nuxt-ignis.png" class="ignis-logo" :title :alt>
    </div>
    <div class="mb-2">
      {{ useIgnisT("subtitle") }}
    </div>
  </header>
</template>

<script setup lang="ts">
import { useIgnisT } from '#imports' // requires explicit import for some reason

const title = useIgnisT('title')
const alt = title
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
