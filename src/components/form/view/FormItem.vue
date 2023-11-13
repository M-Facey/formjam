<script lang="ts" setup>
import { ref, computed } from "vue";
import type { FormCardEmitType, FormItemPropType } from "@/types/form";

import IconDelete from "@/components/icons/controls/Delete.vue";
import IconForm from "@/components/icons/misc/Form.vue";
import IconDots from "@/components/icons/menu/Dots.vue";
import IconEdit from "@/components/icons/controls/Edit.vue";

const props = defineProps<FormItemPropType>();
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

const showMenu = ref(false);
function toggleShowMenu() {
  showMenu.value = !showMenu.value;
}
</script>

<template>
  <div
    class="w-full flex items-center hover:bg-sky-100 px-5 py-2.5 cursor-pointer rounded-full"
    @click="$emit('editForm')"
  >
    <div class="bg-sky-500 p-1.5 rounded-lg">
      <IconForm class="w-6 h-6 text-white" />
    </div>
    <div class="flex flex-wrap items-center justify-between flex-grow ml-3">
      <div ref="titleElem" class="hidden" v-html="title"></div>
      <p
        class="w-full max-w-[150px] sm:max-w-[300px] font-medium truncate"
        v-html="unformattedTitle"
      ></p>

      <p class="text-sm sm:text-base">
        <span class="hidden sm:inline">Last opened: </span>{{ lastEdited }}
      </p>
    </div>

    <div class="relative flex-shrink-0 ml-20" @click.stop="toggleShowMenu">
      <button class="hover:bg-black/10 p-1 rounded-full">
        <IconDots class="w-[24px] h-[24px]" />
      </button>

      <div
        v-if="showMenu"
        class="absolute top-full right-0 translate-y-1 flex flex-col gap-y-1 bg-slate-200 px-3 py-2 rounded-lg z-50"
      >
        <button class="flex items-center gap-2" @click="$emit('deleteForm')">
          <IconDelete class="w-5 h-5" />
          <p>Delete</p>
        </button>
        <button class="flex items-center gap-2">
          <IconEdit class="w-5 h-5" />
          <p>Rename</p>
        </button>
      </div>
    </div>
  </div>
</template>
