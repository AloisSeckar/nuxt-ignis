<template>
  <div class="ignis-config-wrapper">
    <h1 class="ignis-config-header">
      Configuration Overview
    </h1>
    <div class="ignis-config-subheader">
      {{ useIgnisT('config.header') }}
    </div>
    <pre class="ignis-config">{{ ignisConfig || error }};</pre>
  </div>
</template>

<script setup lang="ts">
const requestURL = useRequestURL()
const baseURL = `${requestURL.protocol}//${requestURL.host}`
const { data: ignisConfig, error } = await useFetch('/_ignis-config.json', {
  baseURL,
})
</script>

<style scoped lang="css">
.ignis-config-wrapper {
  margin: 0 auto;
  max-width: 800px;
}
.ignis-config-header {
  text-align: center;
  font-family: monospace;
  font-size: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: #fbbf24;
}

.ignis-config-subheader {
  text-align: center;
}

.ignis-config {
  border: 1px white;
  background-color: gray;
  color: white;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
  white-space: pre-wrap;
}
</style>
