<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import pb from "@/db/pocketBase";
import { useForm } from "vee-validate";
import * as yup from "yup";

import Loader from "@/components/anim/Loader.vue";
import FormErrorMessage from "@/components/form/FormErrorMessage.vue";
import XTextInput from "@/components/inputs/ValidatedTextInput.vue";

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    password: yup
      .string()
      .required("Your new password is required")
      .min(8, "Your new password must be at least 8 characters")
      .max(25, "Your new password must be at most 25 characters"),
    confirmPassword: yup
      .string()
      .required("Please retype your new password")
      .oneOf(
        [yup.ref("password")],
        "Confirm Password must match your new password"
      ),
  }),
});

const route = useRoute();

const loading = ref(false);
const errorMessage = ref("");
const onSubmit = handleSubmit(async ({ password, confirmPassword }) => {
  loading.value = !loading.value;
  try {
    const passwordResetToken = route.params.token as string;
    await pb
      .collection("users")
      .confirmPasswordReset(passwordResetToken, password, confirmPassword);
  } catch (error: any) {
    errorMessage.value = "Failed to authenticate";
  }
  loading.value = false;
});
</script>

<template>
  <div class="text-black dark:text-white">
    <h2 class="text-center text-4xl font-epilogue font-bold pb-6">
      Confirm Your New Password
    </h2>

    <FormErrorMessage v-if="errorMessage" message="errorMessage" />
    <XTextInput
      id="new_password_input"
      type="text"
      name="password"
      label="New Password"
      data-cy="new_password_input"
    />

    <XTextInput
      id="confirm_new_password_input"
      type="text"
      name="confirmPassword"
      label="Confirm New Password"
      data-cy="confirm_new_password_input"
      class="mt-4"
    />

    <div class="flex items-center gap-x-4 pt-3">
      <button
        class="custom-btn px-4 py-1.5 text-sky-800 rounded-lg"
        @click="onSubmit"
      >
        <Loader v-if="loading" class="w-6 h-6" />
        <p v-else>Reset Password</p>
      </button>
      <router-link to="/auth/login" class="text-lg font-semibold underline"
        >Return to login page</router-link
      >
    </div>
  </div>
</template>
