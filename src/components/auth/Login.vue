<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import pb from "@/db/pocketBase";

import { useForm } from "vee-validate";
import * as yup from "yup";

import Loader from "@/components/anim/Loader.vue";
import XTextInput from "@/components/inputs/ValidatedTextInput.vue";
import XCheckbox from "@/components/inputs/Checkbox.vue";
import FormErrorMessage from "@/components/form/FormErrorMessage.vue";

const rememberMe = ref(false);

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .email("Your email must be valid")
      .required("Your email is required"),
    password: yup
      .string()
      .required("Your password is required")
      .min(8, "Your password must be at least 8 characters")
      .max(25, "Your password must be at most 25 characters"),
  }),
});

const router = useRouter();
const loading = ref(false);
const errorMessage = ref("");
const errorTimeoutId = ref<NodeJS.Timeout | null>(null);
const onSubmit = handleSubmit(async ({ email, password }) => {
  loading.value = true;
  try {
    await pb.collection("users").authWithPassword(email, password);
    router.push("/dashboard");
  } catch (error: any) {
    errorMessage.value = "Failed to authenticate";
    resetErrorMessage();
  }
  loading.value = false;
});

function resetErrorMessage() {
  errorTimeoutId.value = setTimeout(() => {
    errorMessage.value = "";
  }, 5000);
}

function closeErrorMessage() {
  if (!errorTimeoutId.value) return;
  clearTimeout(errorTimeoutId.value);
  errorMessage.value = "";
}
</script>

<template>
  <div class="w-full max-w-[520px] px-5">
    <h2
      class="text-primary-dark-500 dark:text-white text-3xl xs:text-4xl text-center font-bold"
    >
      Log In to
      <RouterLink to="/" class="text-primary-dark-100/70 dark:text-white/50"
        >FormJAM</RouterLink
      >
    </h2>
    <p
      class="pt-2 pb-7 text-base xs:text-xl text-center text-sky-500 dark:text-sky-200"
    >
      Ready to get started? Log in to your account.
    </p>

    <div class="flex flex-col gap-y-4">
      <FormErrorMessage
        v-if="errorMessage"
        :message="errorMessage"
        @close-error-message="closeErrorMessage"
      />

      <XTextInput
        id="login_email"
        name="email"
        type="text"
        label="Email Address"
        data-cy="login_email_input"
      />

      <XTextInput
        id="login_password_input"
        name="password"
        type="password"
        label="Password"
        data-cy="login_password_input"
      />

      <div
        class="flex flex-col xs:flex-row items-center justify-between gap-y-2"
      >
        <XCheckbox
          id="loginRememberMe"
          text="Remember me?"
          v-model="rememberMe"
          class="pt-1"
          data-cy="login_rememberme_input"
        />

        <router-link
          to="/auth/reset-your-password"
          class="text-sky-500 hover:text-sky-600 dark:hover:text-sky-200 font-semibold underline"
          data-cy="login_goto_password_reset_link"
        >
          Forgot your password
        </router-link>
      </div>

      <div
        class="flex flex-col xs:flex-row items-center justify-between gap-x-4 gap-y-4"
      >
        <p
          class="flex-shrink-0 text-black dark:text-white text-base sm:text-lg select-none"
        >
          Is this your first time?
          <RouterLink
            to="/auth/signup"
            class="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 font-semibold underline"
            data-cy="login_goto_signup_link"
            >Sign Up</RouterLink
          >
        </p>

        <button
          class="custom-btn w-full xs:max-w-[150px] px-4 py-1.5 text-black rounded-lg"
          data-cy="login_submit_btn"
          @click="onSubmit"
        >
          <Loader v-if="loading" class="w-5 h-5 mx-auto" />
          <p v-else class="font-semibold tracking-wide">Log in</p>
        </button>
      </div>
    </div>
  </div>
</template>
