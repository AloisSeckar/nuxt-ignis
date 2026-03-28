// TODO move this into db module
export default defineEventHandler(async () => {
  if (useRuntimeConfig().public.ignis.db.neon.enabled === true) {
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
