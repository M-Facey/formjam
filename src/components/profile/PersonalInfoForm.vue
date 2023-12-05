<script lang="ts" setup>
import XTextInput from "@/components/inputs/ValidatedTextInput.vue";
</script>
<template>
  <form id="personal_form_form" class="flex flex-col">
    <h2 class="mb-2 dark:text-neutral-400 text-lg font-medium tracking-widest uppercase">
      Personal Information
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <XTextInput
        id="profile_firstname"
        type="text"
        name="firstName"
        label="First Name"
        data-cy="profile_firstname_input"
        autocomplete="given-name"
      />

      <XTextInput
        id="profile_lastname"
        type="text"
        name="lastName"
        label="Last Name"
        data-cy="profile_lastname_input"
        autocomplete="family-name"
      />

      <XTextInput
        id="profile_email"
        type="text"
        name="email"
        label="Email Address"
        data-cy="profile_email_input"
        autocomplete="email"
      />
    </div>

    <button class="custom-btn w-full sm:w-[200px] ml-auto p-2 mt-4 dark:text-neutral-800 font-medium rounded-md">
      Save Changes
    </button>
  </form>
</template>
