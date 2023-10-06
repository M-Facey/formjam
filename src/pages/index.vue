<script lang="ts" setup>
import XButton from "../components/inputs/Button.vue";
</script>

<template>
  <div
    class="h-screen bg-neutral-900 text-white flex flex-col items-center justify-center"
  >
    <h1 class="text-4xl font-bold tracking-wider">Welcome to FormJAM</h1>
    <p class="pt-3 text-lg">
      We are currently in development, please wait as features will shortly by
      added.
    </p>

    <div class="flex gap-x-4 pt-3">
      <RouterLink to="/auth/login">
        <XButton text="Log in" class="font-medium" />
      </RouterLink>

      <RouterLink to="/dashboard">
        <XButton text="Dashboard" class="font-medium" />
      </RouterLink>
    </div>
  </div>
</template>
