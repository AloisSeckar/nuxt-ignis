import type { ZodObject } from 'zod/v4'
import { useRuntimeConfig } from '#imports'

// quick object schema validation - zod variant
export async function isValidByZod(schema: ZodObject, obj: unknown): Promise<boolean> {
  if (useRuntimeConfig().public.ignis.zod === true) {
    return schema.safeParse(obj).success
  }
  else {
    console.warn('Zod is not enabled (set NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=zod or NUXT_PUBLIC_IGNIS_ZOD=true)')
    return false
  }
}
