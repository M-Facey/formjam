<script lang="ts" setup>
import type { SanitizedFormType, FormGridEmitType } from "@/types/form";
import dayjs from "dayjs";

import CreateForm from "@/components/form/view/CreateForm.vue";
import FormItem from "@/components/form/view/FormItem.vue";

defineProps<{ forms: SanitizedFormType[] }>();
defineEmits<FormGridEmitType>();
</script>

<template>
  <div class="flex flex-col gap-2 pt-5">
    <CreateForm view="list" />
    <FormItem
      v-for="form in forms"
      :title="form.title"
      :last-edited="dayjs(form.updated).format('MMM DD, YYYY')"
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
