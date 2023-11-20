<script lang="ts" setup>
import { computed, ref } from "vue";
import type { FormCardPropType, FormCardEmitType } from "@/types/form";

import IconDots from "@/components/icons/menu/Dots.vue";
import IconDelete from "@/components/icons/controls/Delete.vue";
import IconEdit from "@/components/icons/controls/Edit.vue";

const props = defineProps<FormCardPropType>();
defineEmits<FormCardEmitType>();

// ** Dev note **
// Since the title in rich text, I decided to rendered the rich text
// in a hidden element, and extract it using `textContent` property.
// A ref was used to avoid having to create custom ids
const titleElem = ref<HTMLDivElement>();
const unformattedTitle = computed(() => {
  if (titleElem.value === undefined) return props.title;
  return titleElem.value.textContent;
});

const showFormDropdown = ref(false);
function toggleFormDropdown() {
  showFormDropdown.value = !showFormDropdown.value;
}
</script>

<template>
  <div
    class="flex flex-col flex-stretch w-full border border-sky-100 hover:border-sky-500 rounded-md cursor-pointer"
    data-cy="form_card"
    @click="$emit('editForm')"
  >
    <div class="h-[130px] bg-sky-400 rounded-t-[5px]"></div>

    <div class="relative py-2 px-2">
      <p class="pr-10 font-medium truncate" v-html="unformattedTitle"></p>
      <div ref="titleElem" class="hidden" v-html="title"></div>
      <p class="text-sm text-gray-600 mt-auto py-2">
        Last edited:
        <span class="text-black font-medium">{{ lastEdited }}</span>
      </p>

      <div class="absolute top-3 right-3" @click.stop="toggleFormDropdown">
        <button
          aria-label="Form card dropdown menu"
          class="p-1 bg-gray-200 rounded"
          data-cy="form_card_dropdown"
        >
          <IconDots class="w-4 h-4" />
        </button>

        <div
          v-if="showFormDropdown"
          class="absolute top-full translate-y-3 right-0 w-[140px] flex flex-col bg-white py-1 border border-gray-200 rounded"
        >
          <button
            aria-label="Form card delete button"
            class="flex items-center gap-x-2 hover:bg-gray-200 p-1.5"
            data-cy="form_card_delete_btn"
            @click="$emit('deleteForm')"
          >
            <IconDelete class="w-5 h-5" />
            <p>Delete</p>
          </button>
          <button
            aria-label="Form card rename button"
            class="flex items-center gap-x-2 hover:bg-gray-200 p-1.5"
            data-cy="form_card_rename_btn"
          >
            <IconEdit class="w-5 h-5" />
            <p>Rename</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
