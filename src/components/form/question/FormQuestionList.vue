<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "@/store/questions";

import FormQuestion from "@/components/form/question/FormQuestion.vue";
import FormTitle from "@/components/form/question/FormTitle.vue";
import QuestionControls from "./QuestionControls.vue";

const questionStore = useQuestionStore();
const props = defineProps<{ formId: string }>();
const route = useRoute();

const selectedCurrentQuestion = ref(-1);
function setCurrentQuestion(index: number) {
  selectedCurrentQuestion.value = index;
}

onMounted(async () => {
  const formId = props.formId || (route.params.formId as string);
  questionStore.fetchQuestions(formId);
});
</script>

<template>
  <div class="flex flex-col md:flex-row gap-x-4 pb-24 md:pb-10">
    <div class="flex flex-col flex-grow gap-y-3">
      <FormTitle :form-id="formId" @click="setCurrentQuestion(-1)" />
      <FormQuestion
        v-for="(question, index) in questionStore.questions"
        :key="question.id"
        :question="question"
        :is-selected="index === selectedCurrentQuestion"
        :disable-up="question.order === 1"
        :disable-down="question.order === questionStore.questions.length"
        @click="setCurrentQuestion(index)"
        @moveup:question="
          () => questionStore.shuffleQuestions(index, index - 1)
        "
        @movedown:question="
          () => questionStore.shuffleQuestions(index, index + 1)
        "
        @update:question="questionStore.updateQuestion"
        @delete:question="(id) => questionStore.deleteQuestion(id, formId)"
      />
    </div>
    <QuestionControls
      :form-id="formId"
      @add:question="questionStore.createQuestion(formId)"
    />
  </div>
</template>
