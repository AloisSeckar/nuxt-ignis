<!--
    https://nuxt.com/docs/guide/directory-structure/pages

    An example of Nuxt component.

    IgnisContentFeaturesDetail
     - an example usage of auto-imported Nuxt component declared in `/components` directory
     - the text is (usually) being loaded localized via nuxtjs/i18n module
     - features are being displayed conditionally according to current setting
     - data for displaying are created as an array and then iterated with `v-for` directive
-->

<template>
  <div id="ignis-info" class="ignis-feature-wrapper">
    <h1 class="ignis-feature-header">
      Features Overview
    </h1>
    <div class="feature-list">
      <IgnisContentFeaturesDetail
        v-for="feature in features" :key="feature.text"
        :text="feature.text" :active="feature.active" :class="feature.class ?? ''" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIgnisT } from '#imports' // requires explicit import for some reason

const setup = useRuntimeConfig().public.ignis

const ui = setup.preset.ui
const db = setup.preset.db
const forms = setup.preset.forms
const validation = setup.preset.validation

const features = [
  { text: useIgnisT('features.nuxt'), active: true },
  { text: useIgnisT('features.consola'), active: true },
  { text: useIgnisT('features.eslint'), active: setup.core.eslint },
  { text: useIgnisT('features.security'), active: setup.core.security },
  { text: useIgnisT('features.image'), active: setup.core.image },
  { text: useIgnisT('features.scripts'), active: setup.core.scripts },
  { text: useIgnisT('features.fonts'), active: setup.core.fonts, class: 'fonts' },
  { text: useIgnisT('features.pinia'), active: setup.core.pinia },
  { text: useIgnisT('features.vueuse'), active: setup.core.vueuse },
  { text: useIgnisT('features.time'), active: true },
  { text: useIgnisT('features.ui'), active: ui === 'nuxt-ui' || setup.ui },
  { text: useIgnisT('features.tailwind'), active: ui !== 'off' || setup.ui || setup.tailwind },
  { text: useIgnisT('features.icon'), active: ui === 'nuxt-ui' || setup.ui },
  { text: useIgnisT('features.neon'), active: db === 'neon' || (db === 'off' && setup.neon) },
  { text: useIgnisT('features.supabase'), active: db === 'supabase' || (db === 'off' && setup.supabase.enabled) },
  { text: useIgnisT('features.vueform'), active: forms === 'vueform' || (forms === 'off' && setup.vueform) },
  { text: useIgnisT('features.formkit'), active: forms === 'formkit' || (forms === 'off' && setup.formkit.enabled) },
  { text: useIgnisT('features.valibot'), active: validation === 'valibot' || (validation === 'off' && setup.valibot) },
  { text: useIgnisT('features.zod'), active: validation === 'zod' || (validation === 'off' && setup.zod) },
  { text: useIgnisT('features.content'), active: setup.content.enabled },
  { text: useIgnisT('features.i18n'), active: setup.i18n.enabled },
  { text: useIgnisT('features.seo'), active: setup.seo.enabled },
  { text: useIgnisT('features.auth'), active: setup.auth },
  { text: useIgnisT('features.social'), active: setup.social.enabled },
  { text: useIgnisT('features.equipment'), active: setup.equipment.enabled },
  { text: useIgnisT('features.regexp'), active: setup.regexp },
  { text: useIgnisT('features.charts'), active: setup.charts },
  { text: useIgnisT('features.openprops'), active: setup.openprops, class: 'openprops-feature' },
]
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
