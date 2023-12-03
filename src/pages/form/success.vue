<script lang="ts" setup>
import { useRoute } from "vue-router";
import IconSuccess from "@/components/icons/misc/Success.vue";
import { computed } from "vue";

const route = useRoute();

const query = computed(() => {
  if (route.query.preview) {
    return route.query;
  }

  return {
    ...route.query,
    new: "true",
  };
});
</script>

<template>
  <div class="flex flex-col items-center pt-16">
    <IconSuccess class="w-24 h-24" />
    <h1 class="py-2 text-2xl font-medium">Response Saved.</h1>
    <p>You submitted the form successfully.</p>
    <RouterLink
      :to="{
        path: `/form/${route.params.formId}/view`,
        query: query,
      }"
      class="underline"
    >
      Submit another response
    </RouterLink>
  </div>
</template>
