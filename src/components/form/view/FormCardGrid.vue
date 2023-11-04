<script lang="ts" setup>
import type { SanitizedFormType, FormGridEmitType } from "@/types/form";
import dayjs from "dayjs";

import FormCard from "@/components/form/view/FormCard.vue";
import CreateFormCard from "@/components/form/view/CreateFormCard.vue";

defineProps<{ forms: SanitizedFormType[] }>();
defineEmits<FormGridEmitType>();
</script>

<template>
  <div class="flex flex-wrap gap-3 pt-5">
    <CreateFormCard />
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
</template>
