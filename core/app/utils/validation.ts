import type { ObjectEntries, ObjectSchema } from 'valibot'
import type { ZodObject } from 'zod/v4'

// quick object schema validation - zod variant
export async function isValidByZod(schema: ZodObject, obj: unknown): Promise<boolean> {
  const config = useRuntimeConfig().public.ignis
  if (config.preset.validation === 'zod' || config.zod === true) {
    return schema.safeParse(obj).success
  } else {
    log.warn('Zod is not enabled (set NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=zod or NUXT_PUBLIC_IGNIS_ZOD=true)')
    return false
  }
}

// quick object schema validation - valibot variant
export async function isValidByValibot(schema: ObjectSchema<ObjectEntries, undefined>, obj: unknown): Promise<boolean> {
  const config = useRuntimeConfig().public.ignis
  if (config.preset.validation === 'valibot' || config.valibot === true) {
    const v = (await useValibot())!
    return v.safeParse(schema, obj).success
  } else {
    log.warn('Valibot is not enabled (set NUXT_PUBLIC_IGNIS_PRESET_VALIDATION=valibot or NUXT_PUBLIC_IGNIS_VALIBOT=true)')
    return false
  }
}
