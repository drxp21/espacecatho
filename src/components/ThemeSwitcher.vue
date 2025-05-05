<script setup>
import { ref, onMounted } from 'vue';
import Tooltip from './Tooltip.vue';

const props = defineProps({
    isLanding: {
        type: Boolean,
        required: false,
        default: false
    },
    compact: {
        type: Boolean,
        required: false,
        default: false
    }
});

// Reactive state to track the theme
const currentTheme = ref('system');
const isMenuOpen = ref(false);

// Initialize theme from localStorage
onMounted(() => {
    currentTheme.value = localStorage.getItem('theme') || 'system';
    applyTheme();

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (currentTheme.value === 'system') {
            applyTheme();
        }
    });
});

// Close dropdown when clicking outside
onMounted(() => {
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.closest('.theme-switcher')) {
            isMenuOpen.value = false;
        }
    });
});

// Apply the theme
function applyTheme() {
    if (currentTheme.value === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    } else if (currentTheme.value === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    } else {
        // System preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
        document.documentElement.classList.toggle('light', !prefersDark);
    }
    window.dispatchEvent(new Event('themeChanged'));
}

// Toggle theme based on user selection
function setTheme(theme) {
    currentTheme.value = theme;
    localStorage.setItem('theme', theme);
    applyTheme();
    isMenuOpen.value = false;
}

// Get active state class
const getActiveClass = (theme) => {
    return currentTheme.value === theme ?
        'bg-indigo-50 dark:bg-indigo-900/30' :
        'hover:bg-gray-100 dark:hover:bg-gray-800/50';
}
</script>

<template>
    <Tooltip text="Changer de mode" position="bottom">
        <!-- Simple mode for landing pages -->
        <div v-if="isLanding" class="theme-switcher">
            <button @click="setTheme(currentTheme === 'dark' ? 'light' : 'dark')"
                class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-opacity-50 transition-all">
                <!-- Light mode icon -->
                <svg v-if="currentTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" class="w-5 h-5 text-amber-500">
                    <path
                        d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>

                <!-- Dark mode icon -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 text-indigo-600 dark:text-indigo-400">
                    <path fill-rule="evenodd"
                        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <!-- Compact mode (button with dropdown) -->
        <div v-else-if="compact" class="theme-switcher relative">
            <button @click="isMenuOpen = !isMenuOpen"
                class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-opacity-50 transition-all">
                <!-- Light mode icon -->
                <svg v-if="currentTheme === 'light'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" class="w-5 h-5 text-amber-500">
                    <path
                        d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>

                <!-- Dark mode icon -->
                <svg v-else-if="currentTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" class="w-5 h-5 text-indigo-600 dark:text-indigo-400">
                    <path fill-rule="evenodd"
                        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                        clip-rule="evenodd" />
                </svg>

                <!-- System mode icon -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 text-emerald-600 dark:text-emerald-400">
                    <path fill-rule="evenodd"
                        d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5z"
                        clip-rule="evenodd" />
                </svg>
            </button>

            <!-- Dropdown -->
            <div v-show="isMenuOpen"
                class="absolute right-0 mt-2 w-11 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700"
                style="top: 100%">
                <!-- Light Option -->
                <button @click="setTheme('light')" class="w-full flex justify-center items-center p-2 transition-colors"
                    :class="getActiveClass('light')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-5 h-5 text-amber-500">
                        <path
                            d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </svg>
                </button>

                <!-- Dark Option -->
                <button @click="setTheme('dark')" class="w-full flex justify-center items-center p-2 transition-colors"
                    :class="getActiveClass('dark')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-5 h-5 text-indigo-600 dark:text-indigo-400">
                        <path fill-rule="evenodd"
                            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                            clip-rule="evenodd" />
                    </svg>
                </button>

                <!-- System Option -->
                <button @click="setTheme('system')" class="w-full flex justify-center items-center p-2 transition-colors"
                    :class="getActiveClass('system')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-5 h-5 text-emerald-600 dark:text-emerald-400">
                        <path fill-rule="evenodd"
                            d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Full mode (segmented control) -->
        <div v-else class="theme-switcher flex items-center p-1 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-inner">
            <!-- Light Option -->
            <button @click="setTheme('light')" class="p-2 rounded-md transition-all duration-200"
                :class="[getActiveClass('light'), currentTheme === 'light' ? 'shadow-sm' : '']">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 text-amber-500">
                    <path
                        d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
            </button>

            <!-- Dark Option -->
            <button @click="setTheme('dark')" class="p-2 rounded-md transition-all duration-200"
                :class="[getActiveClass('dark'), currentTheme === 'dark' ? 'shadow-sm' : '']">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 text-indigo-600 dark:text-indigo-400">
                    <path fill-rule="evenodd"
                        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                        clip-rule="evenodd" />
                </svg>
            </button>

            <!-- System Option -->
            <button @click="setTheme('system')" class="p-2 rounded-md transition-all duration-200"
                :class="[getActiveClass('system'), currentTheme === 'system' ? 'shadow-sm' : '']">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 text-emerald-600 dark:text-emerald-400">
                    <path fill-rule="evenodd"
                        d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </Tooltip>
</template>

<style scoped>
.theme-switcher button {
    transition: all 0.2s ease;
}

/* Hover effect */
.theme-switcher button:hover svg {
    transform: scale(1.15);
}

/* Active effect */
.theme-switcher button:active svg {
    transform: scale(0.9);
}
</style>