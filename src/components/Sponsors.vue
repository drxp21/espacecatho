<!-- src/components/SponsorCarousel.vue -->
<template>
    <div v-if="sponsors?.length" class="py-12 pt-16 bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 transition-colors duration-500 relative overflow-hidden">
      <!-- En-tête stylisé -->
      <div class="max-w-4xl mx-auto mb-12 px-4 text-center">
        <h3 class="font-serif text-2xl md:text-3xl bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Nos précieux partenaires
        </h3>
        <div class="mt-4 w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
      </div>
  
      <!-- Conteneur du carrousel -->
      <div class="relative h-28 group">
        <!-- Animation de défilement -->
        <div 
          class="absolute inset-y-0 flex items-center gap-16"
          :style="`animation: scroll ${animationDuration}s linear infinite;`"
          @mouseenter="pauseAnimation"
          @mouseleave="resumeAnimation"
        >
          <!-- Double le contenu pour le défilement fluide -->
          <template v-for="(_, index) in 2" :key="index">
            <a
              v-for="sponsor in sponsors"
              target="_blank"
              rel="noopener"
              class="flex items-center justify-center px-8 transition-opacity opacity-80 hover:opacity-100"
            >
              <img
                :src="sponsor.logo"
                :alt="sponsor.name"
                class="max-h-12 object-contain grayscale hover:grayscale-0 transition-all duration-500"
              />
            </a>
          </template>
        </div>
  
        <!-- Overlays de dégradé -->
        <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-stone-950 to-transparent z-10" />
        <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-stone-950 to-transparent z-10" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    sponsors: {
      type: Array,
      default: () => [
        {
          name: "PixelCraft",
          logo: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
          url: "https://example.com"
        },
        {
          name: "Quantum Beans",
          logo: "https://www.vectorlogo.zone/logos/python/python-icon.svg",
          url: "https://example.com"
        },
        {
          name: "Nebula Labs",
          logo: "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",
          url: "https://example.com"
        },
        {
          name: "Syntax Tree",
          logo: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
          url: "https://example.com"
        },
        {
          name: "ByteBakery",
          logo: "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg",
          url: "https://example.com"
        },
        {
          name: "Code Horizon",
          logo: "https://www.vectorlogo.zone/logos/djangoproject/djangoproject-icon.svg",
          url: "https://example.com"
        },
        {
          name: "Bean Metrics", // Un clin d'œil humoristique
          logo: "https://www.vectorlogo.zone/logos/java/java-icon.svg",
          url: "https://example.com"
        },
        {
          name: "Cloud Forge",
          logo: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg",
          url: "https://example.com"
        }
      ]
    },
    speed: {
      type: Number,
      default: 40
    }
  })
  
  const animationDuration = computed(() => Math.max(10, props.speed - (props.sponsors.length * 2)))
  const isPaused = ref(false)
  
  const pauseAnimation = () => {
    isPaused.value = true
  }
  const resumeAnimation = () => {
    isPaused.value = false
  }
  </script>
  
  <style scoped>
  @keyframes scroll {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
  
  .grayscale {
    filter: grayscale(100%);
  }
  
  .grayscale-0 {
    filter: grayscale(0%);
  }
  
  .dark .grayscale {
    filter: grayscale(100%) brightness(120%);
  }
  
  /* Pause l'animation au survol */
  .group:hover [style*="animation: scroll"] {
    animation-play-state: paused !important;
  }
  </style>