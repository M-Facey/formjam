<script lang="ts" setup>
import type { SanitizedFormType, FormGridEmitType } from "@/types/form";
import dayjs from "dayjs";
import { useFormStore } from "@/store/forms";

import CreateForm from "@/components/form/view/CreateForm.vue";
import FormItem from "@/components/form/view/FormItem.vue";

defineProps<{ forms: SanitizedFormType[] }>();
defineEmits<FormGridEmitType>();

const formStore = useFormStore();
</script>

<template>
  <div class="flex flex-col gap-2 pt-5">
    <CreateForm view="list" />
    <FormItem
      v-for="form in forms"
      :title="form.title"
      :last-edited="dayjs(form.updated).format('MMM DD, YYYY')"
      :select-mode="formStore.selectedForms.length > 0"
      :is-selected="formStore.isSelected(form.id)"
      @delete-form="
        () =>
          $emit('trigger-event', { id: form.id, name: 'delete', value: null })
      "
      @edit-form="
        () => $emit('trigger-event', { id: form.id, name: 'edit', value: null })
      "
      @select-form="
        () =>
          $emit('trigger-event', { id: form.id, name: 'select', value: null })
      "
    />
  </div>
</template>
