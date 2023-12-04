<script lang="ts" setup>
import IconHandHeart from "@/components/icons/emojis/HandHeart.vue";
</script>

<template>
  <footer class="absolute bottom-4 flex flex-col xs:flex-row items-center">
    <p class="pt-1 text-xs xs:text-sm md:text-base text-black dark:text-white">
      Copyright © {{ new Date().getFullYear() }}
      <a
        href="https://github.com/M-Facey"
        class="underline text-neutral-950 dark:text-white/60 hover:text-neutral-500 dark:hover:text-white"
        >Murphy Facey</a
      >
      <span class="hidden xs:inline pr-1"> | </span>
    </p>
    <div class="flex items-center text-black dark:text-white">
      <p class="pt-1 text-xs xs:text-sm md:text-base">Made with</p>
      <IconHandHeart class="w-5 xs:w-7 h-5 xs:h-7 ml-1" />
    </div>
  </footer>
</template>
