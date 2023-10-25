<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import pb from "../../../db/pocketBase";

import Editor from "../../inputs/Editor.vue";

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
  <div class="flex flex-col gap-y-3 p-4 bg-gray-100 rounded-lg">
    <Editor type="title" placeholder="Untitled Form" v-model.lazy="title" />
    <Editor placeholder="Form description" v-model.lazy="description" />
  </div>
</template>
