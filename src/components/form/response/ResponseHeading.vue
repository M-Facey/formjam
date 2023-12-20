<script lang="ts" setup>
import { ref } from "vue";
import { useSettingsStore } from "@/store/settings";
import XToggle from "@/components/inputs/Toggle.vue";

const settingsStore = useSettingsStore();

const acceptingResponse = ref(true);
const responseCategory = ref(["Summary", "Question", "Individual"]);
function setSection(category: string) {
  settingsStore.formSections.responseSection = category;
}
</script>

<template>
  <div class="rounded-xl overflow-hidden">
    <div
      class="w-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-between p-6"
    >
      <h1 class="text-3xl dark:text-white font-semibold">0 Response</h1>
      <XToggle
        label="Accepting Responses"
        id="accepting-responses"
        v-model="acceptingResponse"
      />
    </div>
    <div
      class="relative flex py-3 bg-sky-100 dark:bg-neutral-700 border-t border-sky-200 dark:border-sky-500"
    >
      <div
        class="flex items-end h-full text-neutral-600 dark:text-white mx-auto"
      >
        <button
          v-for="category in responseCategory"
          class="w-[120px] font-medium tracking-wide"
          :class="{
            'text-sky-500':
              settingsStore.formSections.responseSection === category,
          }"
          @click="setSection(category)"
        >
          {{ category }}
        </button>
        <div
          class="absolute bottom-0 flex justify-center w-[120px] transition duration-75"
          :class="{
            'translate-x-0':
              settingsStore.formSections.responseSection === 'Summary',
            'translate-x-full':
              settingsStore.formSections.responseSection === 'Question',
            'translate-x-[200%]':
              settingsStore.formSections.responseSection === 'Individual',
          }"
        >
          <div class="w-2/3 h-1.5 bg-sky-500 rounded-t-md"></div>
        </div>
      </div>
    </div>
  </div>
</template>
