// check server-side re-export of Valibot features
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const v = (await useValibot())!

  const LoginSchema = v.object({
    email: v.string(),
    password: v.string(),
  })

  const isValid = await isValidByValibot(LoginSchema, body)

  const parseResult = v.safeParse(LoginSchema, body)
  const issues = parseResult.success ? null : parseResult.issues.map(i => i.message)

  return { isValid, issues, body }
})
