<script lang="ts" setup>
import { ref } from "vue";
import type { FormCardEmitType, FormItemPropType } from "@/types/form";

import IconDelete from "@/components/icons/controls/Delete.vue";
import IconForm from "@/components/icons/misc/Form.vue";
import IconDots from "@/components/icons/menu/Dots.vue";
import IconEdit from "@/components/icons/controls/Edit.vue";

defineProps<FormItemPropType>();
defineEmits<FormCardEmitType>();

const showMenu = ref(false);
function toggleShowMenu() {
  showMenu.value = !showMenu.value;
}
</script>

<template>
  <div
    class="w-full flex items-center justify-between hover:bg-sky-100 px-5 py-2.5 cursor-pointer rounded-full"
    @click="$emit('editForm')"
  >
    <div class="flex items-center gap-x-5">
      <div class="bg-sky-500 p-1.5 rounded-lg">
        <IconForm class="w-6 h-6 text-white" />
      </div>

      <p class="text-lg font-medium">{{ title }}</p>
    </div>

    <p>Last opened: {{ lastEdited }}</p>

    <div class="relative" @click.stop="toggleShowMenu">
      <button class="hover:bg-black/10 p-1 rounded-full">
        <IconDots class="w-[24px] h-[24px]" />
      </button>

      <div
        v-if="showMenu"
        class="absolute top-full translate-y-1 flex flex-col gap-y-1 bg-slate-200 px-3 py-2 rounded-lg z-50"
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
