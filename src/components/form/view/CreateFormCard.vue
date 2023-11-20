<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFormStore } from "@/store/forms";

import IconAdd from "@/components/icons/controls/Add.vue";
import Loader from "@/components/anim/Loader.vue";

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
  <div
    class="max-w-full flex flex-col items-center justify-center bg-sky-200 py-6 px-6 border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-lg cursor-pointer"
    data-cy="create_form_card"
    @click="gotoEditFormPage"
  >
    <div class="custom-btn p-1 rounded-xl">
      <IconAdd v-if="!isLoading" class="w-9 h-9 text-sky-600" />
      <Loader v-else class="w-9 h-9 text-sky-600" />
    </div>
    <p class="pt-4 text-lg text-center font-bold font-epilogue">
      Create new form
    </p>
    <p class="text-sm text-center text-sky-800 font-medium tracking-wide">
      Click here to create a blank form
    </p>
  </div>
</template>
