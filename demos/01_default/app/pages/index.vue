<template>
  <div>
    <h1>Nuxt Ignis demo</h1>
    <ClientOnly>
      {{ staticTimestamp }}
    </ClientOnly>
    <h2>@nuxt/image</h2>
    <NuxtImg
      src="01.jpg"
      width="300"
      height="225"
    />
  </div>
</template>

<script setup lang="ts">
// internal util function based on `date-fns` format
// ClientOnly to avoid hydration issues
const staticTimestamp = ignisDate()
</script>
