<template>
  <div>
    <h1>Nuxt Ignis demo - Zod</h1>
    <div>Valid: {{ validObject }}</div>
    <div>Invalid: {{ invalidObject }}</div>
    <div>Validator: {{ isValid1 }} {{ isValid2 }}</div>
    <hr>
    <h2>Server-side validation</h2>
    <button @click="validateOnServer(true)">
      Validate valid object (server)
    </button>
    <button @click="validateOnServer(false)">
      Validate invalid object (server)
    </button>
    <div v-if="serverResult !== null">
      Server result: {{ serverResult }}
    </div>
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
} catch (error) {
  // ZodError: Expected string, received number
  console.log((error as Error).message)
}

// test built-in validator
const isValid1 = await isValidByZod(LoginSchema, { email: 'jane.doe@example.com', password: '12345' })
const isValid2 = await isValidByZod(LoginSchema, { email: 'jane.doe@example.com', password: 12345 })

// server-side validation via /api/validate
// proves isValidByZod is auto-imported in Nitro server routes (addServerImports)
const serverResult = ref<{ isValid: boolean, body: unknown } | null>(null)

async function validateOnServer(useValid: boolean) {
  const body = useValid
    ? { email: 'jane.doe@example.com', password: '12345' }
    : { email: 'jane.doe@example.com', password: 12345 }
  serverResult.value = await $fetch('/api/validate', { method: 'POST', body })
}
</script>
