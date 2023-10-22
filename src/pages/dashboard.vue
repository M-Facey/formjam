<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import type { FormType, SanitizedFormType, FormCardEvent } from "../types/form";
import pb from "../db/pocketBase";

import FilterTab from "../components/dashboard/FilterTab.vue";
import FormCardGrid from "../components/form/FormCardGrid.vue";
import router from "../router";

const forms = ref<FormType[]>();
const sanitizedForms = computed<SanitizedFormType[]>(() => {
  if (!forms.value) return [];

  return forms.value.map((form) => {
    // remove unused & sensitive data
    const { collectionId, collectionName, user, ...rest } = form;
    return rest;
  });
});

async function executeEvent(event: FormCardEvent) {
  if (event.name === "delete") {
    await pb.collection("forms").delete(event.id);
    forms.value = await pb
      .collection("forms")
      .getFullList({ sort: "-created" });
  } else if (event.name === "edit") {
    router.push({ name: "EditForm", params: { formId: event.id } });
  }
}

onMounted(async () => {
  forms.value = await pb.collection("forms").getFullList({ sort: "-created" });
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
