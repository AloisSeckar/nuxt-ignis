export default defineEventHandler(async () => {
  if (useRuntimeConfig().public.ignis.db?.neon?.enabled === true) {
    const { select } = useNeonServer()
    return await select(
      {
        columns: ['name', 'value'],
        from: 'playing_with_neon',
        where: { column: 'name', operator: 'LIKE', value: '\'test%\'' },
        order: { column: 'name', direction: 'DESC' },
        limit: 2,
      },
    )
  }
  else {
    return 'Neon DB module not enabled'
  }
})
