<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFormStore } from "@/store/forms";
import { smallerOrEqual } from "@/utils/breakpoints";

import IconAdd from "@/components/icons/controls/Add.vue";
import Loader from "@/components/anim/Loader.vue";

defineProps<{ view: "list" | "grid" }>();

const router = useRouter();
const formStore = useFormStore();
const isLoading = ref(false);

async function gotoEditFormPage() {
  isLoading.value = true;
  const id = await formStore.createForm();
  isLoading.value = false;

  router.push({ name: "EditForm", params: { formId: id } });
}
</script>

<template>
  <div class="max-w-full">
    <button
      v-if="view === 'grid'"
      role="button"
      title="Create Form Card"
      class="w-full h-full flex bg-sky-200 py-6 px-6 border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-lg cursor-pointer"
      :class="{
        'flex-row items-center gap-x-4': smallerOrEqual,
        'flex-col items-center justify-center': !smallerOrEqual,
      }"
      data-cy="create_form_card"
      @click="gotoEditFormPage"
    >
      <div class="custom-btn p-1 rounded-xl">
        <IconAdd v-if="!isLoading" class="w-9 h-9 text-sky-600" />
        <Loader v-else class="w-9 h-9 text-sky-600" />
      </div>
      <div
        class="flex flex-col"
        :class="{
          'items-start': smallerOrEqual,
          'items-center': !smallerOrEqual,
        }"
      >
        <p
          class="font-bold font-epilogue"
          :class="{
            'text-xl': smallerOrEqual,
            'text-lg pt-4': !smallerOrEqual,
          }"
        >
          Create new form
        </p>
        <p class="text-sm text-sky-800 font-medium tracking-wide">
          Click here to create a blank form
        </p>
      </div>
    </button>
    <div
      v-else
      class="bg-sky-200 flex items-center justify-between p-3 rounded-xl"
    >
      <h1 class="text-lg">
        <span v-if="smallerOrEqual">Want a new form?</span>
        <span v-else>Do you want create a new form?</span>
      </h1>
      <button
        class="custom-btn flex items-center gap-x-1 p-2 text-sky-700 font-medium rounded-lg"
        data-cy="create_form_btn"
      >
        <IconAdd class="hidden sm:block w-6 h-6" />
        <p>Create <span class="hidden sm:inline"> blank form </span></p>
      </button>
    </div>
  </div>
</template>
