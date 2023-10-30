<script setup lang="ts">
import { onMounted } from "vue";
import { useThemeStore } from "@/store/theme";

import AppLayout from "@/layout/index.vue";

const themeStore = useThemeStore();
onMounted(() => {
  themeStore.checkTheme();
});
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
