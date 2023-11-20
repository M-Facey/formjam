<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { nanoid } from "nanoid";

import IconClose from "@/components/icons/controls/Close.vue";

export interface Answer {
  text: string;
  id: string;
}

const props = defineProps<{
  modelValue: Answer[] | null;
  questionType: string;
}>();
const emit = defineEmits<{ (e: "update:modelValue", value: Answer[]): void }>();

const answers = ref<Answer[]>([]);

function focusOnAnswer(answerId: string) {
  setTimeout(() => {
    document.getElementById(`ans-${answerId}`)?.focus();
  }, 10);
}

function addAnswer(index: number) {
  const newAnswerId = nanoid();

  answers.value.splice(index + 1, 0, {
    id: newAnswerId,
    text: "option",
  });

  focusOnAnswer(newAnswerId);
  emit("update:modelValue", answers.value);
}

const timeoutId = ref<NodeJS.Timeout>();
function updateAnswer(id: string, text: string) {
  const index = answers.value.findIndex((answer) => answer.id === id);
  answers.value[index].text = text;

  if (timeoutId.value !== undefined) {
    clearTimeout(timeoutId.value);
  }

  timeoutId.value = setTimeout(() => {
    emit("update:modelValue", answers.value);
  }, 1000);
}

function moveToAnswer(index: number, increment: number) {
  const position = index + increment;
  if (position < 0 || position >= answers.value.length) return;
  focusOnAnswer(answers.value[position].id);
  emit("update:modelValue", answers.value);
}

function removeAnswer(id: string, text?: string) {
  if (text !== undefined && text !== "") return;
  let index = answers.value.findIndex((answer) => answer.id === id);
  answers.value = answers.value.filter((answer) => answer.id !== id);

  if (answers.value.length < 2) return;
  index = index === answers.value.length ? index - 1 : index;
  focusOnAnswer(answers.value[index].id);

  emit("update:modelValue", answers.value);
}

onMounted(() => {
  if (props.modelValue !== null) {
    answers.value = props.modelValue;
    return;
  }

  answers.value.push({
    id: nanoid(),
    text: "option",
  });
});
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <div
      v-for="(answer, index) in answers"
      :key="answer.id"
      class="flex items-center gap-x-4"
    >
      <div
        class="w-6 h-6 border-2 border-gray-300"
        :class="{
          'rounded-full': questionType === 'single-choice',
          'rounded-md': questionType === 'checkboxes',
        }"
      ></div>

      <input
        type="text"
        name="answer"
        :id="`ans-${answer.id}`"
        :value="answer.text"
        @change="
          updateAnswer(answer.id, ($event.target as HTMLInputElement).value)
        "
        @keypress.enter="addAnswer(index)"
        @keydown.delete="removeAnswer(answer.id, answer.text)"
        @keydown.up.prevent="moveToAnswer(index, -1)"
        @keydown.down.prevent="moveToAnswer(index, 1)"
        class="flex-grow bg-transparent border-b border-transparent hover:border-gray-300 focus:border-sky-500 outline-none py-2"
      />

      <button
        class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md"
        @click="removeAnswer(answer.id)"
      >
        <IconClose class="w-6 h-6" />
      </button>
    </div>
    <button @click="addAnswer(answers.length)">Add Others</button>
  </div>
</template>