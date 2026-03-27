import { useRuntimeConfig } from '#imports'

type ValibotModule = typeof import('valibot')

/**
 * Exposes Valibot schema validation functions. Requires `NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=valibot` or `NUXT_PUBLIC_IGNIS_VALIBOT=true` to work properly.
 *
 * Usage: `const v = (await useValibot())!`
 *
 * @returns Valibot `v` object for schema validation
 */
export const useValibot = async (): Promise<ValibotModule | undefined> => {
  if (useRuntimeConfig().public.ignis.valibot === true) {
    const valibot = await import('valibot')
    return valibot
  }
  else {
    console.warn('Valibot is not enabled (set NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=valibot or NUXT_PUBLIC_IGNIS_VALIBOT=true)')
  }
}
