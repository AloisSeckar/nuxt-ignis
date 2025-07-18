<!--
  Built-in `NuxtTime` component is a way how to deal with SSR in Nuxt.
  Because page on the server is rendered miliseconds before being re-rendered on client,
  wild "hydration error mismatch" may appear from a difference between displayed times.

  https://nuxt.com/docs/api/components/nuxt-time
-->

<template>
  <div style="text-align: center; font-size: 0.8em;">
    Current time with <NuxtLink to="https://nuxt.com/docs/api/components/nuxt-time">NuxtTime</NuxtLink>:
    <NuxtTime
      :datetime="currentDate"
      year="numeric"
      month="2-digit"
      day="2-digit"
      hour="2-digit"
      minute="2-digit"
      second="2-digit" />
    <span v-if="!vueuse">
      (Enable VueUse to get reactive time)
    </span>
  </div>
</template>

<script setup lang="ts">
const vueuse = useRuntimeConfig().public.ignis.core.vueuse
const currentDate = vueuse ? useNow() : new Date().toISOString()
</script>
