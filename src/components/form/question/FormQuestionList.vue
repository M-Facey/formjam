<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import pb from "../../../db/pocketBase";
import type { QuestionResponse } from "../../../types/form";

import FormQuestion from "./FormQuestion.vue";
import FormTitle from "./FormTitle.vue";

const props = defineProps<{ formId: string }>();
const route = useRoute();
const questions = ref<QuestionResponse>({
  page: 0,
  perPage: 0,
  totalItems: 0,
  totalPages: 0,
  items: [],
});

onMounted(async () => {
  const formId = props.formId || (route.params.formId as string);
  questions.value = await pb.collection("questions").getList(1, 100, {
    filter: `form="${formId}"`,
  });
});

onUnmounted(() => {
  pb.collection("questions").unsubscribe("*");
});
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <FormTitle :form-id="formId" />
    <FormQuestion
      v-for="question in questions?.items"
      :key="question.id"
      :question="question"
    />
  </div>
</template>
