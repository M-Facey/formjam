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
import IconClearFormat from "../icons/text/ClearFormat.vue";
import IconLink from "../icons/text/Link.vue";

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
      class: "border-b border-gray-200 pb-1 outline-none",
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
      console.log("wait timer cleared");
      return;
    }

    if (isMenuOpen) {
      showMenu();
    }
  },
  onBlur: () => {
    console.log("wait timer started, Menu is open?", isMenuOpen.value);
    waitId.value = setTimeout(() => {
      if (isMenuOpen) {
        hideMenu();
        emits("update:modelValue", editor.value?.getHTML() || "");
        waitId.value = -1;
      }
    }, 150);
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

const menu = ref<HTMLElement>();
const isMenuOpen = ref(false);
function showMenu() {
  if (menu.value === undefined) return;
  // menu.value.style.height = '0px';
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
    <editor-content
      :editor="editor"
      class="peer"
      :class="{
        'text-3xl': type === 'title',
        'text-base': type === 'question',
        'text-sm': type === 'description',
      }"
    />

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
