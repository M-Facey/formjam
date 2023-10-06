<script lang="ts" setup>
import { ButtonPropType, ButtonEmitType } from "../../types/inputs";
import Loader from "../anim/Loader.vue";

withDefaults(defineProps<ButtonPropType>(), {
  hasIcon: false,
  align: "left",
  size: "compact",
  reverseOrder: false,
});
defineEmits<ButtonEmitType>();
</script>

<template>
  <button @click="$emit('triggerEvent')">
    <div
      v-if="!loading"
      class="flex items-center bg-sky-500 hover:bg-sky-400 px-3 py-2 text-neutral-900 rounded"
      :class="{
        'w-fit': size === 'compact',
        'w-full': size === 'expand',
        'justify-start': align === 'left',
        'justify-end': align === 'right',
        'justify-center': align === 'center',
        'flex-row-reverse': reverseOrder,
      }"
    >
      <slot name="icon" />
      <p v-if="text">
        {{ text }}
      </p>
    </div>
    <Loader v-else class="mx-auto" />
  </button>
</template>
