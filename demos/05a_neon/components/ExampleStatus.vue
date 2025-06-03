<template>
  <h2>STATUS EXAMPLE</h2>
  <div>
    <pre>{{ dbStatus }}</pre>
  </div>
</template>

<script setup lang="ts">
const { neonStatus } = useNeon()
const dbStatus = await neonStatus(false)
</script>
