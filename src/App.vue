<script setup lang="ts">
import { onMounted } from "vue";
import { useThemeStore } from "@/store/theme";

import AppLayout from "@/layout/index.vue";

import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";

const themeStore = useThemeStore();
onMounted(() => {
  themeStore.checkTheme();
});
</script>

<template>
  <ConfirmDialog />
  <Toast />
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
