<script lang="ts" setup>
import type { TogglePropType, CheckboxEmitType } from "@/types/inputs";

defineProps<TogglePropType>();
defineEmits<CheckboxEmitType>();
</script>

<template>
  <div class="flex items-center gap-x-3">
    <label class="relative w-[60px] h-[34px]">
      <input
        :id="id"
        type="checkbox"
        class="invisible peer"
        :value="modelValue"
        @input="$emit('update:modelValue', !modelValue)"
      />
      <span
        class="slider absolute inset-0 bg-gray-200 peer-checked:bg-sky-500 transition duration-75 cursor-pointer"
      ></span>
    </label>

    <label :for="id" class="select-none">{{ label }}</label>
  </div>
</template>

<style scoped>
.slider:before {
  content: "";
  @apply absolute left-[4px] bottom-[4px] h-[26px] w-[26px] bg-white transition duration-75;
}

input:checked + .slider:before {
  @apply translate-x-[26px];
}
</style>
