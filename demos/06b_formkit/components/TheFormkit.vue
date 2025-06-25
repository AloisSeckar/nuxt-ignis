<template>
  <div>
    {{ formState }}
  </div>
  <div>
    <FormKit
      v-slot="{ value }"
      type="form"
      submit-label="Odeslat"
      @submit="handleSave"
    >
      Current form data:
      <pre>{{ value }}</pre>
      <br>
      <FormKit
        id="name"
        v-model="bio.name"
        type="text"
        name="name"
        label="Name:"
        validation="required"
        help="Insert text"
      />
      <FormKit
        id="age"
        v-model="bio.age"
        type="number"
        number="integer"
        name="age"
        label="Age:"
        validation="required|min:18|max:99"
        help="Select number"
      />
      <FormKit
        id="gender"
        v-model="bio.gender"
        name="gender"
        type="radio"
        label="Gender:"
        :options="{ m: 'male', f: 'female', x: 'other' }"
        validation="required"
        help="Pick one"
      />
      <FormKit
        id="bio"
        v-model="bio.bio"
        type="textarea"
        name="bio"
        label="Bio:"
        validation="required"
        help="Write text"
      />
      <FormKit
        id="completed"
        v-model="bio.completed"
        type="checkbox"
        name="completed"
        label="Completed"
        help="Check to mark as completed"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
type Bio = {
  name: string
  age: number
  gender: 'm' | 'f' | 'x'
  bio: string
  completed: boolean
}

const bio = ref({} as Bio)
const formState = ref('form was not submitted')

function handleSave(formData: Bio) {
  formState.value = 'form was submitted @ ' + new Date().toISOString()
  console.log(formState.value)
  console.log('Submited values:')
  console.log(formData)
}
</script>
