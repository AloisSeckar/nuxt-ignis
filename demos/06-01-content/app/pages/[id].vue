<template>
  <div>
    <ContentRenderer
      v-if="page"
      :value="page" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, async () => {
  let page = await queryCollection('content').path(route.path).first()
  if (!page) {
    page = await queryCollection('demo').path(route.path).first()
  }
  return page
})
</script>
