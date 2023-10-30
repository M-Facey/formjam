<script lang="ts" setup>
import XNavbar from "@/components/home/Navbar.vue";
import XMobileNavbar from "@/components/home/MobileNavbar.vue";
</script>

<template>
  <main>
    <XNavbar class="hidden md:block" />
    <XMobileNavbar class="block md:hidden" />
    <slot />
  </main>
</template>
