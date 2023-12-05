<script lang="ts" setup>
import { ref } from "vue";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm.vue";
import ChangePassword from "@/components/profile/ChangePassword.vue";
import Checkbox from "@/components/inputs/Checkbox.vue";

import IconArrowDown from "@/components/icons/controls/ArrowDown.vue";
import IconAlert from "@/components/icons/misc/Alert.vue";
import IconDelete from "@/components/icons/controls/Delete.vue";

const readDeleteInfo = ref(false);
</script>

<template>
  <div class="pt-10 px-5">
    <div class="w-full max-w-[1000px] mx-auto">
      <RouterLink
        to="/"
        class="custom-btn w-fit flex items-center gap-x-2 mb-7 pr-5 text-sky-900 font-medium p-2 rounded-md"
      >
        <IconArrowDown class="w-6 h-6 rotate-90" />
        Go Back to Home
      </RouterLink>

      <PersonalInfoForm />
      <ChangePassword />

      <section class="border-t border-neutral-600 mt-5 pt-7">
        <h2
          class="mb-2 dark:text-neutral-400 text-lg font-medium tracking-widest uppercase"
        >
          Delete your account
        </h2>
        <div class="flex flex-col md:flex-row items-end md:items-center gap-x-4">
          <div class="bg-neutral-900 flex gap-x-2 mb-4 p-3 rounded-md">
            <IconAlert class="w-6 h-6 flex-shrink-0 text-orange-500" />
            <div>
              <p class="pb-3">
                <strong>Please note:</strong> Once this is done, there is no way
                to undo it. So you need to ensure that you are certain you want
                to do it by checking the box below.
              </p>

              <Checkbox
                id="profile_read_delete_info"
                text="I have read the information above"
                v-model="readDeleteInfo"
                data-cy="profile_read_delete_info"
              />
            </div>
          </div>
          <button
            class="w-full sm:w-fit bg-gradient-to-b from-red-500 to-rose-700 disabled:from-gray-100 disabled:to-neutral-400 border border-red-500 disabled:border-gray-100 flex-shrink-0 flex items-center justify-center gap-x-2 mb-5 pr-3 text-white disabled:text-gray-500 font-medium p-2 rounded-lg shadow-lg shadow-rose-900 disabled:shadow-neutral-600"
            :disabled="!readDeleteInfo"
            >
            <IconDelete class="w-6 h-6" />
            Delete Your Account
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
