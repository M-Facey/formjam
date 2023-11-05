<script lang="ts" setup>
import { useThemeStore } from "@/store/theme";

import IconHandHeart from "@/components/icons/emoji/HandHeart.vue";
import ThemeToggle from "@/components/common/ThemeToggle.vue";

const themeStore = useThemeStore();
</script>

<template>
  <main
    class="min-h-screen bg-primary-light-100 dark:bg-primary-dark-800 text-white flex flex-col items-center justify-center"
  >
    <div
      class="absolute top-3 right-3 flex items-center gap-x-4 sm:py-2 sm:pl-3 sm:pr-2 bg-white/70 dark:bg-black/30 sm:border border-gray-300 dark:border-gray-600 text-black dark:text-white font-medium rounded-full"
    >
      <p class="hidden sm:block pb-1 font-medium">
        <span
          :class="{
            'font-extrabold': themeStore.currentTheme === 'light',
            'text-gray-400 font-light': themeStore.currentTheme === 'dark',
          }"
          >Light</span
        >
        /
        <span
          :class="{
            'font-extrabold': themeStore.currentTheme === 'dark',

            'text-gray-400 font-light': themeStore.currentTheme === 'light',
          }"
          >Dark</span
        >
      </p>
      <ThemeToggle />
    </div>
    <slot />

    <footer class="absolute bottom-4 flex flex-col xs:flex-row items-center">
      <p
        class="pt-1 text-xs xs:text-sm md:text-base text-black dark:text-white"
      >
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
  </main>
</template>
