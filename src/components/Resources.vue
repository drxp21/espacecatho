<!-- src/components/ResourcesSection.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { resources } from '../assets/articles/index'

const articles = ref([])

onMounted(() => {
    articles.value = resources
})
</script>

<template>
    <section id="resources"
        class="py-16 bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 transition-colors duration-500">
        <!-- En-tête -->
        <div class="container mx-auto px-4 text-center mb-12">
            <h2 class="text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
                Ressources
            </h2>
            <p class="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
                Toutes les ressources nécessaires pour vous aider à vous préparer au pèlerinage de Poponguine 2025.
                Vous trouverez ici des articles, des vidéos et d’autres contenus utiles pour enrichir votre expérience.
            </p>
        </div>

        <!-- Grille de cartes -->
        <div class="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(article, idx) in articles" :key="article.id" class="opacity-0 fade-in-up bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700
               rounded-lg overflow-hidden shadow transition transform hover:scale-105 hover:shadow-lg duration-300"
                :style="{ animationDelay: `${idx * 150}ms` }">
                <router-link :to="{ name: 'article', params: { id: article.id } }">
                    <!-- Image -->
                    <div class="overflow-hidden group">
                        <img :src="`article.image`" :alt="article.title" loading="lazy"
                            class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <!-- Contenu -->
                    <div class="p-6 flex flex-col h-full">
                        <h3 class="text-2xl font-serif font-semibold text-stone-800 dark:text-stone-200 mb-2">
                            {{ article.title }}
                        </h3>
                        <p class="text-stone-600 dark:text-stone-400 flex-grow leading-relaxed">
                            {{ article.description }}
                        </p>
                        <button class="mt-4 self-start px-4 py-2 border border-yellow-700 text-yellow-700 rounded
                   hover:bg-yellow-700 hover:text-white transition">
                            En savoir plus
                        </button>
                    </div>
                </router-link>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
}
</style>
