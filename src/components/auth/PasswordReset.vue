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
  <form
    id="password_reset_form"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black dark:text-white px-5"
    @submit="onSubmit"
  >
    <h2 class="text-center text-3xl xs:text-4xl font-epilogue font-bold">
      Reset Your Password
    </h2>

    <p
      class="pt-1 pb-5 text-sm xs:text-base text-center text-sky-500 dark:text-white"
    >
      Fear not. We'll email you the instructions to reset your password.
    </p>

    <FormErrorMessage
      v-if="errorMessage"
      :message="errorMessage"
      @close-error-message="clearErrorMessage"
    />

    <XTextInput
      id="reset_password_email_input"
      type="text"
      name="email"
      label="Email Address"
      data-cy="reset_password_email_input"
      autocomplete="email"
    />

    <div class="flex flex-col xs:flex-row items-center gap-x-4 pt-3">
      <button
        class="w-full xs:max-w-[156px] custom-btn mb-2 xs:mb-0 px-4 py-1.5 text-sky-800 rounded-lg"
        data-cy="reset_password_submit_btn"
      >
        <Loader v-if="loading" class="w-6 h-6" />
        <p v-else>Reset Password</p>
      </button>
      <RouterLink
        to="/auth/login"
        class="text-base sm:text-lg font-semibold underline"
        data-cy="reset_password_goto_login"
        >Return to login page</RouterLink
      >
    </div>
  </form>
</template>
