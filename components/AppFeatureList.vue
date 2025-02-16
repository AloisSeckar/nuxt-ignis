<!--
    https://nuxt.com/docs/guide/directory-structure/pages

    An example of Nuxt component.

    AppFeature
     - an example usage of auto-imported Nuxt component declared in `/components` directory
     - the text is (usually) being loaded localized via nuxtjs/i18n module
     - features are being displayed conditionally according to current setting
-->

<template>
  <div class="m-auto my-4 w-3/5 flex flex-col">
    <AppFeature :text="useT('features.nuxt')" />
    <AppFeature :text="useT('features.security')" />
    <AppFeature :text="useT('features.image')" />
    <AppFeature :text="useT('features.scripts')" />
    <AppFeature :text="useT('features.fonts')" class="fonts" />
    <AppFeature :text="useT('features.pinia')" />
    <AppFeature :text="useT('features.vueuse')" />
    <AppFeature :text="useT('features.consola')" />
    <AppFeature v-if="nuxtui" :text="useT('features.ui')" />
    <AppFeature v-if="tailwind" :text="useT('features.tailwind')" />
    <AppFeature v-if="nuxtui" :text="useT('features.icon')" />
    <AppFeature v-if="neon" :text="useT('features.neon')" />
    <AppFeature v-if="supabase" :text="useT('features.supabase')" />
    <AppFeature v-if="i18n" :text="useT('features.i18n')" />
    <AppFeature v-if="formkit" :text="useT('features.formkit')" />
    <AppFeature v-if="content" :text="useT('features.content')" />
    <AppFeature v-if="openprops" class="openprops-feature" :text="useT('features.openprops')" />
  </div>
  <div v-if="!pages" class="mb-2">
    Single-page mode (/pages disabled)
  </div>
</template>

<script setup lang="ts">
import { useT } from '#imports' // requires explicit import for some reason

const setup = useRuntimeConfig().public.ignis
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
