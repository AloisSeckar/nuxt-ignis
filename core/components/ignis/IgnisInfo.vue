<template>
  <div>
    <IgnisHeader />
    <AppFeatureList />

    <div v-if="pages" class="link">
      <NuxtLink to="/_ignis-two">
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

<style scoped lang="css">
.link {
  text-align: center;
  margin-bottom: 4px;
}
</style>
