<template>
  <div>
    <IgnisHeader />

    <div style="margin: 0 auto; max-width: 800px;">
      <div style="text-align: center;">
        {{ useIgnisT('config.header') }}
      </div>
      <pre style="border: 1px white; background-color: gray; padding: 1rem; margin: 1rem 0;">
{{ ignisConfig }}
      </pre>
    </div>

    <CurrentTime />
    <IgnisFooter />
  </div>
</template>

<script setup lang="ts">
const { data: ignisConfig } = await useFetch('/_ignis-config.json')
</script>
