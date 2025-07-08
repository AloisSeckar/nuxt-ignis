<template>
  <div>
    <IgnisHeader />

    <div style="margin: 0 auto; max-width: 800px;">
      <div style="text-align: center;">
        {{ useIgnisT('config.header') }}
      </div>
      <pre style="border: 1px white; background-color: gray; padding: 1rem; margin: 1rem 0; white-space: pre-wrap;">
{{ ignisConfig || error }}
      </pre>
    </div>

    <CurrentTime />
    <IgnisFooter />
  </div>
</template>

<script setup lang="ts">
const requestURL = useRequestURL()
const baseURL = `${requestURL.protocol}//${requestURL.host}`
const { data: ignisConfig, error } = await useFetch('/_ignis-config.json', {
  baseURL,
})
</script>
