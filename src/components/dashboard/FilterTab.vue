<script lang="ts" setup>
import { ref } from "vue";
import type { DropdownOption } from "@/types/inputs";

import XDropdown from "@/components/inputs/Dropdown.vue";
import IconGrid from "@/components/icons/layout/Grid.vue";
import IconList from "@/components/icons/layout/List.vue";

defineProps<{ view: string }>();
defineEmits<{ (e: "setView"): void }>();

const sortOptions = ref([
  { name: "Last Opened", value: "last_opened" },
  { name: "Title", value: "title" },
]);
const currentSortOption = ref<DropdownOption>(sortOptions.value[0]);
</script>

<template>
  <div class="flex items-center">
    <p class="text-xl">Recent Forms</p>

    <div class="flex gap-x-3 ml-auto">
      <div class="">
        <p class="pb-1 text-xs uppercase tracking-widest select-none">Layout</p>

        <button
          class="w-[127px] custom-btn flex items-center justify-between px-3 py-1.5 select-none cursor-pointer rounded-md"
          @click="$emit('setView')"
        >
          <IconGrid v-show="view === 'Grid'" class="w-5 h-5 mr-2" />
          <IconList v-show="view === 'List'" class="w-5 h-5 mr-2" />
          <p>{{ view }} View</p>
        </button>
      </div>

      <div class="w-fit">
        <p class="pb-1 text-xs uppercase tracking-widest select-none">
          Sort by
        </p>
        <XDropdown v-model="currentSortOption" :options="sortOptions" />
      </div>
    </div>
  </div>
</template>
