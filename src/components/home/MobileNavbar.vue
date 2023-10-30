<script lang="ts" setup>
import { ref } from "vue";

import IconAdd from "../icons/controls/Add.vue";
import IconSearch from "../icons/input/Search.vue";
import IconLogout from "../icons/controls/Logout.vue";

import XTextInput from "../inputs/TextInput.vue";
import XButton from "../inputs/Button.vue";
import XDropdown from "../inputs/Dropdown.vue";

const searchParam = ref("");

const navbarOptions = ref([
  { name: "Create Form", value: "create-form", icon: IconAdd },
  { name: "Log out", value: "log-out", icon: IconLogout },
]);

const showSearchInput = ref(false);
function toggleSearchInput() {
  showSearchInput.value = !showSearchInput.value;
}
</script>

<template>
  <header>
    <div class="bg-neutral-100 border-b border-neutral-200 px-6 py-3">
      <div class="container flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-x-2">
          <img src="../../assets/vue.svg" class="max-h-[30px]" />
          <p class="text-2xl text-neutral-700">
            Form<span class="text-neutral-400 font-bold">JAM</span>
          </p>
        </RouterLink>

        <div class="flex items-center gap-x-3">
          <XButton
            class="font-medium"
            text=""
            :has-icon="false"
            @trigger-event="toggleSearchInput"
          >
            <template #icon>
              <IconSearch class="w-6 h-6" />
            </template>
          </XButton>

          <XDropdown
            :select-option="navbarOptions[0]"
            :options="navbarOptions"
            :show-selected-option="false"
          />
        </div>
      </div>
    </div>

    <div
      v-if="showSearchInput"
      class="flex items-center justify-center gap-x-4 bg-gray-100 py-2"
    >
      <XTextInput
        id="mobile-search-input"
        type="text"
        v-model="searchParam"
        placeholder="Search"
        is-searchable
      />
    </div>
  </header>
</template>
