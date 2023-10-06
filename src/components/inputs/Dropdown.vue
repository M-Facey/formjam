<script lang="ts" setup>
import { ref } from "vue";
import { DropdownPropType } from "../../types/inputs";
import IconArrowDown from "../icons/ArrowDown.vue";

defineProps<DropdownPropType>();

const showDropdown = ref(false);
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}
</script>

<template>
  <div class="relative">
    <div
      class="flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 px-3 py-2 rounded-md cursor-pointer"
      @click="toggleDropdown"
    >
      <p class="select-none flex items-center gap-x-2 pr-2">
        <Component
          v-if="selectOption.icon"
          :is="selectOption.icon"
          class="w-5 h-5"
        />
        {{ selectOption.name }}
      </p>
      <IconArrowDown class="w-6 h-6" :class="{ 'rotate-180': showDropdown }" />
    </div>

    <Transition name="slide-fade">
      <div
        v-if="showDropdown"
        class="absolute top-full translate-y-2 w-full flex flex-col bg-neutral-50 border border-neutral-200 rounded-md"
      >
        <p
          v-for="option in options"
          class="hover:bg-neutral-200 px-3 py-1.5 cursor-pointer select-none"
          @click="toggleDropdown"
        >
          {{ option.name }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
