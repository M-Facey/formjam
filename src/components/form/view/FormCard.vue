<script lang="ts" setup>
import { computed, ref } from "vue";
import type { FormCardPropType, FormCardEmitType } from "@/types/form";
import { lteTablet } from "@/utils/breakpoints";

import IconDots from "@/components/icons/menu/Dots.vue";
import IconDelete from "@/components/icons/controls/Delete.vue";
import IconEdit from "@/components/icons/controls/Edit.vue";
import IconShareLink from "@/components/icons/controls/ShareLink.vue";

// prime vue components
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Menu from "primevue/menu";

const props = defineProps<FormCardPropType>();
const emits = defineEmits<FormCardEmitType>();

const menu = ref();
const menuItems = ref([
  {
    label: "Delete",
    command: () => {
      openDialog();
    },
  },
  { label: "Rename", disabled: true },
]);

function toggle(event: Event) {
  menu.value.toggle(event);
}

const confirm = useConfirm();
const toast = useToast();

function openDialog() {
  confirm.require({
    message: "Are you sure you want to delete the form?",
    header: "Delete the Form",
    accept: () => {
      emits("deleteForm");
      toast.add({
        severity: "success",
        summary: "Form Deleted",
        detail: "Form was successfully deleted from the database",
        life: 2000,
      });
      confirm.close();
    },
    reject: () => {
      confirm.close();
    },
  });
}

// ** Dev note **
// Since the title in rich text, I decided to rendered the rich text
// in a hidden element, and extract it using `textContent` property.
// A ref was used to avoid having to create custom ids
const titleElem = ref<HTMLDivElement>();
const unformattedTitle = computed(() => {
  if (titleElem.value === undefined) return props.title;
  return titleElem.value.textContent;
});
</script>

<template>
  <div
    class="flex flex-col flex-stretch w-full border border-sky-100 dark:border-neutral-600 hover:border-sky-500 dark:hover:border-sky-500 rounded-[11px]"
    :class="{
      'cursor-default': lteTablet,
      'cursor-pointer': !lteTablet,
    }"
    data-cy="form_card"
    @click="!lteTablet && $emit('editForm')"
  >
    <div class="relative h-[130px] bg-sky-400 dark:bg-neutral-700 rounded-t-[10px]">
      <button
        v-if="lteTablet"
        class="absolute top-2 right-2 p-2 bg-black/40 rounded-lg"
        v-tooltip.left="`Edit form`"
        @click="$emit('editForm')"
      >
        <IconShareLink class="w-6 h-6 text-white" />
      </button>
    </div>

    <div class="relative bg-transparent dark:bg-sky-500 py-2 px-2 rounded-b-[10px]">
      <p class="pr-10 dark:text-black text-lg font-medium truncate" v-html="unformattedTitle"></p>
      <div ref="titleElem" class="hidden" v-html="title"></div>
      <p class="text-sm text-gray-600 mt-auto pb-2">
        Last edited:
        <span class="text-black font-medium">{{ lastEdited }}</span>
      </p>

      <div class="absolute top-2 right-2" @click.stop="toggle">
        <button
          aria-haspopup="true"
          aria-controls="overlay_menu"
          aria-label="Form card dropdown menu"
          class="p-1 bg-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-700 rounded-md"
          data-cy="form_card_dropdown"
        >
          <IconDots class="w-5 h-5" />
        </button>

        <Menu ref="menu" :model="menuItems" id="overlay_menu" :popup="true">
          <template #item="{ item }">
            <div class="flex items-center gap-x-3 px-5 py-2">
              <IconDelete
                v-if="item.label === 'Delete'"
                class="w-6 h-6 text-red-500"
              />
              <IconEdit v-if="item.label === 'Rename'" class="w-6 h-6" />
              {{ item.label }}
            </div>
          </template>
        </Menu>
      </div>
    </div>
  </div>
</template>
