<script lang="ts" setup>
import XNavbar from "@/components/dashboard/Navbar.vue";
import XMobileNavbar from "@/components/dashboard/MobileNavbar.vue";
import TheFooter from "@/components/common/Footer.vue";
</script>

<template>
  <main class="min-h-[100dvh] dark:bg-neutral-800 flex flex-col dark:text-white">
    <XNavbar class="hidden md:block" />
    <XMobileNavbar class="block md:hidden" />
    <slot />
    <TheFooter />
  </main>
</template>
