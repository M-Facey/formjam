<script lang="ts" setup>
defineProps<{ notification: string }>();
</script>

<template>
  <div>
    <h2>Notification</h2>
    <p>{{ notification }}</p>
  </div>
</template>
