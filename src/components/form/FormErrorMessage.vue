<script lang="ts" setup>
import type {
  ErrorMessagePropType,
  ErrorMessageEmitType,
} from "../../types/form";
import IconClose from "../icons/Close.vue";
import IconAlert from "../icons/Alert.vue";

defineProps<ErrorMessagePropType>();
defineEmits<ErrorMessageEmitType>();
</script>

<template>
  <div
    class="w-full flex items-center justify-between bg-red-500/20 border border-red-700 text-white font-medium tracking-wide p-3 rounded-lg"
  >
    <div class="flex items-center">
      <IconAlert class="w-7 h-7 text-red-500 mr-3" />
      <p>{{ message }}</p>
    </div>

    <button
      class="p-1 bg-transparent hover:bg-red-500/50 rounded"
      @click="$emit('closeErrorMessage')"
    >
      <IconClose class="w-6 h-6" />
    </button>
  </div>
</template>
