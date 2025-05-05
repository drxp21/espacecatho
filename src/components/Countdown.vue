<template>
    <section
        class="relative overflow-hidden py-16 transition-colors duration-300 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-blue-900 dark:to-purple-950">
        <!-- Background decorative elements -->
        <div
            class="absolute -top-24 -right-24 w-96 h-96 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-pulse">
        </div>
        <div
            class="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-200 dark:bg-yellow-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-pulse delay-700">
        </div>

        <div class="container mx-auto px-4">
            <div class="flex flex-col lg:flex-row items-center justify-between">
                <!-- Text content -->
                <div class="lg:w-1/2 mb-12 lg:mb-0 z-10">
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-blue-800 dark:text-blue-300">
                        <span class="block">Un événement</span>
                        <span class="block text-purple-700 dark:text-purple-400">extraordinaire arrive</span>
                    </h1>
                    <p class="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300">
                        Ne manquez pas cette occasion unique. Préparez-vous pour une expérience inoubliable qui changera
                        votre perspective.
                    </p>
                    <div class="flex space-x-4">
                        <button
                            class="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-lg transform transition hover:scale-105 dark:bg-purple-700 dark:hover:bg-purple-600">
                            S'inscrire
                        </button>
                        <button
                            class="px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30">
                            En savoir plus
                        </button>
                    </div>
                </div>

                <!-- Countdown component -->
                <div class="lg:w-1/2 z-10">
                    <div
                        class="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 dark:border-blue-900">
                        <h2 class="text-center text-2xl md:text-3xl font-bold mb-8 text-blue-800 dark:text-blue-300">
                            Compte à Rebours
                        </h2>

                        <div v-if="!isExpired" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="flex flex-col items-center">
                                <div
                                    class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-800 dark:to-purple-900 rounded-lg w-full h-24 flex items-center justify-center shadow-inner border border-blue-100 dark:border-blue-800">
                                    <span
                                        class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{{
                                        days }}</span>
                                </div>
                                <span class="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">Jours</span>
                            </div>

                            <div class="flex flex-col items-center">
                                <div
                                    class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-800 dark:to-purple-900 rounded-lg w-full h-24 flex items-center justify-center shadow-inner border border-blue-100 dark:border-blue-800">
                                    <span
                                        class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{{
                                        hours }}</span>
                                </div>
                                <span class="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">Heures</span>
                            </div>

                            <div class="flex flex-col items-center">
                                <div
                                    class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-800 dark:to-purple-900 rounded-lg w-full h-24 flex items-center justify-center shadow-inner border border-blue-100 dark:border-blue-800">
                                    <span
                                        class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{{
                                        minutes }}</span>
                                </div>
                                <span class="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">Minutes</span>
                            </div>

                            <div class="flex flex-col items-center">
                                <div
                                    class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-800 dark:to-purple-900 rounded-lg w-full h-24 flex items-center justify-center shadow-inner border border-blue-100 dark:border-blue-800">
                                    <span
                                        class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{{
                                        seconds }}</span>
                                </div>
                                <span class="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">Secondes</span>
                            </div>
                        </div>

                        <div v-else class="text-xl text-center text-red-600 dark:text-red-400 font-bold mt-4 py-6">
                            Le délai est expiré !
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'CountdownHero',

    props: {
        dueDate: {
            type: [Date, String],
            required: true
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