<script lang="ts" setup>
defineProps<{
  heading: string;
  content: string;
}>();
</script>

<template>
  <div
    class="w-full lg:w-1/3 p-4 bg-gradient-to-b from-white/20 dark:from-transparent to-white dark:to-black/20 dark:md:to-primary-dark-800 border border-gray-300 dark:border-primary-dark-500 rounded-xl backdrop-blur-sm"
  >
    <p
      class="w-11 h-11 flex items-center justify-center bg-white dark:bg-white/10 pt-0.5 text-2xl rounded-md shadow-cs"
    >
      <slot />
    </p>
    <h3 class="text-lg text-black dark:text-white font-medium mt-4 mb-1">
      {{ heading }}
    </h3>

    <p class="text-sm text-black/50 dark:text-white/50 tracking-wide">
      {{ content }}
    </p>
  </div>
</template>

<style>
.shadow-cs {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
}
</style>
