<!--
  The `NuxtTime` component of `nuxt-time` module is a way how to deal with SSR in Nuxt.
  Because page on the server is rendered miliseconds before being re-rendered on client,
  wild "hydration error mismatch" may appear from a difference between displayed times.

  This special component gracefully deals with the issue:
  https://github.com/nuxt/nuxt/discussions/23278#discussioncomment-7607298
-->

<template>
  <div v-if="time" style="text-align: center;">
    Current time by <NuxtLink to="https://github.com/danielroe/nuxt-time">Nuxt Time</NuxtLink>:
    <NuxtTime
      v-if="time"
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
const time = useRuntimeConfig().public.ignis.core.vueuse
const vueuse = useRuntimeConfig().public.ignis.core.vueuse
const currentDate = vueuse ? useNow() : new Date().toISOString()
</script>
