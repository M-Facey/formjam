<script lang="ts" setup>
import type { TogglePropType, CheckboxEmitType } from "@/types/inputs";

defineProps<TogglePropType>();
defineEmits<CheckboxEmitType>();
</script>

<template>
  <div class="flex items-center gap-x-3">
    <label :for="id" class="relative w-[41px] h-[24px]">
      <input
        :id="id"
        type="checkbox"
        class="opacity-0 peer"
        :value="modelValue"
        @click="$emit('update:modelValue', !modelValue)"
      />
      <div
        class="absolute inset-0 p-2 transition duration-75 cursor-pointer border border-transparent rounded-full"
        :class="{
          'bg-sky-400 hover:border-sky-700': modelValue,
          'bg-gray-200 hover:border-gray-400': !modelValue,
        }"
      >
        <div
          class="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white transition duration-75 rounded-full"
          :class="{
            'translate-x-3': modelValue,
            '-translate-x-1': !modelValue,
          }"
        ></div>
      </div>
    </label>

    <label :for="id" class="select-none">{{ label }}</label>
  </div>
</template>
