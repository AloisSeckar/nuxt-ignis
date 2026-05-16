<template>
  <div>
    <h1>Nuxt Ignis demo</h1>
    <h2>@nuxt/image</h2>
    <div v-if="image">
      <NuxtImg
        src="01.jpg"
        alt="NuxtImg demo image"
        width="300"
        height="225" />
    </div>
    <div v-else>
      Image module is not enabled
    </div>
  </div>
</template>

<script setup lang="ts">
// this page is checking whether the image module is enabled
// for 01-01-default demo it should be enabled (by default)
const image = !!useRuntimeConfig().public.ignis.default?.image
</script>
