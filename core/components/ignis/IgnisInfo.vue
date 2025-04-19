<template>
  <div class="p-3!">
    <IgnisHeader />
    <AppFeatureList />

    <div v-if="pages" class="link">
      <NuxtLink to="/second">
        {{ useIgnisT("goto2") }}
      </NuxtLink>
    </div>

    <CurrentTime />
    <IgnisFooter />
  </div>
</template>

<script setup lang="ts">
const pages = useRuntimeConfig().public.ignis.pages
</script>
