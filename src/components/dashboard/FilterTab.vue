<script lang="ts" setup>
import { ref } from "vue";

import XDropdown from "../inputs/Dropdown.vue";
import XButton from "../inputs/Button.vue";

import IconGrid from "../icons/Grid.vue";

const sortOptions = ref([
  { name: "Last Opened", value: "last_opened" },
  { name: "Title", value: "title" },
]);
</script>

<template>
  <div class="flex items-center">
    <p class="text-xl">Recent Forms</p>

    <div class="flex gap-x-3 ml-auto">
      <div class="">
        <p class="pb-1 text-xs uppercase tracking-widest select-none">Layout</p>

        <XButton text="Grid View" has-icon class="font-medium">
          <template #icon>
            <IconGrid class="w-5 h-5 mr-3" />
          </template>
        </XButton>
      </div>

      <div class="w-fit">
        <p class="pb-1 text-xs uppercase tracking-widest select-none">
          Sort by
        </p>
        <XDropdown :select-option="sortOptions[0]" :options="sortOptions" />
      </div>
    </div>
  </div>
</template>
