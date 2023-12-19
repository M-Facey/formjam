<script lang="ts" setup>
import { useRoute } from "vue-router";
import FormQuestionList from "@/components/form/question/FormQuestionList.vue";

const route = useRoute();
</script>

<template>
  <div class="bg-white dark:bg-neutral-900 px-5 pt-5">
    <div class="w-full max-w-[1000px] mx-auto">
      <FormQuestionList :form-id="(route.params.formId as string)" />
    </div>
  </div>
</template>
