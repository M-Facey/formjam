<script lang="ts" setup>
import { ref } from "vue";
import { TextPropType, TextEmitType } from "../../types/inputs";

import IconEyeClose from "../icons/EyeClose.vue";
import IconEyeOpen from "../icons/EyeOpen.vue";

withDefaults(defineProps<TextPropType>(), {
  placeholder: "",
  isOptional: false,
});

defineEmits<TextEmitType>();

const showPassword = ref(false);
function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <div class="flex flex-col">
    <slot />
    <div class="w-[450px] relative">
      <input
        :id="id"
        :type="!showPassword && type === 'password' ? type : 'text'"
        :placeholder="placeholder"
        :value="modelValue"
        class="w-full px-4 py-3 text-black rounded-lg outline-none"
        :class="{
          'px-4 py-3': type !== 'password',
          'pl-4 pr-14 py-3': type === 'password',
        }"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
      <button
        v-if="type === 'password'"
        class="absolute top-1/2 right-2 -translate-y-1/2 bg-white hover:bg-gray-200 px-1 py-0.5 text-sm text-neutral-600 rounded-md"
        @click="toggleShowPassword"
      >
        <IconEyeClose
          v-show="showPassword && type === 'password'"
          class="eye-icon w-7 h-7"
        />
        <IconEyeOpen
          v-show="!showPassword && type === 'password'"
          class="eye-icon w-7 h-7"
        />
      </button>
    </div>
    <slot name="error-message" />
    <slot name="description" />
  </div>
</template>

<style>
.eye-icon {
  stroke-width: 1.5px;
}
</style>
