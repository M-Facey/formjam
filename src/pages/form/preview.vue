<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTitle } from "@vueuse/core";
import type { Answer } from "@/types/form";
import { getDefaultAnswer, setupParagraphInputs } from "@/utils/form";

import { useFormStore } from "@/store/forms";
import { useQuestionStore } from "@/store/questions";
import IconLongText from "@/components/icons/question/LongText.vue";

// prime vue components
import Checkbox from "primevue/checkbox";
import RadioButton from "primevue/radiobutton";
import Message from "primevue/message";

import IconArrowDown from "@/components/icons/controls/ArrowDown.vue";

const route = useRoute();
const router = useRouter();

const formStore = useFormStore();
const questionStore = useQuestionStore();

const formTitle = ref("");
const formTitleElem = ref<HTMLHeadingElement | null>(null);
const formData = ref<Answer[]>([]);

const title = computed(() => {
  const elem = document.createElement("h1");
  elem.innerHTML = formTitle.value;
  return elem.innerText
    ? elem.innerText + " | FormJAM"
    : "Untitled Form | FormJAM";
});
useTitle(title);

function clearForm() {
  formData.value = formData.value.map((answer) => {
    return {
      id: answer.id,
      type: answer.type,
      answer: getDefaultAnswer(answer.type),
    };
  });
}

onMounted(async () => {
  const formId = route.params.formId as string;

  if (formStore.forms.length === 0) {
    await formStore.fetchForms();
  }

  formTitle.value =
    formStore.forms.find((form) => form.id === formId)?.title || "";
  await questionStore.fetchQuestions(formId);

  let paragraphInputs: string[] = [];

  formData.value = questionStore.questions.map(({ type, id }) => {
    if (type === "paragraph") paragraphInputs.push(id);
    return { id, type, answer: getDefaultAnswer(type) };
  });

  setupParagraphInputs(paragraphInputs);
});
</script>

<template>
  <div class="px-5 py-6">
    <form class="w-full max-w-[1000px] flex flex-col gap-3 mx-auto">
      <RouterLink
        :to="`/form/${route.params.formId}/edit`"
        class="w-fit custom-btn flex items-center gap-x-2 py-1.5 pl-1.5 pr-3 rounded-md"
        @click="router.go(-1)"
      >
        <IconArrowDown class="w-5 h-5 rotate-90" />
        Go back for editing
      </RouterLink>

      <Message severity="info"
        ><b>Please Note:</b> The submissions on the preview page will not be
        saved to the database.</Message
      >

      <h1
        ref="formTitleElem"
        v-html="formTitle"
        class="prose prose-2xl text-center"
      ></h1>

      <div
        v-for="(question, index) in questionStore.questions"
        class="w-full flex flex-col border border-gray-300 p-4 mx-auto shadow-md rounded-lg"
      >
        <h2
          v-html="
            question.text +
            `${
              question.required
                ? '<span class=\'text-red-500 select-none\'> *</span>'
                : ''
            }`
          "
          class="flex gap-1 text-xl"
          :class="{
            'pb-3': !question.description,
          }"
        ></h2>
        <p
          v-if="question.description"
          v-html="question.description"
          class="question-description prose prose-p:my-0.3 prose-li:my-0.5 text-gray-600 pb-3 text-sm"
        ></p>

        <div v-if="formData[index]" class="flex-grow">
          <div
            v-if="question.type === 'short-text'"
            class="flex items-center gap-x-3"
          >
            <p class="font-rokkitt text-[26px]">T</p>
            <input
              type="text"
              v-model="formData[index].answer"
              placeholder="Enter your answer here"
              class="w-full py-2 border-b border-gray-200 hover:border-gray-400 focus:border-sky-500 outline-none"
              @keypress.enter.prevent
            />
          </div>

          <div
            v-if="question.type === 'paragraph'"
            class="flex items-start gap-x-3"
          >
            <IconLongText class="w-6 h-6 mt-2.5" />
            <textarea
              :id="`textarea-${question.id}`"
              placeholder="Enter your answer here"
              v-model="formData[index].answer"
              data-lpignore="true"
              class="w-full h-8 py-2 border-b border-gray-200 hover:border-gray-400 focus:border-sky-500 resize-none outline-none"
            />
          </div>

          <div
            v-else-if="
              question.type === 'single-choice' ||
              question.type === 'checkboxes'
            "
            v-for="answer in question.answers"
            :key="answer.id"
            class="flex items-center pb-1.5 gap-2"
          >
            <Checkbox
              v-if="question.type === 'checkboxes'"
              :aria-labelledby="answer.text"
              :name="`${question.id}`"
              :value="answer.id"
              :input-id="answer.id"
              v-model="formData[index].answer"
            />

            <RadioButton
              v-if="question.type === 'single-choice'"
              :aria-labelledby="answer.text"
              :name="`${question.id}`"
              :value="answer.id"
              :input-id="answer.id"
              v-model="formData[index].answer"
            />
            <label :for="answer.id" class="mb-0.5 cursor-pointer">{{
              answer.text
            }}</label>
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <RouterLink
          :to="`/form/${route.params.formId}/success`"
          :query="route.query"
        >
          <button class="custom-btn py-2 px-5 font-medium rounded-lg">
            Submit Form
          </button>
        </RouterLink>

        <button
          role="button"
          class="hover:bg-sky-50 border border-transparent active:border-sky-400 py-2 px-5 text-sky-500 font-medium rounded-md"
          @click.prevent="clearForm"
        >
          Clear Form
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.question-description > p,
.question-description ol li p,
.question-description ul li p {
  margin-top: 3px;
  margin-bottom: 3px;
}
</style>
