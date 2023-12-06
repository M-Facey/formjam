<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { SanitizedFormType, FormCardEvent } from "@/types/form";
import { useFormStore } from "@/store/forms";

import FilterTab from "@/components/dashboard/FilterTab.vue";
import FormCardGrid from "@/components/form/view/FormCardGrid.vue";
import FormList from "@/components/form/view/FormList.vue";

const router = useRouter();
const route = useRoute();
const formStore = useFormStore();

const isLoading = ref(false);

const sanitizedForms = computed<SanitizedFormType[]>(() => {
  if (!formStore.forms) return [];

  return formStore.getFilteredForms.map((form) => {
    // remove unused & sensitive data
    const { collectionId, collectionName, user, ...rest } = form;
    return rest;
  });
});

async function executeEvent(event: FormCardEvent) {
  if (event.name === "delete") {
    isLoading.value = true;
    await formStore.deleteForm(event.id);
    isLoading.value = false;
  } else if (event.name === "edit") {
    router.push({ name: "EditForm", params: { formId: event.id } });
  }
}

const currentView = ref("Grid");
function toggleView() {
  currentView.value = currentView.value === "Grid" ? "List" : "Grid";
}

onMounted(async () => {
  isLoading.value = true;
  await formStore.fetchForms();
  if(route.query.search) {
    formStore.searchTerm = route.query.search as string;
  }
  isLoading.value = false;
});
</script>

<template>
  <div class="pt-7 px-5">
    <div class="container">
      <FilterTab :view="currentView" @set-view="toggleView" />

      <FormCardGrid
        v-if="currentView === 'Grid'"
        :forms="sanitizedForms"
        :is-loading="isLoading"
        @trigger-event="executeEvent"
      />
      <FormList v-else :forms="sanitizedForms" @trigger-event="executeEvent" />
    </div>
  </div>
</template>
