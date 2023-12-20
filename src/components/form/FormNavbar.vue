<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import IconEyeOpen from "@/components/icons/input/EyeOpen.vue";
import ThemeToggle from "@/components/common/ThemeToggle.vue";

const route = useRoute();

const currentSection = ref("Questions");
function setSection(section: string) {
  currentSection.value = section;
}
</script>

<template>
  <header class="relative bg-neutral-100 dark:bg-neutral-800">
    <div class="container h-[66px] flex items-center justify-between mx-6 py-3">
      <RouterLink to="/" class="flex items-center gap-x-2">
        <img src="@/assets/images/logo.png" alt="logo" class="max-h-[40px]" />
        <p class="text-2xl text-neutral-700 dark:text-white">
          Form<span class="text-neutral-400 font-bold">JAM</span>
        </p>
      </RouterLink>

      <ThemeToggle class="ml-auto mr-3" />
      <RouterLink
        v-if="route.name === 'EditForm'"
        :to="`/form/${route.params.formId}/preview`"
      >
        <button
          title="View Form"
          class="custom-btn flex gap-x-2 p-2 rounded-lg"
          data-cy="preview_btn"
        >
          <IconEyeOpen class="w-6 h-6 sm:mr-1" />
          <span class="hidden sm:block"> Preview </span>
        </button>
      </RouterLink>
    </div>
    <div
      v-if="route.name === 'EditForm'"
      class="flex py-3 bg-sky-100 dark:bg-neutral-700 border-y border-sky-200 dark:border-sky-500"
    >
      <div
        class="flex items-end h-full text-neutral-600 dark:text-white mx-auto"
      >
        <button
          class="w-[120px] font-medium tracking-wide"
          :class="{ 'text-sky-500': currentSection === 'Questions' }"
          @click="setSection('Questions')"
        >
          Questions
        </button>
        <button
          class="w-[120px] font-medium tracking-wide"
          :class="{ 'text-sky-500': currentSection === 'Responses' }"
          @click="setSection('Responses')"
        >
          Responses
        </button>
        <div
          class="absolute bottom-0 flex justify-center w-[120px] transition duration-75"
          :class="{
            'translate-x-full': currentSection === 'Responses',
            'translate-x-0': currentSection === 'Questions',
          }"
        >
          <div class="w-2/3 h-1.5 bg-sky-500 rounded-t-md"></div>
        </div>
      </div>
    </div>
  </header>
</template>
