<template>
  <div>
    <h1>Nuxt Ignis demo</h1>
    <ClientOnly>
      {{ timestamp }}
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// TEST if date-fns is available
import { format } from 'date-fns'

// ClientOnly to avoid hydration issues
const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')
</script>
