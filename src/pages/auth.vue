<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
onMounted(() => {
  router.push("/auth/login");
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
