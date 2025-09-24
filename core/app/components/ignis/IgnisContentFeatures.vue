<!--
    https://nuxt.com/docs/guide/directory-structure/pages

    An example of Nuxt component.

    IgnisContentFeaturesDetail
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
      <IgnisContentFeaturesDetail :text="useIgnisT('features.nuxt')" />
      <IgnisContentFeaturesDetail :text="useIgnisT('features.consola')" />
      <IgnisContentFeaturesDetail :active="eslint" :text="useIgnisT('features.eslint')" />
      <IgnisContentFeaturesDetail :active="security" :text="useIgnisT('features.security')" />
      <IgnisContentFeaturesDetail :active="image" :text="useIgnisT('features.image')" />
      <IgnisContentFeaturesDetail :active="scripts" :text="useIgnisT('features.scripts')" />
      <IgnisContentFeaturesDetail :active="fonts" :text="useIgnisT('features.fonts')" class="fonts" />
      <IgnisContentFeaturesDetail :active="pinia" :text="useIgnisT('features.pinia')" />
      <IgnisContentFeaturesDetail :active="vueuse" :text="useIgnisT('features.vueuse')" />
      <IgnisContentFeaturesDetail :active="true" :text="useIgnisT('features.time')" />
      <IgnisContentFeaturesDetail :active="nuxtui" :text="useIgnisT('features.ui')" />
      <IgnisContentFeaturesDetail :active="tailwind" :text="useIgnisT('features.tailwind')" />
      <IgnisContentFeaturesDetail :active="nuxtui" :text="useIgnisT('features.icon')" />
      <IgnisContentFeaturesDetail :active="neon" :text="useIgnisT('features.neon')" />
      <IgnisContentFeaturesDetail :active="supabase" :text="useIgnisT('features.supabase')" />
      <IgnisContentFeaturesDetail :active="i18n" :text="useIgnisT('features.i18n')" />
      <IgnisContentFeaturesDetail :active="vueform" :text="useIgnisT('features.vueform')" />
      <IgnisContentFeaturesDetail :active="formkit" :text="useIgnisT('features.formkit')" />
      <IgnisContentFeaturesDetail :active="valibot" :text="useIgnisT('features.valibot')" />
      <IgnisContentFeaturesDetail :active="zod" :text="useIgnisT('features.zod')" />
      <IgnisContentFeaturesDetail :active="content" :text="useIgnisT('features.content')" />
      <IgnisContentFeaturesDetail :active="seo" :text="useIgnisT('features.seo')" />
      <IgnisContentFeaturesDetail :active="auth" :text="useIgnisT('features.auth')" />
      <IgnisContentFeaturesDetail :active="equipment" :text="useIgnisT('features.equipment')" />
      <IgnisContentFeaturesDetail :active="regexp" :text="useIgnisT('features.regexp')" />
      <IgnisContentFeaturesDetail :active="charts" :text="useIgnisT('features.charts')" />
      <IgnisContentFeaturesDetail :active="openprops" class="openprops-feature" :text="useIgnisT('features.openprops')" />
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
