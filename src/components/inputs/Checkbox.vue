<script lang="ts" setup>
import IconCheck from "../icons/Check.vue";
import { CheckboxPropType, CheckboxEmitType } from "../../types/inputs";

withDefaults(defineProps<CheckboxPropType>(), {
  id: "",
});
defineEmits<CheckboxEmitType>();
</script>

<template>
  <div class="flex items-center gap-x-3">
    <label
      class="relative w-6 h-6 flex items-center justify-center hover:bg-neutral-300/20 ring-2 ring-neutral-600 rounded-md"
    >
      <input
        :id="id"
        type="checkbox"
        class="invisible peer"
        :value="modelValue"
        @click="$emit('update:modelValue', !modelValue)"
      />
      <IconCheck
        class="icon-check absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 opacity-0 peer-checked:opacity-100"
      />
    </label>

    <label :for="id" class="select-none cursor-pointer">{{ text }}</label>
  </div>
</template>
