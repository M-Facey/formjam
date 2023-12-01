<script lang="ts" setup>
import IconSuccess from "@/components/icons/misc/Success.vue";
</script>

<template>
  <div class="flex flex-col items-center pt-16">
    <IconSuccess class="w-12 h-12" />
    <h1 class="py-2 text-2xl font-medium">Response Saved.</h1>
    <p>You submitted the form successfully.</p>
    <RouterLink to="/form/id/view" class="underline">
      Submit another response
    </RouterLink>
  </div>
</template>
