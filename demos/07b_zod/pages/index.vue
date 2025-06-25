<template>
  <div>
    <h1>Ignis Zod demo</h1>
    <div>Valid: {{ validObject }}</div>
    <div>Invalid: {{ invalidObject }}</div>
  </div>
</template>

<script setup lang="ts">
// importing via nuxt-ignis composable
// the object might technically be undefined,
// but only if the runtime config is not set up correctly
// so it is safe to make the assertion
const z = (await useZod())!

// define a Zod schema
const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
})

// TODO this is not possible with current way of importing Zod
// "z" is not available as a namespace
// inferred type for using in app
// type Login = z.infer<typeof LoginSchema>;
type Login = {
  email: string
  password: string
}

// parse an object using the schema
// this will throw an error if the object is invalid
let validObject: Login
let invalidObject: Login
try {
  validObject = LoginSchema.parse({ email: 'jane.doe@example.com', password: '12345' })
  invalidObject = LoginSchema.parse({ email: 'jane.doe@example.com', password: 12345 })
}
catch (error) {
  // ZodError: Expected string, received number
  console.log((error as Error).message)
}
</script>
