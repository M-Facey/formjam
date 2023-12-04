<script lang="ts" setup>
import { ref } from "vue";
import { DropdownEmitType, DropdownPropType } from "@/types/inputs";

import IconArrowDown from "@/components/icons/controls/ArrowDown.vue";
import IconMenu from "@/components/icons/menu/Menu.vue";

withDefaults(defineProps<DropdownPropType>(), {
  isSearchable: false,
  showSelectedOption: true,
});

const emits = defineEmits<DropdownEmitType>();

const showDropdown = ref(false);
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}
</script>

<template>
  <div class="relative dark:text-black">
    <div
      v-if="showSelectedOption"
      class="flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 px-2 py-2 rounded-md cursor-pointer"
      @click="toggleDropdown"
    >
      <p class="select-none flex items-center gap-x-2 pr-2 text-sm">
        <Component
          v-if="modelValue.icon"
          :is="modelValue.icon"
          class="flex-grow dropdown-icons w-5 h-5"
        />
        {{ modelValue.name }}
      </p>
      <IconArrowDown class="w-5 h-5" :class="{ 'rotate-180': showDropdown }" />
    </div>

    <div
      v-else
      class="flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 px-1.5 py-1.5 rounded-md cursor-pointer"
      @click="toggleDropdown"
    >
      <IconMenu class="w-6 h-6" />
    </div>

    <Transition name="slide-fade">
      <div
        v-if="showDropdown"
        class="absolute top-full translate-y-2 right-0 flex flex-col bg-neutral-50 border border-neutral-200 rounded-md z-10"
        :class="{ 'w-full': showSelectedOption, 'w-max': !showSelectedOption }"
        @click.stop="toggleDropdown"
      >
        <p
          v-for="option in options"
          class="flex items-center gap-x-3 hover:bg-neutral-200 px-3 py-1.5 cursor-pointer select-none"
          :class="{
            'bg-gray-200 pointer-events-none': option.name === modelValue.name,
          }"
          @click="$emit('update:modelValue', option)"
        >
          <Component
            v-if="option.icon"
            :is="option.icon"
            class="dropdown-icons w-5 h-5"
          />
          <span>
            {{ option.name }}
          </span>
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

.dropdown-icons {
  stroke-width: 1.5px;
}
</style>
