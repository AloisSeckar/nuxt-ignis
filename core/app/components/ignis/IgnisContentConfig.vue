<template>
  <div id="ignis-config" class="ignis-config-wrapper">
    <h1 class="ignis-config-header">
      Configuration Overview
    </h1>
    <div class="ignis-config-subheader">
      {{ headerIgnis }}
    </div>
    <pre class="ignis-config">{{ ignisConfig || ignisConfigError }};</pre>
    <details class="nuxt-config">
      <summary>{{ headerNuxt }}</summary>
      <pre class="ignis-config">{{ nuxtConfig || nuxtConfigError }};</pre>
    </details>
  </div>
</template>

<script setup lang="ts">
const requestURL = useRequestURL()
const baseURL = `${requestURL.protocol}//${requestURL.host}`

const headerIgnis = useIgnisT('config.ignis')
const { data: ignisConfig, error: ignisConfigError } = await useFetch('/_ignis-config.json', {
  baseURL,
})

const headerNuxt = useIgnisT('config.nuxt')
const { data: nuxtConfig, error: nuxtConfigError } = await useFetch('/_nuxt-config.json', {
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

.nuxt-config {
  margin: 1rem 0 2rem;
  border-top: 2px solid black;
  padding-top: 0.5rem;
}
</style>
