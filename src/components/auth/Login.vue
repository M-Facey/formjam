<script lang="ts" setup>
import { ref } from "vue";
import TextInput from "../inputs/TextInput.vue";
import XButton from "../inputs/Button.vue";
import XCheckbox from "../inputs/Checkbox.vue";

const form = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const loading = ref(false);
function submitForm() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}
</script>

<template>
  <div>
    <h2 class="text-4xl text-center font-bold pb-10">
      Log In to <RouterLink to="/" class="text-white/50">FormJAM</RouterLink>
    </h2>

    <div class="flex flex-col gap-y-2">
      <TextInput
        id="login_email"
        type="text"
        placeholder="Email"
        v-model="form.email"
      >
        <label for="login_email" class="pb-1">Email</label>
      </TextInput>

      <TextInput
        id="login_password"
        type="password"
        placeholder="Password"
        v-model="form.password"
      >
        <label for="login_password" class="pb-1">Password</label>
      </TextInput>

      <XCheckbox text="Remember me?" v-model="form.rememberMe" class="pt-3" />

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
            @trigger-event="submitForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>
