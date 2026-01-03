<template>
  <h2>STATUS EXAMPLE</h2>
  <div>
    <pre>{{ dbStatus }}</pre>
  </div>
</template>

<script setup lang="ts">
// @ts-expect-error - #imports are available here
import { useNeonClient } from '#imports'

const { neonStatus } = useNeonClient()
const dbStatus = await neonStatus()
</script>
