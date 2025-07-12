<template>
  <div>
    <IgnisHeader />

    <component :is="ignisContent" />

    <CurrentTime />
    <IgnisFooter />
  </div>
</template>

<script setup lang="ts">
export type IgnisComponentType = 'Features' | 'Config'

const props = defineProps<{
  content: IgnisComponentType
}>()

let ignisContent
if (props.content === 'Config') {
  ignisContent = resolveComponent('IgnisConfig')
} else {
  ignisContent = resolveComponent('IgnisFeatureList')
}
</script>
