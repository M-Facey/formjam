<script lang="ts" setup>
import XTextInput from "@/components/inputs/ValidatedTextInput.vue";
import IconAlert from "@/components/icons/misc/Alert.vue";
</script>

<template>
  <form id="personal_form_form" class="mt-5 pt-7 border-t border-neutral-600">
    <h2
      class="mb-2 dark:text-neutral-400 text-lg font-medium tracking-widest uppercase"
    >
      Change Password
    </h2>
    <div class="bg-neutral-900 flex gap-x-2 mb-4 p-3 rounded-md">
      <IconAlert class="w-6 h-6 flex-shrink-0 text-orange-500" />
      <p>
        <strong>Please note:</strong> We recommend that you use a strong
        password, even if there is not much restriction on what password you can
        use.
      </p>
    </div>
    <div class="flex flex-col md:flex-row md:items-center gap-5">
      <div class="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
        <XTextInput
          id="profile_password"
          type="password"
          name="password"
          label="Current Password"
          data-cy="profile_password_input"
          autocomplete="new-password"
        />

        <XTextInput
          id="profile_confirm_password"
          type="password"
          name="confirmPassword"
          label="New Password"
          data-cy="profile_confirm_password_input"
          autocomplete="new-password"
        />
      </div>

      <button
        class="custom-btn w-full sm:w-[200px] ml-auto p-2 dark:text-neutral-800 font-medium rounded-md"
      >
        Change Password
      </button>
    </div>
  </form>
</template>
