<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch } from "vue";
import type { Component } from "vue";
import type { Question } from "@/types/pocketbase";

// input components
import XEditor from "@/components/inputs/Editor.vue";
import XDropdown from "@/components/inputs/Dropdown.vue";
import XToggle from "@/components/inputs/Toggle.vue";
import Answer from "@/components/form/question/Answer.vue";

// question type icons
import IconCheckbox from "@/components/icons/question/Checkbox.vue";
import IconShortText from "@/components/icons/question/ShortText.vue";
import IconLongText from "@/components/icons/question/LongText.vue";
import IconSelect from "@/components/icons/question/Select.vue";
import IconDropdown from "@/components/icons/question/Dropdown.vue";
import IconLinearScale from "@/components/icons/question/LinearScale.vue";

// controls icons
import IconArrowDown from "@/components/icons/controls/ArrowDown.vue";
import IconCopy from "@/components/icons/controls/Copy.vue";
import IconDelete from "@/components/icons/controls/Delete.vue";
import IconAdjustment from "@/components/icons/menu/Adjustments.vue";
import debounce from "@/utils/debouncer";

const props = withDefaults(
  defineProps<{
    question: Question;
    disableUp?: boolean;
    disableDown?: boolean;
    isSelected: boolean;
  }>(),
  {
    disableDown: false,
    disableUp: false,
  },
);

const emits = defineEmits<{
  (e: "update:question", question: Question): void;
  (e: "delete:question", id: string): void;
  (e: "duplicate:question", question: Question): void;
  (e: "moveup:question"): void;
  (e: "movedown:question"): void;
}>();

const questionTypeOptions = shallowRef<
  {
    name: string;
    value:
      | "short-text"
      | "paragraph"
      | "single-choice"
      | "dropdown"
      | "checkboxes"
      | "linear-scale";
    icon: Component;
  }[]
>([
  { name: "Short Text", value: "short-text", icon: IconShortText },
  { name: "Paragraph", value: "paragraph", icon: IconLongText },
  { name: "Multiple Choice", value: "single-choice", icon: IconSelect },
  { name: "Checkboxes", value: "checkboxes", icon: IconCheckbox },
  { name: "Dropdown", value: "dropdown", icon: IconDropdown },
  { name: "Linear Scale", value: "linear-scale", icon: IconLinearScale },
]);
const currentQuestionOption = shallowRef(questionTypeOptions.value[0]);

const questionConfig = ref(props.question);

watch(
  questionConfig,
  (questionData) =>
    debounce(() => emits("update:question", questionData)),
  { deep: true },
);

watch(currentQuestionOption, (typeOption) => {
  questionConfig.value.type = typeOption.value;
});

function moveQuestion(direction: "up" | "down") {
  if (
    (props.disableDown && direction === "down") ||
    (props.disableUp && direction === "up")
  ) {
    return;
  }

  if (direction === "up") {
    emits("moveup:question");
    return;
  }
  emits("movedown:question");
}

onMounted(() => {
  const _ = questionTypeOptions.value.find(
    (question) => question.value === props.question.type,
  );

  if (_ !== undefined) {
    currentQuestionOption.value = _;
  }
});
</script>

<template>
  <div class="group flex bg-gray-100 divide-x divide-gray-300 rounded-lg">
    <div class="flex-grow p-3">
      <XEditor
        type="question"
        placeholder="Question"
        v-model="questionConfig.text"
      />
      <div class="pt-1">
        <XEditor
          type="description"
          placeholder="Description"
          v-model="questionConfig.description"
        />
      </div>
      <div class="pt-3">
        <input
          v-if="
            currentQuestionOption.value === 'short-text' ||
            currentQuestionOption.value === 'paragraph'
          "
          :id="`text-answer-${question.id}`"
          type="text"
          class="w-full border border-gray-400 py-2 px-4 outline-none rounded-md"
          readonly
          :placeholder="
            currentQuestionOption.value === 'short-text'
              ? 'Short text'
              : 'Long text'
          "
        />
        <Answer
          v-else-if="
            currentQuestionOption.value === 'checkboxes' ||
            currentQuestionOption.value === 'single-choice' ||
            currentQuestionOption.value === 'dropdown'
          "
          v-model="questionConfig.answers"
          :question-type="questionConfig.type"
        />
      </div>
    </div>

    <div class="w-full max-w-[220px] divide-y divide-gray-300">
      <div class="flex flex-col gap-y-2 p-3">
        <XDropdown
          v-model="currentQuestionOption"
          :options="questionTypeOptions"
        />

        <XToggle
          label="Required"
          :id="`toggle-${question.id}`"
          v-model="questionConfig.required"
        />

        <button class="flex items-center bg-sky-400 p-2 text-sm rounded-md">
          <IconAdjustment class="w-5 h-5 mr-2" />
          More Options
        </button>
      </div>

      <div
        class="justify-between p-3"
        :class="{ hidden: !isSelected, flex: isSelected }"
      >
        <button
          class="w-10 h-10 flex items-center justify-center bg-sky-500 disabled:bg-sky-600 text-white disabled:text-sky-900 rounded-md"
          @click="moveQuestion('up')"
          :disabled="disableUp"
        >
          <IconArrowDown class="w-6 h-6 rotate-180" />
        </button>

        <button
          class="w-10 h-10 flex items-center justify-center bg-sky-500 disabled:bg-sky-600 text-white disabled:text-sky-900 rounded-md"
          @click="moveQuestion('down')"
          :disabled="disableDown"
        >
          <IconArrowDown class="w-6 h-6" />
        </button>

        <button
          class="w-10 h-10 flex items-center justify-center bg-sky-500 disabled:bg-sky-600 text-white disabled:text-sky-800 rounded-md"
          @click="$emit('duplicate:question', questionConfig)"
          disabled
        >
          <IconCopy class="w-6 h-6" />
        </button>

        <button
          class="w-10 h-10 flex items-center justify-center bg-sky-500 text-white rounded-md"
          @click="$emit('delete:question', questionConfig.id)"
        >
          <IconDelete class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>