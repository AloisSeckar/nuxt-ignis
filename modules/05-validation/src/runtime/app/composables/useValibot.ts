import { useRuntimeConfig } from '#imports'

type ValibotModule = typeof import('valibot')

/**
 * Exposes Valibot schema validation functions.
 * Requires Valibot integration to be enabled.
 *
 * Usage: `const v = (await useValibot())!`
 *
 * @returns Valibot `v` object for schema validation
 */
export const useValibot = async (): Promise<ValibotModule | undefined> => {
  if (useRuntimeConfig().public.ignis.validation.valibot === true) {
    const valibot = await import('valibot')
    return valibot
  } else {
    console.warn('Valibot is not enabled, validation is not available.')
  }
}
