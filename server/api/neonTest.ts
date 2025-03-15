export default defineEventHandler(async () => {
  const config = useRuntimeConfig().public.ignis
  if (config.preset.db === 'neon' || config.neon === true) {
    return await select(
      getNeonClient(),
      ['name', 'value'],
      'playing_with_neon',
      [{ column: 'name', condition: 'LIKE', value: '\'test%\'' }],
      'name DESC',
      2,
    )
  } else {
    return 'Neon DB module not enabled'
  }
})
