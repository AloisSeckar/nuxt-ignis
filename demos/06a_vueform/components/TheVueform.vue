<template>
    <Vueform
        endpoint="/api/vueform"
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
        <FileElement
            name="profile_picture"
            label="Profile Picture"
            description="Upload a profile picture to personalize your account."
            :rules="[
            'required',
            ]"
            upload-temp-endpoint="/api/vueformfile"
        />
        <ButtonElement
            name="submit"
            button-label="Submit"
            :submits="true"
            :full="true"
            align="center"
        />
    </Vueform>
</template> 