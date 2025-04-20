<!--
    https://nuxt.com/docs/guide/directory-structure/components

    Example of a reusable Nuxt component.

    Any valid .vue file inside `/components` directory is auto-imported everywhere by Nuxt
    => no need for explicit imports.

    Modern Vue.js Composition API syntax is used for setup.
    https://vuejs.org/api/sfc-script-setup.html

    For usage go to `/pages/index.vue`

    {{ text }}
     - "double mustache" syntax is used to display JS expression inside HTML template
     - notice you can call props directly in template section

    Icon
     - icons are provided by "nuxt-icon" module
     - module is auto-imported via "@nuxt/ui"
     - NUXT_PUBLIC_IGNIS_UI=nuxt-ui is required to use this feature
-->

<template>
  <div
    class="feature"
    :class="active ? '' : 'feature-disabled'"
    :title="active ? 'Active' : 'Inactive'">
    {{ text }}
    <div v-if="active && showIcon" class="icon">
      <Icon name="ic:sharp-add-reaction" class="icon-color" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Macro `defineProps()` comes from Vue.js API
 * (https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits).
 * This is how to pass variables inside components in Vue.
 *
 * `required` - value has to be provided, otherwise an error will occur
 *
 * `default` - will have this value, unless overwritten by caller
 */
const props = defineProps({
  text: { type: String, required: true },
  optionalText: { type: String, default: 'default' },
  active: { type: Boolean, default: true },
})

/**
 * `Icon` component can only be used if `@nuxt/ui` module is activated.
 */
const config = useRuntimeConfig().public.ignis
const showIcon = config.preset.ui === 'nuxt-ui' || config.ui

// In setup section, you have to adress properties like this.
// You cannot reach them directly like in template.

// Note special inline `eslint` flag because normally you shouldn't use build-in console directly
// @see https://eslint.org/docs/latest/rules/no-console

/* eslint "no-console" : "off" */
log.debug(props.text)
log.debug(props.optionalText)
</script>

<style scoped>
/* avoid Tailwind CSS styles here, because Tailwind may not be enabled */

/* m-1! px-2 py-1 border! border-amber-300 font-bold text-lg text-feature bg-emerald-700 hover:bg-slate-700 */
.feature {
  margin: 4px;
  padding: 4px 12px;
  border: 2px solid #fcd34d;
  font-weight: bold;
  background-color: #047857;
  color: #f1f5f9;
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.feature:hover {
  background-color: #334155;
  color: #3CB371;
}

/* text-gray-700 bg-gray-300! hover:bg-slate-400! */
.feature-disabled {
  background-color: #cbd5e1;
  color: #334155;
}
.feature-disabled:hover {
  background-color: #94a3b8;
  color: #f1f5f9;
}

/* additional styles for displaying smiley icons */

.icon {
  display: inline;
}

.icon-color {
  color: yellow;
}
</style>
