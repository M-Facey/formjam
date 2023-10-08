<script lang="ts" setup>
import FormCard from "./FormCard.vue";
</script>

<template>
  <div class="flex flex-wrap gap-3 pt-5">
    <FormCard
      v-for="_ in 10"
      name="Somethign"
      last-edited="Oct 12, 2023"
      created-at="Oct 01, 2023"
    />
  </div>
</template>
