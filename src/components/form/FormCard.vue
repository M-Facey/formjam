<script lang="ts" setup>
import type { FormPropType } from "../../types/form";
defineProps<FormPropType>();
</script>

<template>
  <div
    class="flex-stretch w-[241px] border border-sky-100 hover:border-sky-500 rounded-md overflow-hidden cursor-pointer"
  >
    <div class="h-[130px] bg-sky-400"></div>

    <div class="py-2 px-2">
      <p>{{ name }}</p>
      <p class="text-sm font-medium">Edited: {{ lastEdited }}</p>
    </div>
  </div>
</template>
