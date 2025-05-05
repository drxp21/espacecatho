<template>
    <footer id="footer" class="bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
        <div class="container mx-auto px-4 md:px-8 py-12">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    

                <!-- Liens utiles -->
                <div>
                    <h4
                        class="font-serif text-lg mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        Liens utiles
                    </h4>
                    <ul class="space-y-3">
                        <li v-for="link in usefulLinks" :key="link">
                            <a href="#"
                                class="text-stone-600 dark:text-stone-400 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors hover:underline">
                                {{ link }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4
                        class="font-serif text-lg mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        Contact
                    </h4>
                    <div class="space-y-4 text-stone-600 dark:text-stone-400">
                        <div class="flex items-start gap-3">
                            <LocationMarkerIcon class="w-5 h-5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
                            <span>Dakar, Rufisque</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <MailIcon class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                            <a href="mailto:contact@espacecatho.com" class="hover:underline">contact@espacecatho.com</a>
                        </div>
                        <div class="flex items-center gap-3">
                            <PhoneIcon class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                            <a href="tel:+221773248363" class="hover:underline">+221 77 324 83 63</a>
                        </div>
                    </div>
                </div>

                <!-- À propos -->
                <div class="md:col-span-2 lg:col-span-1">
                    <h4
                        class="font-serif text-lg mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        À propos
                    </h4>
                    <p class="text-stone-600 dark:text-stone-400 leading-relaxed">
                        Le 137ème pèlerinage marial de Poponguine est un événement spirituel unique
                        rassemblant des milliers de pèlerins chaque année. Rejoignez-nous du
                        7 au 9 juin 2025 pour marcher dans la foi et l'espérance.
                    </p>
                </div>
                <img src="../assets/logo.png" class="w-full filter drop-shadow-xl drop-shadow-red-500 my-auto"
                        alt="Espace Catholique" />
            </div>

            <!-- Copyright -->
            <div class="pt-8 border-t border-stone-200 dark:border-stone-800 text-center">
                <p class="text-sm text-stone-500 dark:text-stone-500">
                    © 2025 EspaceCatho. Tous droits réservés.
                    <span class="mx-2">•</span>
                    <a href="#" class="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Mentions
                        légales</a>
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
// Icônes Heroicons
const LocationMarkerIcon = {
    template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>`
}

const MailIcon = {
    template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>`
}

const PhoneIcon = {
    template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>`
}

const usefulLinks = [
    'Accueil',
    'Sponsors',
    'Lecture du jour',
    'Gallery',
    'Souscription pack marcheur'
]

const quickAccess = [
    'Les termes d\'utilisation',
    'Politique de confidentialité',
    'FAQ',
    'Blog spirituel',
    'Espace médias'
]
</script>

<style>
/* Animation hover sur les liens */
a {
    @apply transition-colors duration-300;
}

/* Adaptation des icônes au dark mode */
.dark .icon-path {
    @apply stroke-stone-400;
}
</style>