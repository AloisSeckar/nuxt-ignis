<template>
  <div style="margin: 0 auto; max-width: 800px;">
    <h1 style="text-align: center;">
      Configuration Overview
    </h1>
    <div style="text-align: center;">
      {{ useIgnisT('config.header') }}
    </div>
    <pre>
{{ ignisConfig || error }}
      </pre>
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
h1 {
  font-size: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: #fbbf24;
}

pre {
  border: 1px white;
  background-color: gray;
  padding: 1rem;
  margin: 1rem 0;
  white-space: pre-wrap;
}
</style>
