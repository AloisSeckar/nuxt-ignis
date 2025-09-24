<!--
    https://nuxt.com/docs/guide/directory-structure/pages

    An example of Nuxt component.

    IgnisFeature
     - an example usage of auto-imported Nuxt component declared in `/components` directory
     - the text is (usually) being loaded localized via nuxtjs/i18n module
     - features are being displayed conditionally according to current setting
-->

<template>
  <div class="ignis-feature-wrapper">
    <h1 class="ignis-feature-header">
      Features Overview
    </h1>
    <div class="feature-list">
      <IgnisFeature :text="useIgnisT('features.nuxt')" />
      <IgnisFeature :text="useIgnisT('features.consola')" />
      <IgnisFeature :active="eslint" :text="useIgnisT('features.eslint')" />
      <IgnisFeature :active="security" :text="useIgnisT('features.security')" />
      <IgnisFeature :active="image" :text="useIgnisT('features.image')" />
      <IgnisFeature :active="scripts" :text="useIgnisT('features.scripts')" />
      <IgnisFeature :active="fonts" :text="useIgnisT('features.fonts')" class="fonts" />
      <IgnisFeature :active="pinia" :text="useIgnisT('features.pinia')" />
      <IgnisFeature :active="vueuse" :text="useIgnisT('features.vueuse')" />
      <IgnisFeature :active="true" :text="useIgnisT('features.time')" />
      <IgnisFeature :active="nuxtui" :text="useIgnisT('features.ui')" />
      <IgnisFeature :active="tailwind" :text="useIgnisT('features.tailwind')" />
      <IgnisFeature :active="nuxtui" :text="useIgnisT('features.icon')" />
      <IgnisFeature :active="neon" :text="useIgnisT('features.neon')" />
      <IgnisFeature :active="supabase" :text="useIgnisT('features.supabase')" />
      <IgnisFeature :active="i18n" :text="useIgnisT('features.i18n')" />
      <IgnisFeature :active="vueform" :text="useIgnisT('features.vueform')" />
      <IgnisFeature :active="formkit" :text="useIgnisT('features.formkit')" />
      <IgnisFeature :active="valibot" :text="useIgnisT('features.valibot')" />
      <IgnisFeature :active="zod" :text="useIgnisT('features.zod')" />
      <IgnisFeature :active="content" :text="useIgnisT('features.content')" />
      <IgnisFeature :active="seo" :text="useIgnisT('features.seo')" />
      <IgnisFeature :active="auth" :text="useIgnisT('features.auth')" />
      <IgnisFeature :active="equipment" :text="useIgnisT('features.equipment')" />
      <IgnisFeature :active="regexp" :text="useIgnisT('features.regexp')" />
      <IgnisFeature :active="charts" :text="useIgnisT('features.charts')" />
      <IgnisFeature :active="openprops" class="openprops-feature" :text="useIgnisT('features.openprops')" />
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
</script>

<style scoped>
/* demo for @nuxt/fonts */
.fonts {
  font-family: "Kurale";
}

/* avoid Tailwind CSS styles here, because Tailwind may not be enabled */

.ignis-feature-wrapper {
  text-align: center;
  margin: 0 auto;
  max-width: 1200px;
}

.ignis-feature-header {
  text-align: center;
  font-family: monospace;
  font-size: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: #fbbf24;
}

/* margin-auto my-4 flex flex-col */
.feature-list {
  margin: 0px auto;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
}

/* mb-2 */
.pages {
  margin-bottom: 2em;
}
</style>
