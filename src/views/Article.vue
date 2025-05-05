<!-- src/components/ResourceDetail.vue -->
<template>
    <Layout>
        <div class="container mx-auto px-4 md:px-8 py-12 md:py-20 bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 transition-colors duration-500">
            <button @click="router.back()"
                class="mb-8 group inline-flex items-center gap-2 text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 transition-all">
                <span class="text-2xl transition-transform group-hover:-translate-x-1">←</span>
                <span class="text-lg font-medium border-b-2 border-transparent group-hover:border-current">
                    Retour aux ressources
                </span>
            </button>

            <div class="max-w-4xl mx-auto">
               

                <div class="relative mb-12 group">
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                    </div>
                    <img :src="article.image" :alt="article.title"
                        class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-[1.01] object-[55%_25%]" />
                </div>

                <div class="relative pb-8">
                    <div
                        class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-20">
                    </div>
                </div>

                <div v-html="contentHtml" class="prose prose-stone dark:prose-invert prose-lg max-w-none 
                            prose-headings:font-serif prose-headings:tracking-tight
                            prose-a:text-yellow-700 dark:prose-a:text-yellow-400
                            prose-img:rounded-xl prose-img:shadow-lg
                            hover:prose-a:underline prose-blockquote:border-l-4
                            prose-blockquote:border-yellow-400 dark:prose-blockquote:text-stone-300" />
            </div>

            <div class="mt-16 border-t border-stone-200 dark:border-stone-800 pt-8 text-center">
                <div class="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 text-sm">
                    <span>Partager cet article</span>
                    <div class="w-1 h-1 rounded-full bg-current"></div>
                    <div class="flex gap-4">
                        <a href="#"
                            class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Twitter</a>
                        <a href="#"
                            class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">LinkedIn</a>
                        <a href="#" class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Email</a>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '../layouts/Layout.vue'
import { resources } from '../assets/articles/index'

const route = useRoute()
const router = useRouter()


const article = resources.find(r => r.id === route.params.id)
if (!article) {
    router.replace({ name: 'home' })
}
const contentHtml = ref(article.content)

// récupère le HTML local

</script>

<style>
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
    animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.prose :where(code):not(:where([class~="not-prose"] *)) {
    @apply bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded;
}

.prose :where(blockquote):not(:where([class~="not-prose"] *)) {
    @apply bg-stone-50 dark:bg-stone-900/50 px-6 py-4 border-l-4 border-yellow-400;
}
</style>