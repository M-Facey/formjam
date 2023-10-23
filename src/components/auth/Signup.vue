<script lang="ts" setup>
import { ref, computed } from "vue";
import { FormError } from "../../types/form";
import XTextInput from "../inputs/TextInput.vue";
import XButton from "../inputs/Button.vue";
import FormErrorMessage from "../form/FormErrorMessage.vue";

import pb from "../../db/pocketBase";
import { useRouter } from "vue-router";

import { useForm } from "vee-validate";
import * as yup from "yup";

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
      .min(8, "Your password must contain at least 8 characters")
      .max(25, "Your password must contain at most 25 characters"),
    confirmPassword: yup
      .string()
      .required()
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
const submitForm = handleSubmit(
  async ({ email, password, confirmPassword }) => {
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
  }
);

// error message functions
const hasErrorMessage = computed(() => {
  return errorMessage.value !== "";
});
const errorMessage = ref("");
const errorTimoutId = ref(-1);
function resetErrorMessage() {
  errorTimoutId.value = setTimeout(() => {
    errorMessage.value = "";
  }, 10000);
}

function closeErrorMessage() {
  clearTimeout(errorTimoutId.value);
  errorMessage.value = "";
}
</script>

<template>
  <div>
    <h2 class="text-4xl text-center font-bold pb-10">
      Sign Up to <RouterLink to="/" class="text-white/70">FormJAM</RouterLink>
    </h2>

    <div class="flex flex-col gap-y-2">
      <FormErrorMessage
        v-if="hasErrorMessage"
        :message="errorMessage"
        @close-error-message="closeErrorMessage"
      />
      <XTextInput
        id="signup_firstname"
        name="firstName"
        type="text"
        placeholder="First Name"
      >
        <label for="signup_firstname" class="pb-1">First Name</label>
      </XTextInput>
      <XTextInput
        id="signup_lastname"
        name="lastName"
        type="text"
        placeholder="Last Name"
      >
        <label for="signup_lastname" class="pb-1">Last Name</label>
      </XTextInput>

      <XTextInput
        id="signup_email"
        name="email"
        type="text"
        placeholder="Email"
      >
        <label for="signup_email" class="pb-1">Email</label>
      </XTextInput>

      <XTextInput
        id="signup_pasxsword"
        name="password"
        type="password"
        placeholder="Password"
        max="25"
      >
        <label for="signup_password" class="pb-1">Password</label>
      </XTextInput>

      <XTextInput
        id="signup_confirm_password"
        name="confirmPassword"
        type="password"
        placeholder="Password"
      >
        <label for="signup_confirm_password" class="pb-1"
          >Confirm Password</label
        >
      </XTextInput>

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
