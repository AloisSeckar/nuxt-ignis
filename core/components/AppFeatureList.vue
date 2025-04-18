<!--
    https://nuxt.com/docs/guide/directory-structure/pages

    An example of Nuxt component.

    AppFeature
     - an example usage of auto-imported Nuxt component declared in `/components` directory
     - the text is (usually) being loaded localized via nuxtjs/i18n module
     - features are being displayed conditionally according to current setting
-->

<template>
  <div class="flex flex-row justify-center">
    <div class="margin-auto my-4 w-3/5 flex flex-col">
      <AppFeature :text="useIgnisT('features.nuxt')" />
      <AppFeature :text="useIgnisT('features.consola')" />
      <AppFeature :active="eslint" :text="useIgnisT('features.eslint')" />
      <AppFeature :active="security" :text="useIgnisT('features.security')" />
      <AppFeature :active="image" :text="useIgnisT('features.image')" />
      <AppFeature :active="scripts" :text="useIgnisT('features.scripts')" />
      <AppFeature :active="fonts" :text="useIgnisT('features.fonts')" class="fonts" />
      <AppFeature :active="pinia" :text="useIgnisT('features.pinia')" />
      <AppFeature :active="vueuse" :text="useIgnisT('features.vueuse')" />
      <AppFeature :active="time" :text="useIgnisT('features.time')" />
      <AppFeature :active="nuxtui" :text="useIgnisT('features.ui')" />
      <AppFeature :active="tailwind" :text="useIgnisT('features.tailwind')" />
      <AppFeature :active="nuxtui" :text="useIgnisT('features.icon')" />
      <AppFeature :active="neon" :text="useIgnisT('features.neon')" />
      <AppFeature :active="supabase" :text="useIgnisT('features.supabase')" />
      <AppFeature :active="i18n" :text="useIgnisT('features.i18n')" />
      <AppFeature :active="formkit" :text="useIgnisT('features.formkit')" />
      <AppFeature :active="content" :text="useIgnisT('features.content')" />
      <AppFeature :active="openprops" class="openprops-feature" :text="useIgnisT('features.openprops')" />
    </div>
    <div v-if="!pages" class="mb-2">
      Single-page mode (/pages disabled)
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIgnisT } from '#imports' // requires explicit import for some reason

const setup = useRuntimeConfig().public.ignis
const eslint = setup.core.eslint
const fonts = setup.core.fonts
const image = setup.core.image
const pinia = setup.core.pinia
const time = setup.core.time
const scripts = setup.core.scripts
const security = setup.core.security
const vueuse = setup.core.vueuse
const ui = setup.preset.ui
const db = setup.preset.db
const nuxtui = ui === 'nuxt-ui' || setup.ui
const tailwind = ui !== 'off' || setup.ui || setup.tailwind
const neon = db === 'neon' || setup.neon
const supabase = db === 'supabase' || setup.supabase
const i18n = setup.i18n.enabled
const formkit = setup.formkit.enabled
const content = setup.content
const openprops = setup.openprops
const pages = setup.pages
</script>

<style scoped>
/* demo for @nuxt/fonts */
.fonts {
  font-family: "Kurale";
}
</style>
