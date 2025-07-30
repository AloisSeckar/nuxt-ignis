<template>
  <div>
    <IgnisHeader />

    <component :is="ignisContent" />

    <CurrentTime />
    <IgnisFooter />
  </div>
</template>

<script setup lang="ts">
export type IgnisComponentType = 'Welcome' | 'Features' | 'Config'

const props = defineProps<{
  content: IgnisComponentType
}>()

let ignisContent
if (props.content === 'Welcome') {
  ignisContent = resolveComponent('IgnisWelcome')
} else if (props.content === 'Config') {
  ignisContent = resolveComponent('IgnisConfig')
} else {
  ignisContent = resolveComponent('IgnisFeatureList')
}
</script>
