<script lang="ts" setup>
import { ref } from "vue";
import type { FormCardPropType, FormCardEmitType } from "../../types/form";

import IconDots from "../icons/Dots.vue";
import IconDelete from "../icons/Delete.vue";
import IconEdit from "../icons/Edit.vue";

defineProps<FormCardPropType>();
defineEmits<FormCardEmitType>();

const showFormDropdown = ref(false);
function toggleFormDropdown() {
  showFormDropdown.value = !showFormDropdown.value;
}
</script>

<template>
  <div
    class="flex flex-col flex-stretch w-[241px] border border-sky-100 hover:border-sky-500 rounded-md cursor-pointer"
    @click="$emit('editForm')"
  >
    <div class="h-[130px] bg-sky-400"></div>

    <div class="relative py-2 px-2">
      <p class="font-medium">{{ title }}</p>
      <p class="text-sm text-gray-600 mt-auto py-2">
        Last edited:
        <span class="text-black font-medium">{{ lastEdited }}</span>
      </p>

      <div class="absolute top-3 right-3" @click.stop="toggleFormDropdown">
        <button class="p-1 bg-gray-200 rounded">
          <IconDots class="w-4 h-4" />
        </button>

        <div
          v-if="showFormDropdown"
          class="absolute top-full translate-y-3 right-0 w-[140px] flex flex-col bg-white py-1 border border-gray-200 rounded"
        >
          <button
            class="flex items-center gap-x-2 hover:bg-gray-200 p-1.5"
            @click="$emit('deleteForm')"
          >
            <IconDelete class="w-5 h-5" />
            <p>Delete</p>
          </button>
          <button class="flex items-center gap-x-2 hover:bg-gray-200 p-1.5">
            <IconEdit class="w-5 h-5" />
            <p>Rename</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
