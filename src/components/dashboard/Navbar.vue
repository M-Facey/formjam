<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import pb from "@/db/pocketBase";

import IconLogout from "@/components/icons/controls/Logout.vue";
import XTextInput from "@/components/inputs/TextInput.vue";
import XButton from "@/components/inputs/Button.vue";

const searchParam = ref("");
const router = useRouter();
const loading = ref(false);

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
  <header class="bg-neutral-100 border-b border-neutral-400 px-6 py-3">
    <div class="container flex items-center justify-between">
      <RouterLink to="/" class="flex flex-shrink-0 items-center gap-x-2">
        <img src="@/assets/images/logo.png" alt="logo" class="w-8 h-8" />
        <p class="text-2xl text-black">
          Form<span class="text-sky-700 font-bold">JAM</span>
        </p>
      </RouterLink>

      <XTextInput
        id="search_input"
        type="text"
        placeholder="Search"
        is-searchable
        v-model="searchParam"
      />

      <XButton
        class="font-medium"
        text="Log out"
        data-cy="dashboard_logout_btn"
        :has-icon="false"
        :loading="loading"
        @trigger-event="logout"
      >
        <template #icon>
          <IconLogout class="w-6 h-6 mr-2" />
        </template>
      </XButton>
    </div>
  </header>
</template>