<script lang="ts" setup>
import { ref } from "vue";
import { useField } from "vee-validate";
import type { ValidatedInputPropType } from "@/types/inputs";

import IconEyeClose from "@/components/icons/input/EyeClose.vue";
import IconEyeOpen from "@/components/icons/input/EyeOpen.vue";
import IconAlert from "@/components/icons/misc/Alert.vue";

const props = withDefaults(defineProps<ValidatedInputPropType>(), {
  required: true,
});
const { value, errorMessage } = useField(() => {
  return props.name;
});

// password functions
const showPassword = ref(false);
function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <div>
    <div class="relative group">
      <label
        :for="id"
        class="absolute top-1.5 left-3 text-xs xs:text-sm tracking-wide z-10"
        :class="{
          'text-black/70 dark:text-white/70': errorMessage,
          'text-gray-900 dark:text-gray-100 group-hover:text-sky-500 group-focus-within:text-sky-500':
            !errorMessage,
        }"
        >{{ label }}</label
      >
      <input
        :id="id"
        :type="!showPassword && type === 'password' ? type : 'text'"
        :placeholder="placeholder"
        class="w-full bg-white/80 dark:bg-transparent hover:bg-white dark:hover:bg-black/20 pt-6 pb-3 text-black dark:text-white text-base xs:text-lg border outline-none group-focus-within:ring-4 rounded-lg"
        :class="{
          'border-red-500 group-focus-within:ring-red-500/30': errorMessage,
          'border-gray-300 dark:border-white/20 group-hover:border-sky-400 dark:group-hover:border-sky-500 group-focus-within:border-sky-400 dark:group-focus-within:border-sky-500 group-focus-within:ring-sky-500/20 dark:group-focus-within:ring-sky-500/30':
            !errorMessage,
          'px-3 py-3': type !== 'password',
          'pl-3 pr-10 py-3': type === 'password',
        }"
        v-model="value"
        :data-cy="dataCy"
        :required="required"
        :autocomplete="autocomplete"
      />

      <button
        v-if="type === 'password'"
        class="absolute bottom-3 right-1 px-1 py-0.5 text-sm text-black/80 dark:text-white/80 hover:text-sky-500 rounded-md"
        aria-label="Toggle Show Password"
        @click.prevent="toggleShowPassword"
      >
        <IconEyeClose
          v-show="!showPassword && type === 'password'"
          class="eye-icon w-6 h-6"
        />
        <IconEyeOpen
          v-show="showPassword && type === 'password'"
          class="eye-icon w-6 h-6"
        />
      </button>
    </div>
    <p
      v-if="errorMessage"
      class="flex items-center gap-x-1 pt-1.5 text-[15px] text-red-500 tracking-wider"
      :data-cy="`${dataCy}_error`"
    >
      <IconAlert class="w-5 h-5 flex-shrink-0" />
      <span class="text-sm text-black dark:text-white font-medium">
        {{ errorMessage }}
      </span>
    </p>
  </div>
</template>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #05051e inset;
}
</style>
