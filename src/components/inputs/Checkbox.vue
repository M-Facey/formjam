<script lang="ts" setup>
import { CheckboxPropType, CheckboxEmitType } from "@/types/inputs";

import IconCheck from "@/components/icons/input/Check.vue";

withDefaults(defineProps<CheckboxPropType>(), {
  id: "",
});
defineEmits<CheckboxEmitType>();
</script>

<template>
  <div class="flex items-center gap-x-3">
    <label
      :for="id"
      class="relative w-6 h-6 flex items-center justify-center hover:bg-white dark:hover:bg-primary-dark-100/30 border border-gray-300 dark:border-primary-dark-100 cursor-pointer rounded-lg"
      :class="{ 'custom-btn': modelValue }"
    >
      <input
        :id="id"
        type="checkbox"
        class="invisible peer"
        :value="modelValue"
        @click="$emit('update:modelValue', !modelValue)"
      />
      <IconCheck
        class="icon-check absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-primary-dark-800 opacity-0 peer-checked:opacity-100"
      />
    </label>

    <label
      :for="id"
      class="text-black dark:text-white select-none cursor-pointer"
      >{{ text }}</label
    >
  </div>
</template>

<style>
.icon-check * {
  stroke-width: 3px;
}
</style>
