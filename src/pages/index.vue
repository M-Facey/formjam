<script lang="ts" setup>
import HomeNavbar from "../components/home/HomeNavbar.vue";
import InfoCard from "../components/home/InfoCard.vue";
</script>

<template>
  <HomeNavbar />
  <div
    class="w-full max-w-[1200px] text-white flex flex-grow flex-col items-center px-3 sm:px-6 mx-auto"
  >
    <h2
      class="text-lg sm:text-2xl md:text-4xl text-center mt-12 mb-1 md:mb-3 text-white/80"
    >
      Welcome to FormJAM
    </h2>
    <h2
      class="bg-gradient-to-r from-primary-purple via-primary-pink to-primary-orange pb-10 mx-auto text-3xl sm:text-4xl md:text-5xl text-center text-transparent font-bold bg-clip-text"
    >
      Revolutionize Your Data Collection
    </h2>

    <div class="w-full flex flex-col lg:flex-row gap-4 lg:mt-auto mb-7 z-10">
      <InfoCard
        icon="📋"
        heading="Streamline Data Collection"
        content=" Effortlessly gather information, whether it's surveys, feedback, or
          applications. Say goodbye to paperwork and hello to efficiency."
      />

      <InfoCard
        icon="📈"
        heading="Powerful Analytics"
        content="Unlock insights with our advanced analytics tools. Visualize data,
          track trends, and make informed decisions."
      />

      <InfoCard
        icon="📱"
        heading="Anytime, Anywhere"
        content="Access your forms on the go. Our mobile-friendly platform ensures you
          can collect data from anywhere, anytime."
      />
    </div>

    <div class="hidden md:block relative mt-auto">
      <img
        src="../assets/images/bg-circle.png"
        alt="circles"
        class="absolute bottom-0"
      />
      <img
        src="../assets/images/dashboard-dark.png"
        alt="dashboard"
        class="relative"
      />
    </div>
  </div>
  <footer class="w-full py-2 border-t border-primary-dark-100 text-center">
    <p>
      Copyright © {{ new Date().getFullYear() }}
      <a
        href="https://github.com/M-Facey"
        class="underline text-white/60 hover:text-white"
        >Murphy Facey</a
      >
    </p>
  </footer>
</template>
