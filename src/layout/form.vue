<script lang="ts" setup>
import FormNavbar from "@/components/form/FormNavbar.vue";
</script>

<template>
  <main class="min-h-[100dvh] bg-white dark:bg-neutral-800">
    <FormNavbar />
    <slot />
  </main>
</template>
