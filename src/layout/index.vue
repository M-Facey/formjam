<script lang="ts" setup>
import { shallowRef, watch, ref } from "vue";
import type { Component } from "vue";
import { useRoute } from "vue-router";

// import layouts
import DefaultLayout from "./default.vue";
import AppLayout from "./app.vue";
import FormLayout from "./form.vue";
import AuthLayout from "./auth.vue";

const route = useRoute();
const layoutName = ref("Default");
const layoutComponent = shallowRef<Component>(DefaultLayout);

watch(
  () => route.fullPath,
  (_) => {
    if (
      layoutName.value === route.meta.layout ||
      route.meta.layout === undefined
    )
      return;

    if (route.meta.layout === "Default") {
      layoutName.value = "Default";
      layoutComponent.value = DefaultLayout;
    } else if (route.meta.layout === "App") {
      layoutName.value = "App";
      layoutComponent.value = AppLayout;
    } else if (route.meta.layout === "Form") {
      layoutName.value = "Form";
      layoutComponent.value = FormLayout;
    } else if (route.meta.layout === "Auth") {
      layoutName.value = "Auth";
      layoutComponent.value = AuthLayout;
    }
  }
);
</script>

<template>
  <Component :is="layoutComponent">
    <slot />
  </Component>
</template>
