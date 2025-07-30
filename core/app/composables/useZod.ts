/**
 * Exposes Zod schema validation functions. Requires `NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=zod` or `NUXT_PUBLIC_IGNIS_ZOD=true` to work properly.
 *
 * Usage: `const z = (await useZod())!`
 *
 * @returns Zod `z` object for schema validation
 */
export const useZod = async () => {
  const config = useRuntimeConfig().public.ignis
  if (config.preset.validation === 'zod' || config.zod === true) {
    const zod = await import('zod/v4')
    return zod.z
  } else {
    log.warn('Zod is not enabled (set NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=zod or NUXT_PUBLIC_IGNIS_ZOD=true)')
  }
}
