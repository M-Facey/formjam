<script lang="ts" setup>
import IconAdd from "@/components/icons/controls/Add.vue";
import IconSection from "@/components/icons/controls/PageBreak.vue";

defineEmits<{ (e: "add:question"): void }>();
</script>

<template>
  <div
    class="w-14 h-min flex flex-col gap-4 items-center bg-gray-100 py-4 rounded-lg"
  >
    <button v-tooltip="'Add New Question'" @click="$emit('add:question')">
      <IconAdd class="w-6 h-6 text-black" />
    </button>

    <button>
      <IconSection class="w-6 h-6 text-black" />
    </button>
  </div>
</template>
