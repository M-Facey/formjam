<script lang="ts" setup>
import { ref } from "vue";
import TextInput from "../inputs/TextInput.vue";
import XButton from "../inputs/Button.vue";

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
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
      Sign Up to <RouterLink to="/" class="text-white/70">FormJAM</RouterLink>
    </h2>

    <div class="flex flex-col gap-y-2">
      <TextInput
        id="signup_firstname"
        type="text"
        placeholder="First Name"
        v-model="form.firstName"
      >
        <label for="signup_firstname" class="pb-1">First Name</label>
      </TextInput>
      <TextInput
        id="signup_lastname"
        type="text"
        placeholder="Last Name"
        v-model="form.lastName"
      >
        <label for="signup_lastname" class="pb-1">Last Name</label>
      </TextInput>
      <TextInput
        id="signup_email"
        type="text"
        placeholder="Email"
        v-model="form.email"
      >
        <label for="signup_email" class="pb-1">Email</label>
      </TextInput>

      <TextInput
        id="signup_password"
        type="password"
        placeholder="Password"
        v-model="form.password"
      >
        <label for="signup_password" class="pb-1">Password</label>
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
