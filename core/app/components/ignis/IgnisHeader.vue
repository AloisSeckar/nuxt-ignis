<template>
  <header id="ignis-header">
    <div class="ignis-header">
      <img src="/nuxt-ignis.png" class="ignis-logo" :title :alt>
      <div class="ignis-title">
        {{ title }}
      </div>
      <img src="/nuxt-ignis.png" class="ignis-logo" :title :alt>
    </div>
    <div class="ignis-subtitle ">
      {{ subtitle }}
    </div>
  </header>
</template>

<script setup lang="ts">
import { useIgnisT } from '#imports' // requires explicit import for some reason

const title = useIgnisT('title')
const subtitle = useIgnisT('subtitle')
const alt = title
</script>

<style scoped>
.ignis-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.4em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.ignis-logo {
  display: inline;
  width: 64px;
  height: 64px;
}
/* my-4 text-4xl text-amber-400 font-bold */
.ignis-title {
  margin-top: 10px;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: bold;
  color: #fbbf24;
}
.ignis-subtitle {
  text-align: center;
  margin: 0px auto;
  margin-bottom: 8px;
}
</style>
