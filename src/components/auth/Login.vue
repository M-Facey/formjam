<script lang="ts" setup>
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import TextInput from "../inputs/TextInput.vue";
import XButton from "../inputs/Button.vue";
import XCheckbox from "../inputs/Checkbox.vue";

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
      .min(6, "Your password must contain at least 6 characters")
      .max(25, "Your password must contain at most 25 characters"),
  }),
});

const loading = ref(false);

const onSubmit = handleSubmit(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<template>
  <div>
    <h2 class="text-4xl text-center font-bold pb-10">
      Log In to <RouterLink to="/" class="text-white/50">FormJAM</RouterLink>
    </h2>

    <div class="flex flex-col gap-y-2">
      <TextInput name="email" id="login_email" type="text" placeholder="Email">
        <label for="login_email" class="pb-1">Email</label>
      </TextInput>

      <TextInput
        name="password"
        id="login_password"
        type="password"
        placeholder="Password"
      >
        <label for="login_password" class="pb-1">Password</label>
      </TextInput>

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
