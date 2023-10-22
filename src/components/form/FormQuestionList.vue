<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import pb from "../../db/pocketBase";

import FormQuestion from "./FormQuestion.vue";
import { QuestionResponse } from "../../types/form";

const props = defineProps<{ formId: string }>();
const route = useRoute();
const questions = ref<QuestionResponse>();

onMounted(async () => {
  const formId = props.formId || (route.params.formId as string);
  questions.value = await pb.collection("questions").getList(1, 100, {
    filter: `form="${formId}"`,
  });

  pb.collection("questions").subscribe("*", function (e) {
    console.log(e.action);
    console.log(e.record);
  });
});

onUnmounted(() => {
  pb.collection("questions").unsubscribe("*");
});
</script>
<template>
  <div class="flex flex-col gap-y-3">
    <FormQuestion v-for="question in questions?.items" :key="question.id" />
  </div>
</template>
