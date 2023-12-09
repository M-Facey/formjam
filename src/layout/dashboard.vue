<script lang="ts" setup>
import XNavbar from "@/components/dashboard/Navbar.vue";
import XMobileNavbar from "@/components/dashboard/MobileNavbar.vue";
import TheFooter from "@/components/common/Footer.vue";
import { breakpoints } from "@/utils/breakpoints";

const mdBP = breakpoints.greaterOrEqual("md");
</script>

<template>
  <main class="min-h-[100dvh] dark:bg-neutral-800 flex flex-col dark:text-white">
    <XNavbar v-if="mdBP" class="hidden md:block" />
    <XMobileNavbar v-else class="block md:hidden" />
    <slot />
    <TheFooter />
  </main>
</template>