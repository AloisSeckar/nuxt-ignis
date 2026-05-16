import type { ObjectEntries, ObjectSchema } from 'valibot'
// @ts-expect-error useValibot will only be called if added into imports by the module
import { useRuntimeConfig, useValibot } from '#imports'

// quick object schema validation - valibot variant
export async function isValidByValibot(schema: ObjectSchema<ObjectEntries, undefined>, obj: unknown): Promise<boolean> {
  if (useRuntimeConfig().public.ignis.validation.valibot === true) {
    const v = (await useValibot())!
    return v.safeParse(schema, obj).success
  } else {
    console.warn('Valibot is not enabled, validation is not available.')
    return false
  }
}
