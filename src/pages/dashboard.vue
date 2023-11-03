<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { SanitizedFormType, FormCardEvent } from "@/types/form";
import { useFormStore } from "@/store/forms";

import FilterTab from "@/components/dashboard/FilterTab.vue";
import FormCardGrid from "@/components/form/view/FormCardGrid.vue";

const router = useRouter();
const formStore = useFormStore();

const sanitizedForms = computed<SanitizedFormType[]>(() => {
  if (!formStore.forms) return [];

  return formStore.forms.map((form) => {
    // remove unused & sensitive data
    const { collectionId, collectionName, user, ...rest } = form;
    return rest;
  });
});

async function executeEvent(event: FormCardEvent) {
  if (event.name === "delete") {
    await formStore.deleteForm(event.id);
  } else if (event.name === "edit") {
    router.push({ name: "EditForm", params: { formId: event.id } });
  }
}

onMounted(async () => {
  formStore.fetchForms();
});
</script>

<template>
  <div class="pt-7 px-5">
    <div class="container">
      <FilterTab />

      <FormCardGrid :forms="sanitizedForms" @trigger-event="executeEvent" />
    </div>
  </div>
</template>
