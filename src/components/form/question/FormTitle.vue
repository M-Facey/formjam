<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import pb from "@/db/pocketBase";
import { setPageTitle } from "@/utils/form";

import XEditor from "@/components/inputs/Editor.vue";

const props = defineProps<{ formId: string }>();

const title = ref("");
const description = ref("");

watch(
  () => title.value,
  async (newTitle) => {
    if (!props.formId) return;

    let formData;
    if (title.value === "") {
      formData = await pb.collection("forms").getOne(props.formId);
    }
    await pb.collection("forms").update(props.formId, {
      ...formData,
      title: newTitle !== "<p></p>" ? newTitle : "Untitled Form",
    });
    setPageTitle(newTitle);
  }
);

watch(
  () => description.value,
  async (newDescription) => {
    const formData = await pb.collection("forms").getOne(props.formId);
    await pb.collection("forms").update(props.formId, {
      ...formData,
      description: newDescription,
    });
  }
);

onMounted(async () => {
  const formData = await pb.collection("forms").getOne(props.formId);
  title.value = formData.title === "Untitled Form" ? "" : formData.title;
  description.value = formData.description;
});
</script>

<template>
  <div
    class="flex flex-col gap-y-2 p-4 bg-neutral-100 dark:bg-neutral-700 rounded-lg"
  >
    <XEditor type="title" placeholder="Untitled Form" v-model.lazy="title" />
    <XEditor
      type="description"
      placeholder="Form description"
      v-model.lazy="description"
    />
  </div>
</template>
