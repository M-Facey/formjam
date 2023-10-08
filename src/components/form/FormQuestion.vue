<script lang="ts" setup>
import { ref } from "vue";
import XTextInput from "../inputs/TextInput.vue";
import XDropdown from "../inputs/Dropdown.vue";
import XToggle from "../inputs/Toggle.vue";
import XButton from "../inputs/Button.vue";

// question type icons
import IconCheckbox from "../icons/question/Checkbox.vue";
import IconShortText from "../icons/question/ShortText.vue";
import IconLongText from "../icons/question/LongText.vue";
import IconSelect from "../icons/question/Select.vue";
import IconDropdown from "../icons/question/Dropdown.vue";

// controls icons
import IconArrowDown from "../icons/ArrowDown.vue";
import IconCopy from "../icons/Copy.vue";
import IconDelete from "../icons/Delete.vue";
import IconAdjustment from "../icons/Adjustments.vue";

const questionConfig = ref({
  question: "",
  description: "",
  required: false,
});

const questionTypeOptions = ref([
  { name: "Short Text", value: "short-text", icon: IconShortText },
  { name: "Paragraph", value: "paragraph", icon: IconLongText },
  { name: "Multiple Choice", value: "single-choice", icon: IconSelect },
  { name: "Checkboxes", value: "checboxes", icon: IconCheckbox },
  { name: "Dropdown", value: "dropdown", icon: IconDropdown },
]);
</script>

<template>
  <div class="flex bg-gray-100 divide-x divide-gray-300">
    <div class="flex-grow p-4">
      <XTextInput
        id="form_question"
        type="text"
        placeholder="Untitled Question"
        v-model="questionConfig.question"
      />

      <XTextInput
        id="form_desc"
        type="text"
        placeholder="Description"
        v-model="questionConfig.description"
        class="mt-2"
      />
      <!-- general config for question type -->
      <div></div>
    </div>
    <!--  -->
    <div class="w-full max-w-[300px] divide-y divide-gray-300">
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
