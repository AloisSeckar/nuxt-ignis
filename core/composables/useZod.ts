/**
 * Exposes Zod schema validation functions. Requires `NUXT_PUBLIC_IGNIS_ZOD=true` to work properly.
 *
 * Usage: `const z = (await useZod())!`
 *
 * @returns Zod `z` object for schema validation
 */
export const useZod = async () => {
  if (useRuntimeConfig().public.ignis.zod) {
    const zod = await import('zod/v4')
    return zod.z
  } else {
    log.warn('Zod is not enabled (set NUXT_PUBLIC_IGNIS_ZOD=true)')
  }
}
