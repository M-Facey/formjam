<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createForm } from "@/utils/form";
import pb from "@/db/pocketBase";

import IconAdd from "@/components/icons/controls/Add.vue";
import IconLogout from "@/components/icons/controls/Logout.vue";

import XTextInput from "@/components/inputs/TextInput.vue";
import XButton from "@/components/inputs/Button.vue";

const searchParam = ref("");
const router = useRouter();
const loading = ref(false);

async function gotoCreateFormPage() {
  const id = await createForm();
  router.push({ name: "EditForm", params: { formId: id } });
}

async function logout() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    pb.authStore.clear();
    router.push({ name: "Login" });
  }, 1000);
}
</script>

<template>
  <header class="bg-neutral-100 border-b border-neutral-200 px-6 py-3">
    <div class="container flex items-center justify-between">
      <RouterLink to="/" class="flex flex-shrink-0 items-center gap-x-2">
        <img src="@/assets/vue.svg" class="max-h-[30px]" />
        <p class="text-2xl text-neutral-700">
          Form<span class="text-neutral-400 font-bold">JAM</span>
        </p>
      </RouterLink>

      <XTextInput
        id="search_input"
        type="text"
        placeholder="Search"
        is-searchable
        v-model="searchParam"
      />
      <div class="flex flex-shrink-0 gap-x-2">
        <XButton
          text="Create Form"
          :has-icon="false"
          class="font-medium"
          @trigger-event="gotoCreateFormPage"
        >
          <template #icon>
            <IconAdd class="w-6 h-6 mr-2" />
          </template>
        </XButton>

        <XButton
          class="font-medium"
          :has-icon="false"
          text="Log out"
          :loading="loading"
          @trigger-event="logout"
        >
          <template #icon>
            <IconLogout class="w-6 h-6 mr-2" />
          </template>
        </XButton>
      </div>
    </div>
  </header>
</template>
