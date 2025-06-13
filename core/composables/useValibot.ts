/**
 * Exposes Valibot schema validation functions. Requires `NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=valibot` or `NUXT_PUBLIC_IGNIS_VALIBOT=true` to work properly.
 *
 * Usage: `const v = (await useValibot())!`
 *
 * @returns Valibot `v` object for schema validation
 */
export const useValibot = async () => {
  const config = useRuntimeConfig().public.ignis
  if (config.preset.validation === 'valibot' || config.valibot === true) {
    const valibot = await import('valibot')
    return valibot
  } else {
    log.warn('Valibot is not enabled (set NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=valibot or NUXT_PUBLIC_IGNIS_VALIBOT=true)')
  }
}
