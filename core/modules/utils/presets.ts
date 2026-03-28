import type { IgnisPresetOptions } from '../02-features'

export function resolveUiPreset(preset: IgnisPresetOptions['ui']) {
  switch (preset) {
    case 'nuxt-ui':
      return { ui: true }
    case 'tailwind':
      return { tailwind: true }
    case 'off':
      return undefined
    default:
      if (preset) {
        console.warn(`Invalid UI preset value "${preset}" provided. Supported values are "nuxt-ui" | "tailwind" | "off". Defaulting to "off".`)
      }
      return undefined
  }
}

export function resolveDbPreset(preset: IgnisPresetOptions['db']) {
  switch (preset) {
    case 'neon':
      return { neon: true }
    case 'supabase':
      return { supabase: true }
    case 'off':
      return undefined
    default:
      if (preset) {
        console.warn(`Invalid DB preset value "${preset}" provided. Supported values are "neon" | "supabase" | "off". Defaulting to "off".`)
      }
      return undefined
  }
}

export function resolveFormsPreset(preset: IgnisPresetOptions['forms']) {
  switch (preset) {
    case 'vueform':
      return { vueform: { enabled: true } }
    case 'formkit':
      return { formkit: { enabled: true } }
    case 'off':
      return undefined
    default:
      if (preset) {
        console.warn(`Invalid Forms preset value "${preset}" provided. Supported values are "vueform" | "formkit" | "off". Defaulting to "off".`)
      }
      return undefined
  }
}

export function resolveValidationPreset(preset: IgnisPresetOptions['validation']) {
  switch (preset) {
    case 'zod':
      return { zod: true }
    case 'valibot':
      return { valibot: true }
    case 'off':
      return undefined
    default:
      if (preset) {
        console.warn(`Invalid Validation preset value "${preset}" provided. Supported values are "zod" | "valibot" | "off". Defaulting to "off".`)
      }
      return undefined
  }
}
