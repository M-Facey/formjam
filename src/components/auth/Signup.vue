<script lang="ts" setup>
import { ref } from "vue";
import TextInput from "../inputs/TextInput.vue";
import XButton from "../inputs/Button.vue";

import { useForm } from "vee-validate";
import * as yup from "yup";

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    firstName: yup
      .string()
      .required("Your first name is required")
      .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, "Please enter valid name")
      .min(3, "Your first name must contain at least 3 characters"),
    lastName: yup
      .string()
      .required("Your last name is required")
      .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, "Please enter valid name")
      .min(3, "Your last name must contain at least 3 characters"),
    email: yup
      .string()
      .required("Your email is required")
      .email("Your email must be valid"),
    password: yup
      .string()
      .required("Your password is required")
      .min(6, "Your password must contain at least 6 characters")
      .max(25, "Your password must contain at most 25 characters"),
    confirmPassword: yup
      .string()
      .required()
      .oneOf(
        [yup.ref("password")],
        "Confirm Password must match your password"
      ),
  }),
});

const loading = ref(false);
const submitForm = handleSubmit(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<template>
  <div>
    <h2 class="text-4xl text-center font-bold pb-10">
      Sign Up to <RouterLink to="/" class="text-white/70">FormJAM</RouterLink>
    </h2>

    <div class="flex flex-col gap-y-2">
      <TextInput
        id="signup_firstname"
        name="firstName"
        type="text"
        placeholder="First Name"
      >
        <label for="signup_firstname" class="pb-1">First Name</label>
      </TextInput>
      <TextInput
        id="signup_lastname"
        name="lastName"
        type="text"
        placeholder="Last Name"
      >
        <label for="signup_lastname" class="pb-1">Last Name</label>
      </TextInput>

      <TextInput id="signup_email" name="email" type="text" placeholder="Email">
        <label for="signup_email" class="pb-1">Email</label>
      </TextInput>

      <TextInput
        id="signup_pasxsword"
        name="password"
        type="password"
        placeholder="Password"
      >
        <label for="signup_password" class="pb-1">Password</label>
      </TextInput>

      <TextInput
        id="signup_confirm_password"
        name="confirmPassword"
        type="password"
        placeholder="Password"
      >
        <label for="signup_confirm_password" class="pb-1"
          >Confirm Password</label
        >
      </TextInput>

      <div class="flex items-center justify-between pt-4">
        <p class="text-lg">
          Already have an account?
          <RouterLink
            to="/auth/login"
            class="text-sky-500 hover:text-sky-400 font-bold underline"
            >Log in</RouterLink
          >
        </p>
        <div class="w-[140px]">
          <XButton
            text="Get Started"
            size="expand"
            align="center"
            :loading="loading"
            class="font-bold"
            @trigger-event="submitForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>
