<template>
  <div>
    <h1>Ignis Content demo</h1>
    <div>
      <ContentRenderer
        v-if="page"
        :value="page"
      />
    </div>
    <div>
      <NuxtLink
        to="/demo1"
        :external="true"
      >First</NuxtLink>
      &bull;
      <NuxtLink
        to="/demo2"
        :external="true"
      >Second</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO this only renders Markdown correctly during server build, on client, only plain text with no markup appears
// [Vue warn]: resolveComponent can only be used in render() or setup()
const { data: page } = await useAsyncData(useRoute().path, async () => queryCollection('demo').path(useRoute().path).first())
</script>
