<script lang="ts" setup>
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

// import layouts
import DefaultLayout from "./default.vue";

const route = useRoute();
const layout = shallowRef<Component>(DefaultLayout);
</script>

<template>
  <Component :is="layout">
    <slot />
  </Component>
</template>
