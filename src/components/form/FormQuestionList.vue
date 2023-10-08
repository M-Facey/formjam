<script lang="ts" setup>
import FormQuestion from "./FormQuestion.vue";
</script>
<template>
  <div class="flex flex-col gap-y-3">
    <FormQuestion v-for="_ in 5" />
  </div>
</template>
