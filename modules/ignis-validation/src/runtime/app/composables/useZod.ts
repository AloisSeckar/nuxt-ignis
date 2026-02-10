import { useRuntimeConfig } from '#imports'

type ZodModule = typeof import('zod/v4')
type ZodZ = ZodModule['z']

/**
 * Exposes Zod schema validation functions. Requires `NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=zod` or `NUXT_PUBLIC_IGNIS_ZOD=true` to work properly.
 *
 * Usage: `const z = (await useZod())!`
 *
 * @returns Zod `z` object for schema validation
 */
export const useZod = async (): Promise<ZodZ | undefined> => {
  if (useRuntimeConfig().public.ignis.zod === true) {
    const zod = await import('zod/v4')
    return zod.z
  }
  else {
    console.warn('Zod is not enabled (set NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=zod or NUXT_PUBLIC_IGNIS_ZOD=true)')
  }
}
