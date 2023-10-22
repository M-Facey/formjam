<script lang="ts" setup>
import { ref } from "vue";
import IconMenu from "../icons/Menu.vue";
import IconClose from "../icons/Close.vue";

const showNavDropdown = ref(false);
function toggleNavDropdown() {
  showNavDropdown.value = !showNavDropdown.value;
}
</script>

<template>
  <header
    class="sticky top-0 w-full bg-primary-dark-800 flex items-center py-4 px-3 md:px-6 border-b border-primary-dark-500 z-50"
  >
    <div
      class="w-full max-w-[1200px] flex items-center justify-between mx-auto"
    >
      <div class="flex items-center gap-x-3 select-none">
        <img src="../../assets/vue.svg" alt="logo" class="h-7 md:h-8 mb-2" />
        <h1 class="text-xl md:text-2xl leading-4 font-bold">FormJAM</h1>
      </div>

      <nav class="hidden md:flex items-center gap-x-3">
        <RouterLink to="/auth/signup">
          <button
            class="hover:bg-white/10 border border-white/30 py-2 px-4 font-light rounded-lg select-none"
          >
            Sign up
          </button>
        </RouterLink>
        <RouterLink to="/auth/login">
          <button
            class="btn relative bg-primary-dark-500 py-2 px-4 font-medium rounded-md select-none"
          >
            <p class="relative z-10">Log in</p>
          </button>
        </RouterLink>
      </nav>

      <div class="block md:hidden" @click.stop="toggleNavDropdown">
        <button class="p-1.5 border border-primary-dark-100 rounded-md">
          <IconMenu class="w-6 h-6" :class="{ hidden: showNavDropdown }" />
          <IconClose class="w-6 h-6" :class="{ hidden: !showNavDropdown }" />
        </button>

        <nav
          v-if="showNavDropdown"
          class="absolute top-full left-0 translate-y-[1px] w-full flex flex-col gap-y-2 bg-black p-4 z-50"
        >
          <RouterLink to="/auth/signup">
            <button
              class="w-full hover:bg-white/10 border border-white/30 py-2 px-4 font-light rounded-lg select-none"
            >
              Sign up
            </button>
          </RouterLink>
          <RouterLink to="/auth/login">
            <button
              class="w-full btn relative bg-primary-dark-500 py-2 px-4 font-medium rounded-md select-none"
            >
              <p class="relative z-10">Log in</p>
            </button>
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.btn::before {
  content: "";
  position: absolute;
  inset: 0px;
  opacity: 0.45;
  transform: translate3d(0, 0, -1px);
  background: linear-gradient(#ff007a, #7000ff, #ff007a, #7000ff);
  background-size: 400% 400%;
  animation: btn-pan-down 3s linear infinite;
  filter: blur(10px);
  clip-path: polygon(
    -100vmax -100vmax,
    100vmax -100vmax,
    100vmax 100vmax,
    -100vmax 100vmax,
    -100vmax -100vmax,
    0 0,
    0 100%,
    100% 100%,
    100% 0,
    0 0
  );
}

.btn {
  background-image: linear-gradient(to left, #ff007a, #7000ff, #ff007a);
  background-size: 200%;
  animation: btn-pan-down 3s linear infinite;
}

.btn::after {
  content: "";
  position: absolute;
  inset: 1px;
  @apply bg-neutral-900 transition rounded-[5px];
}

@keyframes btn-pan-down {
  from {
    background-position: 0% center;
  }

  to {
    background-position: -200% center;
  }
}
</style>
