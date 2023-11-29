<script lang="ts" setup>
import type { SanitizedFormType, FormGridEmitType } from "@/types/form";
import dayjs from "dayjs";

import FormCard from "@/components/form/view/FormCard.vue";
import CreateForm from "@/components/form/view/CreateForm.vue";
import FormCardLoader from "@/components/form/view/FormCardLoader.vue";

defineProps<{ forms: SanitizedFormType[]; isLoading: boolean }>();
defineEmits<FormGridEmitType>();
</script>

<template>
  <div v-if="!isLoading" class="custom-grid gap-3 pt-5">
    <CreateForm view="grid" />
    <FormCard
      v-for="form in forms"
      :title="form.title"
      :description="form.description"
      :last-edited="dayjs(form.updated).format('MMM DD, YYYY')"
      :created-at="form.created"
      @delete-form="
        () =>
          $emit('trigger-event', { id: form.id, name: 'delete', value: null })
      "
      @edit-form="
        () => $emit('trigger-event', { id: form.id, name: 'edit', value: null })
      "
    />
  </div>

  <div v-else class="custom-grid gap-3 pt-5">
    <CreateForm view="grid" />
    <FormCardLoader v-for="_ in 5" />
  </div>
</template>

<style scoped>
.custom-grid {
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  grid-auto-rows: auto auto;
}
</style>
