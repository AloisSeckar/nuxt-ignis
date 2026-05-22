// check server-side re-export of Zod features
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const z = (await useZod())!

  const LoginSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const isValid = await isValidByZod(LoginSchema, body)

  const parseResult = LoginSchema.safeParse(body)
  const issues = parseResult.success ? null : parseResult.error.issues.map(i => i.message)

  return { isValid, issues, body }
})
