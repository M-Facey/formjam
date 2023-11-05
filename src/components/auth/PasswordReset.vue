<script lang="ts" setup>
import { ref } from "vue";
import pb from "@/db/pocketBase";
import { useForm } from "vee-validate";
import * as yup from "yup";

import Loader from "@/components/anim/Loader.vue";
import FormErrorMessage from "@/components/form/FormErrorMessage.vue";
import XTextInput from "@/components/inputs/ValidatedTextInput.vue";

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .email("Your email must be valid")
      .required("Your email is required"),
  }),
});

const loading = ref(false);
const errorMessage = ref("");
const onSubmit = handleSubmit(async ({ email }) => {
  loading.value = !loading.value;
  try {
    await pb.collection("users").requestPasswordReset(email);
  } catch (error: any) {
    errorMessage.value = "Failed to authenticate";
  }
  loading.value = false;
});

function clearErrorMessage() {
  errorMessage.value = "";
}
</script>

<template>
  <div class="text-black dark:text-white">
    <h2 class="text-center text-4xl font-epilogue font-bold">
      Reset Your Password
    </h2>

    <p class="pb-5 text-sky-500 dark:text-white">
      Fear not. We'll email you the instructions to reset your password.
    </p>

    <FormErrorMessage
      v-if="errorMessage"
      :message="errorMessage"
      @close-error-message="clearErrorMessage"
    />

    <XTextInput
      id="reset_email_input"
      type="text"
      name="email"
      label="Email Address"
      data-cy="reset_email_input"
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
