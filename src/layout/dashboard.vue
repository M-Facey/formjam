<script lang="ts" setup>
import XNavbar from "@/components/dashboard/Navbar.vue";
import XMobileNavbar from "@/components/dashboard/MobileNavbar.vue";
</script>

<template>
  <main class="min-h-[100dvh]">
    <XNavbar class="hidden md:block" />
    <XMobileNavbar class="block md:hidden" />
    <slot />
  </main>
</template>
