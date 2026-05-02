<template>
  <div>
    <h1>Nuxt Ignis demo</h1>
    <h2>@nuxt/image</h2>
    <div v-if="image">
      NuxtImg demo image
    </div>
    <div v-else>
      Image module is not enabled
    </div>
  </div>
</template>

<script setup lang="ts">
// this page is checking whether the image module is enabled
// for 01-02-bare demo it should be DISABLED
const image = !!useRuntimeConfig().public.ignis.default?.image
</script>
