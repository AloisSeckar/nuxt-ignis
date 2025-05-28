export default defineEventHandler(async () => {
  const config = useRuntimeConfig().public.ignis
  if (config.preset.db === 'neon' || config.neon === true) {
    return await select(
      getNeonClient(),
      {
        columns: ['name', 'value'],
        from: 'playing_with_neon',
        where: { column: 'name', condition: 'LIKE', value: '\'test%\'' },
        order: 'name DESC',
        limit: 2,
      },
    )
  } else {
    return 'Neon DB module not enabled'
  }
})
