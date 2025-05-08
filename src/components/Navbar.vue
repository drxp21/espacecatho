<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ThemeSwitcher from './ThemeSwitcher.vue';

const mobileMenuOpen = ref(false);
const isScrolled = ref(false);
const activeSection = ref('home');

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;

    // Prevent background scrolling when menu is open
    if (mobileMenuOpen.value) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

// Handle scroll events for navbar appearance
const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;

    // Update active section based on scroll position
    const sections = ['home', 'events', 'about', 'contact'];

    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                activeSection.value = section;
                break;
            }
        }
    }
};



// Lifecycle hooks
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    // Set initial active section
    activeSection.value = 'home';
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <header class="fixed inset-x-0 top-0 py-3 z-50 transition-all duration-300"
        :class="[isScrolled ? 'bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm shadow-md' : 'bg-transparent']">
        <div class="w-full px-4 sm:px-6 md:px-8 max-w-screen-lg lg:max-w-screen-xl mx-auto relative">
            <nav class="flex items-center justify-between w-full relative">
                <!-- Logo -->
                <div class="inline-flex relative bg-inherit z-20">
                    <router-link to="/"
                        class="router-link-active router-link-exact-active flex items-center gap-2 transition-transform hover:scale-105">
                        <img src="../assets/logo.png" class="w-56 filter drop-shadow-xl drop-shadow-red-500"
                            alt="Espace Catholique" />
                    </router-link>
                </div>

                <!-- Desktop menu -->
                <div class="absolute top-full px-4 sm:px-6 md:px-8 lg:px-0 lg:pt-0 lg:top-0 bg-white dark:bg-stone-900 lg:bg-transparent lg:dark:bg-transparent w-full lg:w-max py-6 lg:py-0 lg:relative flex transition-all duration-300 ease-in-out origin-top z-10 max-h-[85vh] lg:max-h-none overflow-y-auto lg:overflow-visible"
                    :class="[mobileMenuOpen ? 'visible opacity-100 translate-y-0 rounded-lg border border-stone-200 dark:border-stone-700 shadow-lg' : 'invisible opacity-0 -translate-y-4 lg:visible lg:opacity-100 lg:translate-y-0 lg:border-none lg:shadow-none']">
                    <ul
                        class="text-stone-700 dark:text-stone-300 w-full flex lg:items-center gap-y-4 lg:gap-x-4 xl:gap-x-8 flex-col lg:flex-row font-serif">
                        <li class="lg:inline-flex">
                            <router-link to="/#home" custom v-slot="{ navigate, isActive }">
                                <a @click="navigate"
                                    class="lg:inline-flex transition-all ease-out duration-200 text-base lg:text-lg relative px-2 py-1"
                                    :class="[
                                        isActive
                                            ? 'text-yellow-700 dark:text-yellow-500 font-medium'
                                            : 'hover:text-yellow-700 dark:hover:text-yellow-500'
                                    ]">
                                    Accueil
                                   
                                </a>
                            </router-link>
                        </li>
                        <li class="lg:inline-flex">
                            <router-link to="#footer"
                                class="lg:inline-flex transition-all ease-out duration-200 text-base lg:text-lg relative px-2 py-1"
                                :class="[activeSection === 'events' ? 'text-yellow-700 dark:text-yellow-500 font-medium' : 'hover:text-yellow-700 dark:hover:text-yellow-500']">
                                Événements
                                <span v-if="activeSection === 'events'"
                                    class="absolute hidden lg:block bottom-0 left-0 w-full h-0.5 bg-yellow-700 dark:bg-yellow-500 rounded-full transform scale-x-100 transition-transform origin-left"></span>
                            </router-link>
                        </li>
                        <li class="lg:inline-flex">
                            <router-link to="/#footer"
                                class="lg:inline-flex transition-all ease-out duration-200 text-base lg:text-lg relative px-2 py-1"
                                :class="[activeSection === 'about' ? 'text-yellow-700 dark:text-yellow-500 font-medium' : 'hover:text-yellow-700 dark:hover:text-yellow-500']">
                                À propos
                                <span v-if="activeSection === 'about'"
                                    class="absolute hidden lg:block bottom-0 left-0 w-full h-0.5 bg-yellow-700 dark:bg-yellow-500 rounded-full transform scale-x-100 transition-transform origin-left"></span>
                            </router-link>
                        </li>
                        <li class="lg:inline-flex">
                            <router-link to="/#footer"
                                class="lg:inline-flex transition-all ease-out duration-200 text-base lg:text-lg relative px-2 py-1"
                                :class="[activeSection === 'contact' ? 'text-yellow-700 dark:text-yellow-500 font-medium' : 'hover:text-yellow-700 dark:hover:text-yellow-500']">
                                Contact
                                <span v-if="activeSection === 'contact'"
                                    class="absolute hidden lg:block bottom-0 left-0 w-full h-0.5 bg-yellow-700 dark:bg-yellow-500 rounded-full transform scale-x-100 transition-transform origin-left"></span>
                            </router-link>
                        </li>

                        <a href="https://admin.espacecatho.com"
                            class="px-4 xl:px-5 py-2 rounded-md relative group overflow-hidden block lg:hidden">
                            <span
                                class="absolute inset-0 rounded-md transition-all duration-300 ease-in-out bg-yellow-700 dark:bg-yellow-600 border border-yellow-800 dark:border-yellow-700 group-hover:bg-yellow-800 dark:group-hover:bg-yellow-700">
                            </span>
                            <span
                                class="relative flex items-center justify-center text-white text-sm xl:text-base whitespace-nowrap">
                                Connexion
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                        </a>
                    </ul>
                </div>

                <!-- Right side buttons -->
                <div class="flex items-center bg-inherit gap-1 lg:gap-3 min-w-max z-20">
                    <!-- Theme switcher -->
                    <div class="relative py-2">
                        <ThemeSwitcher :isLanding="true" />
                    </div>

                    <!-- Login/Register buttons (desktop only) -->
                    <div class="hidden lg:flex lg:items-center gap-3 xl:gap-4">
                        <a href="https://admin.espacecatho.com"
                            class="px-4 xl:px-5 py-2 rounded-md relative group overflow-hidden">
                            <span
                                class="absolute inset-0 rounded-md transition-all duration-300 ease-in-out bg-yellow-700 dark:bg-yellow-600 border border-yellow-800 dark:border-yellow-700 group-hover:bg-yellow-800 dark:group-hover:bg-yellow-700">
                            </span>
                            <span
                                class="relative flex items-center justify-center text-white text-sm xl:text-base font-serif whitespace-nowrap">
                                Connexion
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                        </a>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="flex lg:hidden items-center">
                        <button @click="toggleMobileMenu" aria-label="Toggle navigation menu"
                            class="outline-none bg-transparent p-2.5 rounded-md text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:ring-2 focus:ring-yellow-600 transition-all duration-200">
                            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>

        <!-- Mobile menu overlay -->
        <div v-if="mobileMenuOpen" class="fixed inset-0 bg-black/30 backdrop-blur-sm z-0" @click="toggleMobileMenu">
        </div>
    </header>
</template>

<style scoped>
@keyframes slideIn {
    from {
        transform: translateY(-10px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.nav-item-appear {
    animation: slideIn 0.3s ease forwards;
}
</style>