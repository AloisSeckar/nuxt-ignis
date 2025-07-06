<!--
    https://nuxt.com/docs/guide/directory-structure/pages

    An example of Nuxt component.

    AppFeature
     - an example usage of auto-imported Nuxt component declared in `/components` directory
     - the text is (usually) being loaded localized via nuxtjs/i18n module
     - features are being displayed conditionally according to current setting
-->

<template>
  <div class="feature-box">
    <div class="feature-list">
      <AppFeature :text="useIgnisT('features.nuxt')" />
      <AppFeature :text="useIgnisT('features.consola')" />
      <AppFeature :active="eslint" :text="useIgnisT('features.eslint')" />
      <AppFeature :active="security" :text="useIgnisT('features.security')" />
      <AppFeature :active="image" :text="useIgnisT('features.image')" />
      <AppFeature :active="scripts" :text="useIgnisT('features.scripts')" />
      <AppFeature :active="fonts" :text="useIgnisT('features.fonts')" class="fonts" />
      <AppFeature :active="pinia" :text="useIgnisT('features.pinia')" />
      <AppFeature :active="vueuse" :text="useIgnisT('features.vueuse')" />
      <AppFeature :active="true" :text="useIgnisT('features.time')" />
      <AppFeature :active="nuxtui" :text="useIgnisT('features.ui')" />
      <AppFeature :active="tailwind" :text="useIgnisT('features.tailwind')" />
      <AppFeature :active="nuxtui" :text="useIgnisT('features.icon')" />
      <AppFeature :active="neon" :text="useIgnisT('features.neon')" />
      <AppFeature :active="supabase" :text="useIgnisT('features.supabase')" />
      <AppFeature :active="i18n" :text="useIgnisT('features.i18n')" />
      <AppFeature :active="vueform" :text="useIgnisT('features.vueform')" />
      <AppFeature :active="formkit" :text="useIgnisT('features.formkit')" />
      <AppFeature :active="valibot" :text="useIgnisT('features.valibot')" />
      <AppFeature :active="zod" :text="useIgnisT('features.zod')" />
      <AppFeature :active="content" :text="useIgnisT('features.content')" />
      <AppFeature :active="seo" :text="useIgnisT('features.seo')" />
      <AppFeature :active="auth" :text="useIgnisT('features.auth')" />
      <AppFeature :active="equipment" :text="useIgnisT('features.equipment')" />
      <AppFeature :active="regexp" :text="useIgnisT('features.regexp')" />
      <AppFeature :active="charts" :text="useIgnisT('features.charts')" />
      <AppFeature :active="openprops" class="openprops-feature" :text="useIgnisT('features.openprops')" />
    </div>
    <div v-if="!pages" class="pages">
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
const scripts = setup.core.scripts
const security = setup.core.security
const vueuse = setup.core.vueuse
const ui = setup.preset.ui
const nuxtui = ui === 'nuxt-ui' || setup.ui
const tailwind = ui !== 'off' || setup.ui || setup.tailwind
const db = setup.preset.db
const neon = db === 'neon' || (db === 'off' && setup.neon)
const supabase = db === 'supabase' || (db === 'off' && setup.supabase)
const i18n = setup.i18n.enabled
const forms = setup.preset.forms
const vueform = forms === 'vueform' || (forms === 'off' && setup.vueform)
const formkit = forms === 'formkit' || (forms === 'off' && setup.formkit.enabled)
const validation = setup.preset.validation
const valibot = validation === 'valibot' || (validation === 'off' && setup.valibot)
const zod = validation === 'zod' || (validation === 'off' && setup.zod)
const content = setup.content
const seo = setup.seo
const auth = setup.auth
const openprops = setup.openprops
const equipment = setup.equipment.enabled
const regexp = setup.regexp
const charts = setup.charts
const pages = setup.pages
</script>

<style scoped>
/* demo for @nuxt/fonts */
.fonts {
  font-family: "Kurale";
}

/* avoid Tailwind CSS styles here, because Tailwind may not be enabled */

/* flex flex-row justify-center */
.feature-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/* margin-auto my-4 w-3/5 flex flex-col */
.feature-list {
  margin: 0px auto;
  margin-bottom: 8px;
  width: 40%;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1200px) {
  .feature-list {
    width: 60%;
  }
}

@media (max-width: 800px) {
  .feature-list {
    width: 80%;
  }
}

@media (max-width: 600px) {
  .feature-list {
    width: 100%;
  }
}

/* mb-2 */
.pages {
  margin-bottom: 2em;
}
</style>
