<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import pb from "@/db/pocketBase";
import type { FormError } from "@/types/form";

import { useForm } from "vee-validate";
import * as yup from "yup";

import Loader from "@/components/anim/Loader.vue";
import XTextInput from "@/components/inputs/ValidatedTextInput.vue";
import FormErrorMessage from "@/components/form/FormErrorMessage.vue";

const { values, handleSubmit, resetForm } = useForm({
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
      .min(8, "Your password must be at least 8 characters")
      .max(25, "Your password must be at most 25 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf(
        [yup.ref("password")],
        "Confirm Password must match your password"
      ),
  }),
});

const fullName = computed(() => {
  return values.firstName + " " + values.lastName;
});

const router = useRouter();
const loading = ref(false);
const onSubmit = handleSubmit(async ({ email, password, confirmPassword }) => {
  loading.value = true;
  const data = {
    username: "",
    email,
    password,
    passwordConfirm: confirmPassword,
    name: fullName.value,
  };

  try {
    await pb.collection("users").create(data);
    resetForm();
    router.push("/auth/login");
  } catch (error: any) {
    const errorResponse = error.data as FormError;
    let errorFields = Object.keys(errorResponse.data);
    errorMessage.value = errorResponse.data[errorFields[0]].message;
    resetErrorMessage();
  }
  loading.value = false;
});

// error message functions
const hasErrorMessage = computed(() => {
  return errorMessage.value !== "";
});

const errorMessage = ref("");
const errorTimoutId = ref<NodeJS.Timeout | null>(null);

function resetErrorMessage() {
  errorTimoutId.value = setTimeout(() => {
    errorMessage.value = "";
  }, 5000);
}

function closeErrorMessage() {
  if (!errorTimoutId.value) return;
  clearTimeout(errorTimoutId.value);

  errorMessage.value = "";
}
</script>

<template>
  <div class="w-full">
    <h2
      class="text-primary-dark-500 dark:text-white text-3xl xs:text-4xl text-center font-bold pb-7"
    >
      Sign Up to
      <RouterLink
        to="/"
        class="text-primary-dark-100/70 dark:text-white/50"
        data-cy="signup_goto_home_link"
        >FormJAM</RouterLink
      >
    </h2>

    <div class="w-full max-w-[540px] flex flex-col gap-y-3 px-5 mx-auto">
      <FormErrorMessage
        v-if="hasErrorMessage"
        :message="errorMessage"
        @close-error-message="closeErrorMessage"
      />

      <div class="flex flex-col sm:flex-row gap-3">
        <XTextInput
          id="signup_firstname"
          type="text"
          name="firstName"
          label="First Name"
          class="w-full sm:w-1/2"
          data-cy="signup_firstname_input"
        />

        <XTextInput
          id="signup_lastname"
          type="text"
          name="lastName"
          label="Last Name"
          class="w-full sm:w-1/2"
          data-cy="signup_lastname_input"
        />
      </div>

      <XTextInput
        id="signup_email"
        name="email"
        type="text"
        label="Email Address"
        data-cy="signup_email_input"
      />

      <XTextInput
        id="signup_pasxsword"
        type="password"
        name="password"
        label="Password"
        data-cy="signup_password_input"
      />

      <XTextInput
        id="signup_confirm_password"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        data-cy="signup_confirm_password_input"
      />

      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-x-4 gap-y-4 mt-3"
      >
        <p
          class="flex-shrink-0 text-center text-black dark:text-white text-base sm:text-lg select-none"
        >
          Already have an account?
          <RouterLink
            to="/auth/login"
            class="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 font-semibold underline"
            data-cy="signup_goto_login_link"
            >Log in</RouterLink
          >
        </p>

        <button
          class="custom-btn w-full sm:max-w-[150px] px-4 py-1.5 text-black rounded-lg"
          data-cy="signup_submit_btn"
          @click="onSubmit"
        >
          <Loader v-if="loading" class="w-5 h-5 mx-auto" />
          <p v-else class="font-semibold tracking-wide">Get Started</p>
        </button>
      </div>
    </div>
  </div>
</template>
