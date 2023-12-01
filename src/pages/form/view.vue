<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useQuestionStore } from "@/store/questions";
import { autosizeTextarea } from "@/utils/textareaAutosize";

import IconArrowDown from "@/components/icons/controls/ArrowDown.vue";

const route = useRoute();
const router = useRouter();

const questionStore = useQuestionStore();
const answers = ref<Record<string, string | string[]>[]>([]);

onMounted(async () => {
  const formId = (route.params.formId as string) || "";
  if (formId !== "") {
    await questionStore.fetchQuestions(formId);

    let paraArr: string[] = [];

    answers.value = questionStore.questions.map((question) => {
      if (question.type === "checkboxes") {
        return {
          id: question.id,
          answer: [] as string[],
        };
      }

      if (question.type === "paragraph") {
        paraArr.push(question.id);
      }

      return {
        id: question.id,
        answer: "",
      };
    });
    setTimeout(() => {
      console.log("ran");
      paraArr.map((id) => {
        autosizeTextarea("textarea-" + id);
      });
    }, 10);
  }
});
</script>

<template>
  <div class="px-5 pt-5">
    <div class="w-full max-w-[1000px] flex flex-col gap-3 mx-auto">
      <RouterLink
        v-if="route.query.preview"
        :to="`/form/${route.params.formId}/edit`"
        class="w-fit custom-btn flex items-center gap-x-2 py-1.5 pl-1.5 pr-3 rounded-md"
        @click="router.go(-1)"
      >
        <IconArrowDown class="w-5 h-5 rotate-90" />
        Go back for editing
      </RouterLink>

      <div
        v-for="(question, index) in questionStore.questions"
        class="w-full flex flex-col border border-gray-300 p-4 mx-auto shadow-md rounded-lg"
      >
        <h2
          v-html="question.text"
          class="text-xl"
          :class="{
            'pb-3': !question.description,
          }"
        ></h2>
        <p
          v-if="question.description"
          v-html="question.description"
          class="text-gray-600 pb-3 text-sm"
        ></p>

        <div v-if="answers[index]" class="flex-grow">
          <input
            v-if="question.type === 'short-text'"
            type="text"
            v-model="answers[index].answer"
            placeholder="Enter your answer here"
            class="w-full"
          />

          <textarea
            v-if="question.type === 'paragraph'"
            :id="`textarea-${question.id}`"
            class="w-full h-6 resize-none"
            placeholder="Long para"
          />

          <div
            v-else-if="
              question.type === 'single-choice' ||
              question.type === 'checkboxes'
            "
            v-for="answer in question.answers"
            :key="answer.id"
            class="flex items-center"
          >
            <!-- <input type="text" /> -->
            <!-- <input
              v-if="question.type === 'checkboxes'"
              type="checkbox"
              :value="answer.id"
              v-model="answers[index].answer"
            /> -->
            <input
              v-if="
                question.type === 'single-choice' ||
                question.type === 'checkboxes'
              "
              :type="question.type === 'single-choice' ? 'radio' : 'checkbox'"
              :name="`question-${question.id}`"
              v-model="answers[index].answer"
              class="mr-3"
            />
            <label>{{ answer.text }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
