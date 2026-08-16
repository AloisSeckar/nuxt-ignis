<template>
  <div>
    <h1>Nuxt Ignis demo</h1>
    <h2>@pinia/nuxt</h2>
    <p>Count: {{ counterStore.count }}</p>
    <button @click="counterStore.increment()">
      Increment
    </button>
  </div>
</template>

<script setup lang="ts">
// this page is checking whether the Pinia module is working
const counterStore = useCounterStore()
</script>
