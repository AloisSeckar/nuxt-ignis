<template>
  <div>
    <h1>Nuxt Ignis demo</h1>
    <ClientOnly>
      {{ staticTimestamp }}
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// internal util function based on `date-fns` format
// ClientOnly to avoid hydration issues
const staticTimestamp = ignisDate()
</script>
