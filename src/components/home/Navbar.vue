<script lang="ts" setup>
import { ref } from "vue";

import IconAdd from "../icons/Add.vue";
import IconUser from "../icons/User.vue";
import TextInput from "../inputs/TextInput.vue";
import XButton from "../inputs/Button.vue";

const searchParam = ref("");
</script>

<template>
  <header class="bg-neutral-100 border-b border-neutral-200 px-6 py-3">
    <div class="container flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-x-2">
        <img src="../../assets/vue.svg" class="max-h-[30px]" />
        <p class="text-2xl text-neutral-700">
          Form<span class="text-neutral-400 font-bold">JAM</span>
        </p>
      </RouterLink>

      <TextInput
        id="search_input"
        type="text"
        placeholder="Search"
        is-searchable
        v-model="searchParam"
      />
      <div class="flex gap-x-2">
        <RouterLink to="/form/create">
          <XButton text="Create Form" :has-icon="false" class="font-medium">
            <template #icon>
              <IconAdd class="w-6 h-6 mr-2" />
            </template>
          </XButton>
        </RouterLink>

        <XButton text="" :has-icon="false" class="font-medium">
          <template #icon>
            <IconUser class="w-6 h-6" />
          </template>
        </XButton>
      </div>
    </div>
  </header>
</template>
