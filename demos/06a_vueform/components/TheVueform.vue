<template>
    <Vueform
        :endpoint="submitForm"
        method="post"
        @response="vueformResponse"
        @error="vueformError"
    >
        <StaticElement
            name="title"
            tag="h1"
            content="User Profile Form"
            description="Please fill out the following information to complete your user profile."
        />
        <TextElement
            name="first_name"
            label="First Name"
            placeholder="Enter your first name"
            :rules="[
            'required',
            ]"
        />
        <TextElement
            name="last_name"
            label="Last Name"
            placeholder="Enter your last name"
            :rules="[
            'required',
            ]"
        />
        <TextElement
            name="age"
            label="Age"
            placeholder="Enter your age"
            :rules="[
            'required',
            ]"
        />
        <RadiogroupElement
            name="gender"
            label="Gender"
            :rules="[
            'required',
            ]"
            :items="[
            'Male',
            'Female',
            'Other',
            ]"
        />
        <TextElement
            name="genderText"
            label="Please specify gender:"
            :conditions="[
            [
                'gender',
                'in',
                [
                'Other',
                ],
            ],
            ]"
        />
        <RadiogroupElement
            name="country"
            label="Country"
            :rules="[
            'required',
            ]"
            :items="[
            '(List of countries)',
            'Other',
            ]"
        />
        <TextElement
            name="countryText"
            label="Please specify country:"
            :conditions="[
            [
                'country',
                'in',
                [
                'Other',
                ],
            ],
            ]"
        />
        <!--
        <FileElement
            name="profile_picture"
            label="Profile Picture"
            description="Upload a profile picture to personalize your account."
            :rules="[
              'required',
            ]"
            upload-temp-endpoint="/api/vueformfile"
        />
        -->
        <ButtonElement
            name="submit"
            button-label="Submit"
            :submits="true"
            :full="true"
            align="center"
        />
    </Vueform>
</template> 

<script setup lang="ts">
// @ts-expect-error no-implicit-any
const submitForm = async (_FormData: unknown, form$: VueformData) => {
  console.log(form$.data)
  return {
    status: 200,
    statusText: 'OK',
  }
}

const vueformResponse = (response, _form$) => {
  console.info(response)
  alert('Form was handled and OK response from API was received')
}

const vueformError = (error, details, _form$) => {
  console.error(error)
  console.error(details)
  alert('Error occured! (see console for details)')
}
</script>
