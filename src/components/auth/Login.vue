<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useForm } from "vee-validate";
import * as yup from "yup";
import pb from "../../db/pocketBase";

import XTextInput from "../inputs/TextInput.vue";
import XButton from "../inputs/Button.vue";
import XCheckbox from "../inputs/Checkbox.vue";
import FormErrorMessage from "../form/FormErrorMessage.vue";

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
      .min(8, "Your password must contain at least 8 characters")
      .max(25, "Your password must contain at most 25 characters"),
  }),
});

const router = useRouter();
const loading = ref(false);
const errorMessage = ref("");
const errorTimeoutId = ref(-1);
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
  }, 10000);
}

function closeErrorMessage() {
  clearTimeout(errorTimeoutId.value);
  errorMessage.value = "";
}
</script>

<template>
  <div>
    <h2 class="text-4xl text-center font-bold pb-10">
      Log In to <RouterLink to="/" class="text-white/50">FormJAM</RouterLink>
    </h2>

    <div class="flex flex-col gap-y-2">
      <FormErrorMessage
        v-if="errorMessage"
        :message="errorMessage"
        @close-error-message="closeErrorMessage"
      />
      <XTextInput name="email" id="login_email" type="text" placeholder="Email">
        <label for="login_email" class="pb-1">Email</label>
      </XTextInput>

      <XTextInput
        name="password"
        id="login_password"
        type="password"
        placeholder="Password"
      >
        <label for="login_password" class="pb-1">Password</label>
      </XTextInput>

      <XCheckbox
        id="loginRememberMe"
        text="Remember me?"
        v-model="rememberMe"
        class="pt-3"
      />

      <div class="flex items-center justify-between">
        <p class="text-lg">
          Is this your first time?
          <RouterLink
            to="/auth/signup"
            class="text-sky-500 hover:text-sky-400 font-bold underline"
            >Sign Up</RouterLink
          >
        </p>
        <div class="w-[140px]">
          <XButton
            text="Log In"
            size="expand"
            align="center"
            :loading="loading"
            class="font-bold"
            @trigger-event="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>
