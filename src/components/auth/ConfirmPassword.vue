<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import pb from "@/db/pocketBase";

import { useForm } from "vee-validate";
import * as yup from "yup";

import Loader from "@/components/anim/Loader.vue";
import FormErrorMessage from "@/components/form/FormErrorMessage.vue";
import XTextInput from "@/components/inputs/ValidatedTextInput.vue";

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    newPassword: yup
      .string()
      .required("Your new password is required")
      .min(8, "Your new password must be at least 8 characters")
      .max(25, "Your new password must be at most 25 characters"),
    confirmNewPassword: yup
      .string()
      .required("Please retype your new password")
      .oneOf(
        [yup.ref("password")],
        "Confirm Password must match your new password"
      ),
  }),
});

const route = useRoute();
const router = useRouter();

const showSuccessMessage = ref(false);
const timeoutId = ref<NodeJS.Timeout | null>(null);

const loading = ref(false);
const errorMessage = ref("");
const onSubmit = handleSubmit(async ({ newPassword, confirmNewPassword }) => {
  const DURATION_IN_SECS = 2 * 1000;
  loading.value = !loading.value;
  try {
    const passwordResetToken = route.params.token as string;
    await pb
      .collection("users")
      .confirmPasswordReset(
        passwordResetToken,
        newPassword,
        confirmNewPassword
      );

    showSuccessMessage.value = true;
    timeoutId.value = setTimeout(() => {
      showSuccessMessage.value = false;
      router.push({ path: "/auth/login" });
    }, DURATION_IN_SECS);
  } catch (error: any) {
    errorMessage.value = "Failed to authenticate";
  }
  loading.value = false;
});

function clearErrorMessage() {
  errorMessage.value = "";
}

function cancelTimeout() {
  if (timeoutId.value === null) return;

  clearTimeout(timeoutId.value);
}
</script>

<template>
  <div class="text-black dark:text-white">
    <h2 class="text-center text-4xl font-epilogue font-bold pb-6">
      Confirm New Password
    </h2>

    <FormErrorMessage
      v-if="errorMessage"
      :message="errorMessage"
      @close-error-message="clearErrorMessage"
    />

    <div class="w-full max-w-[500px]">
      <div
        v-if="showSuccessMessage"
        class="bg-green-500/30 mb-3 p-3 border border-green-500 rounded-lg"
      >
        <p>
          Your password was successfully reset to the new password.
          <span class="font-bold">Please Note:</span> You will be redirected to
          the
          <span
            class="bg-black/50 dark:bg-white/20 p-1 text-sm text-white font-semibold rounded-md"
            >Login Page</span
          >
          shortly.
        </p>
      </div>

      <XTextInput
        id="new_password_input"
        type="password"
        name="newPassword"
        label="New Password"
        data-cy="new_password_input"
      />

      <XTextInput
        id="confirm_new_password_input"
        type="password"
        name="confirmNewPassword"
        label="Confirm New Password"
        data-cy="confirm_new_password_input"
        class="mt-4"
      />

      <div class="flex items-center gap-x-4 pt-3">
        <button
          class="w-[156px] custom-btn px-4 py-1.5 text-sky-800 rounded-lg"
          @click="onSubmit"
        >
          <Loader v-if="loading" class="w-6 h-6 mx-auto" />
          <p v-else>Reset Password</p>
        </button>
        <router-link
          to="/auth/login"
          class="text-lg font-semibold underline"
          @click="cancelTimeout"
          >Return to login page</router-link
        >
      </div>
    </div>
  </div>
</template>
