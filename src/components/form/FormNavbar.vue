<script lang="ts" setup>
import { ref } from "vue";
import XButton from "../inputs/Button.vue";
import IconEyeOpen from "../icons/EyeOpen.vue";

const currentSection = ref("Questions");
function setSection(section: string) {
  currentSection.value = section;
}
</script>

<template>
  <header class="relative bg-neutral-100 border-b border-neutral-200 px-6 py-3">
    <div class="container flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-x-2">
        <img src="../../assets/vue.svg" class="max-h-[30px]" />
        <p class="text-2xl text-neutral-700">
          Form<span class="text-neutral-400 font-bold">JAM</span>
        </p>
      </RouterLink>

      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 flex items-end h-full text-neutral-600"
      >
        <button
          class="w-[120px] pb-3 font-medium tracking-wide"
          :class="{ 'text-sky-500': currentSection === 'Questions' }"
          @click="setSection('Questions')"
        >
          Questions
        </button>
        <button
          class="w-[120px] pb-3 font-medium tracking-wide"
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
          <div class="w-2/3 h-[3px] bg-sky-500 rounded-t-md"></div>
        </div>
      </div>

      <div class="flex gap-x-2">
        <XButton text="Preview">
          <template #icon>
            <IconEyeOpen class="w-6 h-6 mr-1" />
          </template>
        </XButton>
      </div>
    </div>
  </header>
</template>
