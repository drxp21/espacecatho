<template>
    <section id="home" class="relative pt-20 pb-5 transition-colors duration-300 bg-stone-50 dark:bg-stone-900">
        <!-- Background image with overlay -->
        <div class="absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-10"
            style="background-image: url('/images/cathedral-background.jpg')"></div>

        <!-- Subtle cross design element -->
        <div class="absolute h-48 top-14 right-0 w-32 h-64 opacity-20 dark:opacity-10 overflow-hidden rotate-180">
            <div class="w-8 h-64 mx-auto bg-yellow-700 dark:bg-yellow-600"></div>
            <div class="w-32 h-8 -mt-36 bg-yellow-700 dark:bg-yellow-600"></div>
        </div>

        <div class="container relative mx-auto px-4 z-10">
            <div class="flex flex-col lg:flex-row items-center justify-between">
                <!-- Text content -->
                <div class="lg:w-1/2 mb-12 lg:mb-0">
                    <h1
                        class="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-6 text-stone-800 dark:text-stone-200">
                        <span class="block">Pelerinage Marial de Popenguine </span>
                        <span class="block text-yellow-700 dark:text-yellow-500">137 ème édition</span>
                    </h1>

                    <p class="text-lg font-serif mb-8 text-stone-700 dark:text-stone-300 max-w-xl">
                        Ensemble, marchons dans la foi et l'espérance, guidés par le thème de cette année : « Marie,
                        Mère de l'espérance, marche avec nous ».
                    </p>

                    <div class="flex flex-wrap gap-4">
                        <router-link :to="{ name: 'inscription' }"
                            class="px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white font-medium rounded shadow transition dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500">
                            S'inscrire à la marche-pélerinage
                        </router-link>

                    </div>


                </div>

                <!-- Countdown component -->
                <div class="lg:w-5/12">
                    <div class="relative overflow-hidden">
                        <!-- Card with subtle design elements -->
                        <div
                            class="p-8 bg-white dark:bg-stone-800 rounded-lg shadow-md border border-stone-200 dark:border-stone-700">
                            <div class="absolute top-0 right-0 w-20 h-20 ">
                                <div
                                    class="absolute transform rotate-45 bg-yellow-600 text-white font-semibold py-1 right-[-40px] top-[30px] w-[170px] text-center text-xs">
                                    À ne pas manquer
                                </div>
                            </div>

                            <h2
                                class="text-center text-2xl md:text-3xl font-serif font-semibold mb-6 text-stone-800 dark:text-stone-200">
                                Compte à Rebours
                            </h2>

                            <p class="text-center mb-6 text-stone-600 dark:text-stone-400 font-serif">
                                Les 07 08 et 09 Juin 2025
                            </p>

                            <div v-if="!isExpired" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="flex flex-col items-center">
                                    <div
                                        class="bg-stone-100 dark:bg-stone-900 rounded w-full h-20 flex items-center justify-center shadow-inner border border-stone-200 dark:border-stone-700">
                                        <span
                                            class="text-3xl font-serif font-semibold text-stone-800 dark:text-stone-200">{{
                                                days }}</span>
                                    </div>
                                    <span
                                        class="mt-2 text-sm font-medium text-stone-600 dark:text-stone-400">Jours</span>
                                </div>

                                <div class="flex flex-col items-center">
                                    <div
                                        class="bg-stone-100 dark:bg-stone-900 rounded w-full h-20 flex items-center justify-center shadow-inner border border-stone-200 dark:border-stone-700">
                                        <span
                                            class="text-3xl font-serif font-semibold text-stone-800 dark:text-stone-200">{{
                                                hours }}</span>
                                    </div>
                                    <span
                                        class="mt-2 text-sm font-medium text-stone-600 dark:text-stone-400">Heures</span>
                                </div>

                                <div class="flex flex-col items-center">
                                    <div
                                        class="bg-stone-100 dark:bg-stone-900 rounded w-full h-20 flex items-center justify-center shadow-inner border border-stone-200 dark:border-stone-700">
                                        <span
                                            class="text-3xl font-serif font-semibold text-stone-800 dark:text-stone-200">{{
                                                minutes }}</span>
                                    </div>
                                    <span
                                        class="mt-2 text-sm font-medium text-stone-600 dark:text-stone-400">Minutes</span>
                                </div>

                                <div class="flex flex-col items-center">
                                    <div
                                        class="bg-stone-100 dark:bg-stone-900 rounded w-full h-20 flex items-center justify-center shadow-inner border border-stone-200 dark:border-stone-700">
                                        <span
                                            class="text-3xl font-serif font-semibold text-stone-800 dark:text-stone-200">{{
                                                seconds }}</span>
                                    </div>
                                    <span
                                        class="mt-2 text-sm font-medium text-stone-600 dark:text-stone-400">Secondes</span>
                                </div>
                            </div>

                            <div v-else
                                class="text-xl text-center text-red-700 dark:text-red-400 font-bold mt-4 py-6 font-serif">
                                L'événement a commencé !
                            </div>


                            <!-- Theme switcher placement -->
                            <div class="mt-6 flex justify-center">
                                <slot name="theme-switcher"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'CatholicHeroSection',

    props: {
        dueDate: {
            type: [Date, String],
            required: true
        },
        eventName: {
            type: String,
            default: 'Notre Événement'
        },
        location: {
            type: String,
            default: 'Église Saint-Pierre'
        },
        address: {
            type: String,
            default: '12 Rue de la Paroisse'
        }
    },

    data() {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            interval: null,
            isExpired: false
        }
    },

    mounted() {
        this.startCountdown();
    },

    beforeUnmount() {
        this.stopCountdown();
    },

    methods: {
        startCountdown() {
            // Update countdown immediately
            this.updateCountdown();

            // Set interval to update every second
            this.interval = setInterval(() => {
                this.updateCountdown();
            }, 1000);
        },

        stopCountdown() {
            clearInterval(this.interval);
        },

        updateCountdown() {
            const now = new Date().getTime();
            const targetDate = new Date(this.dueDate).getTime();
            const timeRemaining = targetDate - now;

            if (timeRemaining <= 0) {
                this.days = 0;
                this.hours = 0;
                this.minutes = 0;
                this.seconds = 0;
                this.isExpired = true;
                this.stopCountdown();
                return;
            }

            // Calculate time units
            this.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        }
    }
}
</script>