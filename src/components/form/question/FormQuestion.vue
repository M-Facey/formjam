<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch } from "vue";
import type { Question } from "@/types/pocketbase";
import pb from "@/db/pocketBase";

// input components
import XEditor from "@/components/inputs/Editor.vue";
import XDropdown from "@/components/inputs/Dropdown.vue";
import XToggle from "@/components/inputs/Toggle.vue";
import XButton from "@/components/inputs/Button.vue";

// question type icons
import IconCheckbox from "@/components/icons/question/Checkbox.vue";
import IconShortText from "@/components/icons/question/ShortText.vue";
import IconLongText from "@/components/icons/question/LongText.vue";
import IconSelect from "@/components/icons/question/Select.vue";
import IconDropdown from "@/components/icons/question/Dropdown.vue";

// controls icons
import IconArrowDown from "@/components/icons/controls/ArrowDown.vue";
import IconCopy from "@/components/icons/controls/Copy.vue";
import IconDelete from "@/components/icons/controls/Delete.vue";
import IconAdjustment from "@/components/icons/menu/Adjustments.vue";

const props = defineProps<{ question: Question }>();

const questionTypeOptions = shallowRef([
  { name: "Short Text", value: "short-text", icon: IconShortText },
  { name: "Paragraph", value: "paragraph", icon: IconLongText },
  { name: "Multiple Choice", value: "single-choice", icon: IconSelect },
  { name: "Checkboxes", value: "checboxes", icon: IconCheckbox },
  { name: "Dropdown", value: "dropdown", icon: IconDropdown },
]);

const questionConfig = ref<Question>({
  id: "",
  created: "",
  updated: "",
  text: "",
  description: "",
  required: false,
  type: "short-text",
  answers: [],
  form: "",
});

watch(
  questionConfig,
  async (questionData) => {
    await pb.collection("questions").update(questionData.id, questionData);
  },
  { deep: true }
);

onMounted(() => {
  questionConfig.value = props.question;
});
</script>

<template>
  <div class="flex bg-gray-100 divide-x divide-gray-300">
    <div class="flex-grow p-4">
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
      <!-- general config for question type -->
      <div></div>
    </div>
    <!--  -->
    <div class="w-full max-w-[250px] divide-y divide-gray-300">
      <div class="flex flex-col gap-y-2 p-4">
        <XDropdown
          :select-option="questionTypeOptions[0]"
          :options="questionTypeOptions"
        />

        <XToggle
          label="Required"
          id="toggle"
          v-model="questionConfig.required"
        />

        <XButton text="More Options" size="expand">
          <template #icon>
            <IconAdjustment class="w-5 h-5 mr-3" />
          </template>
        </XButton>
      </div>

      <div class="flex justify-between p-4">
        <XButton text="">
          <template #icon>
            <IconArrowDown class="w-7 h-7" />
          </template>
        </XButton>

        <XButton text="">
          <template #icon>
            <IconArrowDown class="w-7 h-7 rotate-180" />
          </template>
        </XButton>

        <XButton text="">
          <template #icon>
            <IconCopy class="w-7 h-7" />
          </template>
        </XButton>
        <XButton text="">
          <template #icon>
            <IconDelete class="w-7 h-7" />
          </template>
        </XButton>
      </div>
    </div>
  </div>
</template>