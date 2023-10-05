<script lang="ts" setup>
import IconCheck from "../icons/Check.vue";
import { CheckboxPropType, CheckboxEmitType } from "../../types/inputs";

defineProps<CheckboxPropType>();
defineEmits<CheckboxEmitType>();
</script>

<template>
  <div
    class="w-fit flex items-center gap-x-2 cursor-pointer"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <div
      class="w-7 h-7 flex items-center justify-center hover:bg-neutral-300/20 border-2 border-neutral-600 rounded-md"
    >
      <IconCheck v-if="modelValue" class="icon-check w-5 h-5" />
    </div>
    <p class="select-none">{{ text }}</p>
  </div>
</template>

<style>
.icon-check {
  stroke-width: 2px;
}
</style>
