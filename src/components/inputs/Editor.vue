<script lang="ts" setup>
import { onUnmounted, watch, ref } from "vue";

import { Extension } from "@tiptap/vue-3";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

import IconBold from "../icons/text/Bold.vue";
import IconItalics from "../icons/text/Italics.vue";
import IconUnderline from "../icons/text/Underline.vue";
import IconLink from "../icons/text/Link.vue";
import IconList from "../icons/List.vue";
import IconNumberedList from "../icons/text/NumberedList.vue";
import IconClearFormat from "../icons/text/ClearFormat.vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    type?: "title" | "question" | "description";
  }>(),
  {
    placeholder: "Untitled",
    type: "question",
  }
);
const emits = defineEmits<{ (e: "update:modelValue", val: string): void }>();

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () =>
        props.type === "title" || editor.value === undefined ? true : false,
    };
  },
});

const timerId = ref(-1);
const waitId = ref(-1);
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Link.configure({
      openOnClick: false,
      linkOnPaste: false,
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    DisableEnter,
  ],
  editorProps: {
    attributes: {
      class: createInputClass(),
    },
  },
  onUpdate: () => {
    if (timerId.value !== -1) {
      clearTimeout(timerId.value);
    }
    timerId.value = setTimeout(() => {
      emits("update:modelValue", editor.value?.getHTML() || "");
    }, 1000);
  },
  onFocus: () => {
    if (waitId.value !== -1) {
      clearTimeout(waitId.value);
      return;
    }

    if (isMenuOpen) {
      showMenu();
    }
  },
  onBlur: () => {
    waitId.value = setTimeout(() => {
      if (isMenuOpen) {
        hideMenu();
        emits("update:modelValue", editor.value?.getHTML() || "");
        waitId.value = -1;
      }
    }, 250);
  },
  onDestroy: () => {
    emits("update:modelValue", editor.value?.getHTML() || "");
  },
});

watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.value?.getHTML() === value;
    if (isSame) return;
    editor.value?.commands.setContent(value, false);
  }
);

function setLink() {
  const previewUrl = editor.value?.getAttributes("link").href;
  const url = window.prompt("URL", previewUrl);

  if (url === null) return;

  if (url === "") {
    editor.value?.chain().focus().extendMarkRange("link").unsetLink().run();
    editor.value?.chain().focus().unsetUnderline().run();
    return;
  }

  editor.value
    ?.chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();

  editor.value?.chain().focus().setUnderline().run();
}

function setList(listType: "bulletList" | "orderedList") {
  if (editor.value?.isActive(listType)) {
    editor.value.chain().focus().liftListItem("listItem").run();
    return;
  }

  if (listType === "orderedList") {
    editor.value?.chain().focus().toggleOrderedList().run();
  } else if (listType === "bulletList") {
    editor.value?.chain().focus().toggleBulletList().run();
  }
}

function createInputClass() {
  let baseClasses = "prose outline-none ";
  if (props.type === "question") {
    baseClasses += "py-0.5 text-lg";
  } else if (props.type === "title") {
    baseClasses += "border-b border-gray-200 pb-1 text-3xl";
  } else if (props.type === "description") {
    baseClasses +=
      "prose-sm border-b border-gray-200 pb-1 text-sm text-black/50";
  }

  return baseClasses;
}

const menu = ref<HTMLElement>();
const isMenuOpen = ref(false);
function showMenu() {
  if (menu.value === undefined) return;
  let currentHeight = 0;
  const DESIRED_HEIGHT_IN_PIXEL = 36;
  const DURATION_IN_MS = 100;
  const interval = DESIRED_HEIGHT_IN_PIXEL / DURATION_IN_MS;

  const timerInterval = setInterval(() => {
    if (menu.value === undefined) return;
    menu.value.style.height = `${currentHeight}px`;
    currentHeight += interval;

    if (currentHeight >= DESIRED_HEIGHT_IN_PIXEL) {
      isMenuOpen.value = true;
      clearInterval(timerInterval);
    }
  }, 1);
}

function hideMenu() {
  if (menu.value === undefined) return;
  let currentHeight = 36;
  const DESIRED_HEIGHT_IN_PIXEL = 0;
  const DURATION_IN_MS = 100;
  const interval = currentHeight / DURATION_IN_MS;

  const timerInterval = setInterval(() => {
    if (menu.value === undefined) return;
    menu.value.style.height = `${currentHeight}px`;
    currentHeight -= interval;

    if (currentHeight <= DESIRED_HEIGHT_IN_PIXEL) {
      isMenuOpen.value = false;
      clearInterval(timerInterval);
    }
  }, 1);
}

onUnmounted(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div class="relative">
    <editor-content :editor="editor" class="peer" />

    <div
      v-if="editor"
      ref="menu"
      class="menu flex gap-x-1 pt-1 overflow-hidden"
    >
      <button
        class="hover:bg-gray-200 p-1 rounded-md"
        :class="{ 'bg-gray-200': editor?.isActive('bold') }"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <IconBold class="w-6 h-6" />
      </button>
      <button
        class="hover:bg-gray-200 p-1 rounded-md"
        :class="{ 'bg-gray-200': editor?.isActive('italic') }"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <IconItalics class="w-6 h-6" />
      </button>
      <button
        class="hover:bg-gray-200 p-1 rounded-md"
        :class="{ 'bg-gray-200': editor?.isActive('underline') }"
        :disabled="editor.isActive('link')"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <IconUnderline class="w-6 h-6" />
      </button>
      <button
        v-if="type === 'description'"
        class="hover:bg-gray-200 p-1 rounded-md"
        :class="{ 'bg-gray-200': editor?.isActive('bulletList') }"
        @click="setList('bulletList')"
      >
        <IconList class="w-6 h-6" />
      </button>
      <button
        v-if="type === 'description'"
        class="hover:bg-gray-200 p-1 rounded-md"
        :class="{ 'bg-gray-200': editor?.isActive('orderedList') }"
        @click="setList('orderedList')"
      >
        <IconNumberedList class="w-6 h-6" />
      </button>
      <button
        class="hover:bg-gray-200 p-1 rounded-md"
        :class="{ 'bg-gray-200': editor?.isActive('link') }"
        @click="setLink"
      >
        <IconLink class="w-6 h-6" />
      </button>
      <button
        class="hover:bg-gray-200 p-1 rounded-md"
        @click="editor.chain().focus().unsetAllMarks().run()"
      >
        <IconClearFormat class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<style>
.tiptap a {
  @apply text-primary-purple;
}

/* Placeholder (at the top) */
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.menu {
  height: 0px;
}
</style>
