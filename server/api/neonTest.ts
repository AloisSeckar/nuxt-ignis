export default defineEventHandler(async () => {
  const config = useRuntimeConfig().public.ignis
  if (config.preset.db === 'neon' || config.neon === true) {
    const neon = getNeonClient()
    return await select(
      neon,
      ['name', 'value'],
      ['playing_with_neon'],
      ['name LIKE \'test%\''],
      'name DESC',
      2,
    )
  } else {
    return 'Neon DB module not enabled'
  }
})
