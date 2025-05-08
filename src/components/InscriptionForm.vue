<template>
    <section class="py-20 bg-stone-50 dark:bg-stone-900" id="inscription">
        <div class="container mx-auto px-4 max-w-3xl">
            <!-- Section title -->
            <div class="text-center mb-10">
                <h2 class="text-3xl md:text-4xl font-serif font-semibold mb-4 text-stone-800 dark:text-stone-200">
                    Inscription au Pèlerinage
                </h2>
                <p class="text-stone-600 dark:text-stone-400 font-serif max-w-xl mx-auto">
                    Remplissez ce formulaire pour vous inscrire au 137ème pèlerinage marial de Poponguine.
                    Toutes les informations sont nécessaires pour finaliser votre inscription.
                </p>
            </div>

            <!-- Progress steps -->
            <div class="mb-8 transition-all duration-500">
                <div class="grid grid-cols-4 justify-end">
                    <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center relative">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center font-serif border-2 relative z-10"
                            :class="[
                                currentStep > index
                                    ? 'bg-yellow-600 border-yellow-600 text-white dark:bg-yellow-700 dark:border-yellow-700'
                                    : currentStep === index
                                        ? 'bg-white dark:bg-stone-800 border-yellow-600 dark:border-yellow-500 text-yellow-600 dark:text-yellow-500'
                                        : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600 text-stone-400 dark:text-stone-500'
                            ]">
                            <span v-if="currentStep > index">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                            <span v-else>{{ index + 1 }}</span>
                        </div>
                        <span class="text-xs text-center mt-2 font-serif" :class="[
                            currentStep >= index
                                ? 'text-yellow-700 dark:text-yellow-500 font-medium'
                                : 'text-stone-500 dark:text-stone-400'
                        ]">
                            {{ step }}
                        </span>

                        <!-- Line connecting steps -->
                        <div v-if="index < steps.length - 1"
                            class="ml-0 md:ml-10 absolute top-5 left-10 w-full h-0.5 -z-0" :class="[
                                currentStep > index
                                    ? 'bg-yellow-600 dark:bg-yellow-700'
                                    : 'bg-stone-200 dark:bg-stone-700'
                            ]"></div>
                    </div>
                </div>
            </div>

            <!-- Form container with subtle decoration -->
            <div class="relative">
                <!-- Decorative cross design -->
                <div class="absolute -right-4 -top-4 w-8 h-8 opacity-10">
                    <div class="w-2 h-8 mx-auto bg-yellow-700 dark:bg-yellow-600"></div>
                    <div class="w-8 h-2 -mt-5 bg-yellow-700 dark:bg-yellow-600"></div>
                </div>

                <div
                    class="bg-white dark:bg-stone-800 p-6 md:p-8 rounded-lg shadow-md border border-stone-200 dark:border-stone-700">
                    <form @submit.prevent="nextStep" class="space-y-6">
                        <!-- Step 1: Paroisse -->
                        <div v-if="currentStep === 0">
                            <h3 class="text-xl font-serif font-semibold mb-6 text-stone-800 dark:text-stone-200">
                                Sélectionnez votre paroisse
                            </h3>

                            <div v-if="loading" class="flex justify-center py-6">
                                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-600"></div>
                            </div>

                            <div v-else>
                                <!-- Grid de cards pour les paroisses -->
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div v-for="paroisse in paroisses" :key="paroisse.ID"
                                        @click="selectParoisse(paroisse.ID)"
                                        class="cursor-pointer group transition-all duration-200 ease-in-out" :class="[
                                            formData.paroisse === paroisse.ID.toString()
                                                ? 'ring-2 ring-yellow-600 dark:ring-yellow-500 bg-yellow-50 dark:bg-stone-700'
                                                : 'hover:shadow-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800'
                                        ]">
                                        <div class="flex flex-col items-center p-4 rounded-lg h-full">
                                            <!-- Logo -->
                                            <div
                                                class="w-20 h-20 flex items-center justify-center overflow-hidden rounded-md mb-3 bg-white p-2 border border-stone-200">
                                                <img :src="'data:image/jpeg;base64,' + paroisse.Logo"
                                                    :alt="paroisse.Nom_paroisse"
                                                    class="max-w-full max-h-full object-contain" />
                                            </div>

                                            <!-- Info -->
                                            <div class="text-center flex-grow">
                                                <h4
                                                    class="font-semibold text-stone-800 dark:text-stone-200 group-hover:text-yellow-700 dark:group-hover:text-yellow-500 transition-colors">
                                                    {{ paroisse.Nom_paroisse }}
                                                </h4>
                                                <p class="text-xs text-stone-600 dark:text-stone-400 mt-1">
                                                    Doyenné de {{ paroisse.doyenne }}
                                                </p>
                                                <p v-if="paroisse.Prix > 0"
                                                    class="text-sm font-semibold text-yellow-600 dark:text-yellow-500 mt-2">
                                                    {{ paroisse.Prix }} FCFA
                                                </p>
                                            </div>

                                            <!-- Checkmark if selected -->
                                            <div v-if="formData.paroisse === paroisse.ID.toString()"
                                                class="absolute top-2 right-2 bg-yellow-600 dark:bg-yellow-700 text-white rounded-full p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Error message -->
                                <p v-if="errors.paroisse" class="mt-1 text-red-600 text-sm">{{ errors.paroisse }}</p>

                                <!-- Détail de la paroisse sélectionnée -->
                                <div v-if="selectedParoisse"
                                    class="mt-6 p-4 border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-stone-700/50 rounded-lg">
                                    <div class="flex flex-col md:flex-row items-center">
                                        <div
                                            class="w-24 h-24 flex items-center justify-center overflow-hidden rounded-md bg-white p-2 border border-stone-200">
                                            <img :src="'data:image/jpeg;base64,' + selectedParoisse.Logo"
                                                :alt="selectedParoisse.Nom_paroisse"
                                                class="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div class="ml-0 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                                            <h4 class="font-semibold text-lg text-stone-800 dark:text-stone-200">
                                                {{ selectedParoisse.Nom_paroisse }}
                                            </h4>
                                            <p class="text-sm text-stone-600 dark:text-stone-400">
                                                Doyenné de {{ selectedParoisse.doyenne }}
                                            </p>
                                            <p v-if="selectedParoisse.Prix > 0"
                                                class="text-sm font-semibold text-yellow-600 dark:text-yellow-500 mt-1">
                                                Prix: {{ selectedParoisse.Prix }} FCFA
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 2: Informations personnelles -->
                        <div v-if="currentStep === 1">
                            <h3 class="text-xl font-serif font-semibold mb-6 text-stone-800 dark:text-stone-200">
                                Informations personnelles
                            </h3>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="prenom"
                                        class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 font-serif">
                                        Prénom <span class="text-red-500">*</span>
                                    </label>
                                    <input type="text" id="prenom" v-model="formData.prenom"
                                        class="w-full border-stone-300 dark:border-stone-600 rounded-md shadow-sm py-2 px-3 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-stone-700 dark:text-stone-200"
                                        required />
                                    <p v-if="errors.prenom" class="mt-1 text-red-600 text-sm">{{ errors.prenom }}</p>
                                </div>

                                <div>
                                    <label for="nom"
                                        class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 font-serif">
                                        Nom <span class="text-red-500">*</span>
                                    </label>
                                    <input type="text" id="nom" v-model="formData.nom"
                                        class="w-full border-stone-300 dark:border-stone-600 rounded-md shadow-sm py-2 px-3 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-stone-700 dark:text-stone-200"
                                        required />
                                    <p v-if="errors.nom" class="mt-1 text-red-600 text-sm">{{ errors.nom }}</p>
                                </div>

                                <div>
                                    <label for="telephone"
                                        class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 font-serif">
                                        Téléphone WhatsApp <span class="text-red-500">*</span>
                                    </label>
                                    <input type="tel" id="telephone" v-model="formData.telephone"
                                        class="w-full border-stone-300 dark:border-stone-600 rounded-md shadow-sm py-2 px-3 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-stone-700 dark:text-stone-200"
                                        placeholder="ex: 77 123 45 67" required />
                                    <p v-if="errors.telephone" class="mt-1 text-red-600 text-sm">{{ errors.telephone }}
                                    </p>
                                </div>

                                <div>
                                    <label for="sexe"
                                        class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 font-serif">
                                        Sexe <span class="text-red-500">*</span>
                                    </label>
                                    <select id="sexe" v-model="formData.sexe"
                                        class="w-full border-stone-300 dark:border-stone-600 rounded-md shadow-sm py-2 px-3 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-stone-700 dark:text-stone-200"
                                        required>
                                        <option value="" disabled selected>Sélectionnez</option>
                                        <option value="Homme">Homme</option>
                                        <option value="Femme">Femme</option>
                                    </select>
                                    <p v-if="errors.sexe" class="mt-1 text-red-600 text-sm">{{ errors.sexe }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Step 3: Détails complémentaires -->
                        <div v-if="currentStep === 2">
                            <h3 class="text-xl font-serif font-semibold mb-6 text-stone-800 dark:text-stone-200">
                                Détails complémentaires
                            </h3>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="taille"
                                        class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 font-serif">
                                        Taille de t-shirt <span class="text-red-500">*</span>
                                    </label>
                                    <select id="taille" v-model="formData.taille"
                                        class="w-full border-stone-300 dark:border-stone-600 rounded-md shadow-sm py-2 px-3 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-stone-700 dark:text-stone-200"
                                        required>
                                        <option value="" disabled selected>Sélectionnez</option>
                                        <option v-for="taille in tailles" :key="taille" :value="taille">{{ taille }}
                                        </option>
                                    </select>
                                    <p v-if="errors.taille" class="mt-1 text-red-600 text-sm">{{ errors.taille }}</p>
                                </div>

                                <div>
                                    <label for="ceb"
                                        class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 font-serif">
                                        CEB <span class="text-red-500">*</span>
                                    </label>
                                    <select id="ceb" v-model="formData.ceb"
                                        class="w-full border-stone-300 dark:border-stone-600 rounded-md shadow-sm py-2 px-3 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-stone-700 dark:text-stone-200">
                                        <option value="" disabled selected>Sélectionnez votre CEB</option>
                                        <option v-if="loadingCebs" value="" disabled>Chargement des CEBs...</option>
                                        <option v-if="cebs.length === 0" value="Autre">Autre</option>
                                        <option v-for="ceb in cebs" :key="ceb.ID" :value="ceb.ID">{{ ceb.Nom_Ceb }}</option>
                                    </select>
                                    <p v-if="errors.ceb" class="mt-1 text-red-600 text-sm">{{ errors.ceb }}</p>
                                </div>


                            </div>
                        </div>

                        <!-- Confirmation Step -->
                        <div v-if="currentStep === 3">
                            <h3 class="text-xl font-serif font-semibold mb-6 text-stone-800 dark:text-stone-200">
                                Confirmation de l'inscription
                            </h3>

                            <div
                                class="bg-stone-50 dark:bg-stone-700 p-4 rounded-lg mb-6 border border-stone-200 dark:border-stone-600">
                                <h4 class="text-lg font-serif font-medium mb-3 text-stone-800 dark:text-stone-200">
                                    Récapitulatif</h4>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                                    <div class="flex flex-col">
                                        <span class="text-stone-500 dark:text-stone-400">Paroisse:</span>
                                        <span class="font-medium text-stone-800 dark:text-stone-200">{{
                                            selectedParoisse ? selectedParoisse.Nom_paroisse : formData.paroisse
                                        }}</span>
                                    </div>

                                    <div class="flex flex-col">
                                        <span class="text-stone-500 dark:text-stone-400">Nom complet:</span>
                                        <span class="font-medium text-stone-800 dark:text-stone-200">{{ formData.prenom
                                        }} {{ formData.nom }}</span>
                                    </div>

                                    <div class="flex flex-col">
                                        <span class="text-stone-500 dark:text-stone-400">Téléphone:</span>
                                        <span class="font-medium text-stone-800 dark:text-stone-200">{{
                                            formData.telephone }}</span>
                                    </div>

                                    <div class="flex flex-col">
                                        <span class="text-stone-500 dark:text-stone-400">Sexe:</span>
                                        <span class="font-medium text-stone-800 dark:text-stone-200">{{ formData.sexe
                                        }}</span>
                                    </div>

                                    <div class="flex flex-col">
                                        <span class="text-stone-500 dark:text-stone-400">Taille de t-shirt:</span>
                                        <span class="font-medium text-stone-800 dark:text-stone-200">{{ formData.taille
                                        }}</span>
                                    </div>

                                    <div class="flex flex-col">
                                        <span class="text-stone-500 dark:text-stone-400">CEB:</span>
                                        <span class="font-medium text-stone-800 dark:text-stone-200">{{ formData.ceb
                                        }}</span>
                                    </div>
                                </div>
                            </div>

                            <p class="text-stone-600 dark:text-stone-400 text-sm mb-6 font-serif">
                                Veuillez vérifier que toutes les informations sont correctes avant de soumettre votre
                                inscription.
                                Pour modifier vos informations, vous pouvez revenir en arrière en utilisant le bouton
                                "Précédent".
                            </p>

                            <div class="flex items-center">
                                <div class="flex items-center h-5">
                                    <input id="finalConfirm" v-model="formData.finalConfirm" type="checkbox"
                                        class="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-stone-300 dark:border-stone-600 rounded"
                                        required />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="finalConfirm"
                                        class="font-medium text-stone-700 dark:text-stone-300 font-serif">
                                        Je confirme que ces informations sont exactes
                                    </label>
                                    <p v-if="errors.finalConfirm" class="mt-1 text-red-600">{{ errors.finalConfirm }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Success step -->
                        <div v-if="currentStep === 4" class="text-center py-6">
                            <div
                                class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                                <svg class="h-10 w-10 text-green-600 dark:text-green-300" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-serif font-semibold mb-3 text-stone-800 dark:text-stone-200">
                                Inscription réussie !
                            </h3>
                            <p class="text-stone-600 dark:text-stone-400 mb-6 font-serif">
                                Votre inscription au 137ème pèlerinage marial de Poponguine a été enregistrée avec
                                succès.
                            </p>
                            <p class="text-stone-600 dark:text-stone-400 mb-6 font-serif">
                                Un message de confirmation a été envoyé sur votre numéro WhatsApp.
                                Veuillez consulter les détails de votre inscription et les prochaines étapes.
                            </p>
                            <div>
                                <button type="button" @click="resetForm"
                                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:bg-yellow-700 dark:hover:bg-yellow-800">
                                    Retour à l'accueil
                                </button>
                            </div>
                        </div>

                        <!-- Form navigation buttons -->
                        <div class="flex justify-between pt-4 border-t border-stone-200 dark:border-stone-700"
                            v-if="currentStep < 4">
                            <button type="button" @click="prevStep"
                                class="inline-flex items-center px-4 py-2 border border-stone-300 dark:border-stone-600 shadow-sm text-sm font-medium rounded-md text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                :disabled="currentStep === 0"
                                :class="{ 'opacity-50 cursor-not-allowed': currentStep === 0 }">
                                <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7" />
                                </svg>
                                Précédent
                            </button>

                            <button type="submit" v-if="currentStep < 3"
                                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:bg-yellow-700 dark:hover:bg-yellow-800">
                                <span class="flex items-center gap-2">
                                    Suivant
                                    <svg class="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>

                            </button>
                            <button v-else
                                class="flex items-center gap-2 text-sm font-medium bg-[#4ad2fa] px-3 py-2 rounded-lg text-white">
                                Payer avec WAVE
                                <img src="/assets/logo_wave.jpg" class="size-7" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';

export default {
    name: 'InscriptionForm',

    setup() {
        const currentStep = ref(0);
        const steps = ['Paroisse', 'Informations', 'Détails', 'Confirmation'];
        const paroisses = ref([]);
        const cebs = ref([]);
        const loading = ref(false);
        const loadingCebs = ref(false);
        const tailles = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

        const formData = reactive({
            paroisse: '',
            prenom: '',
            nom: '',
            telephone: '',
            sexe: '',
            taille: '',
            ceb: '',
            finalConfirm: false
        });

        const errors = reactive({
            paroisse: '',
            prenom: '',
            nom: '',
            telephone: '',
            sexe: '',
            taille: '',
            ceb: '',
            finalConfirm: ''
        });

        // Paroisse sélectionnée
        const selectedParoisse = computed(() => {
            if (!formData.paroisse) return null;
            return paroisses.value.find(p => p.ID.toString() === formData.paroisse.toString());
        });

        // Charger les paroisses lors du chargement du composant
        const fetchParoisses = async () => {
            loading.value = true;
            try {
                const response = await fetch('https://admin.espacecatho.com/paroisses');
                if (!response.ok) {
                    throw new Error('Échec de récupération des paroisses');
                }
                const data = await response.json();
                paroisses.value = data;
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                loading.value = false;
            }
        };

        // Charger les CEBs lorsque la paroisse est sélectionnée
        const fetchCebs = async (paroisseId) => {
            if (!paroisseId) return;

            loadingCebs.value = true;
            try {
                const response = await fetch(`https://admin.espacecatho.com/get_ceb/${paroisseId}`);
                if (!response.ok) {
                    throw new Error('Échec de récupération des CEBs');
                }
                const data = await response.json();
                cebs.value = data || [];
            } catch (error) {
                console.error('Erreur:', error);
                cebs.value = [];
            } finally {
                loadingCebs.value = false;
            }
        };

        // Observer les changements de paroisse pour charger les CEBs
        watch(() => formData.paroisse, (newVal) => {
            if (newVal) {
                fetchCebs(newVal);
            } else {
                cebs.value = [];
            }
        });
        const selectParoisse = (id) => {
            formData.paroisse = id.toString();
            // Réinitialiser l'erreur si elle existait
            errors.paroisse = '';
        };


        // Charger les paroisses au démarrage
        fetchParoisses();

        const validateStep = () => {
            // Réinitialiser toutes les erreurs
            for (const key in errors) {
                errors[key] = '';
            }

            let isValid = true;

            if (currentStep.value === 0) {
                if (!formData.paroisse) {
                    errors.paroisse = 'Veuillez sélectionner votre paroisse';
                    isValid = false;
                }
            }
            else if (currentStep.value === 1) {
                if (!formData.prenom) {
                    errors.prenom = 'Le prénom est requis';
                    isValid = false;
                }

                if (!formData.nom) {
                    errors.nom = 'Le nom est requis';
                    isValid = false;
                }

                if (!formData.telephone) {
                    errors.telephone = 'Le numéro de téléphone est requis';
                    isValid = false;
                } else if (!/^(7[0-9]|33)\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/.test(formData.telephone)) {
                    errors.telephone = 'Format invalide. Ex: 77 123 45 67';
                    isValid = false;
                }

                if (!formData.sexe) {
                    errors.sexe = 'Veuillez sélectionner votre sexe';
                    isValid = false;
                }
            }
            else if (currentStep.value === 2) {
                if (!formData.taille) {
                    errors.taille = 'Veuillez sélectionner votre taille';
                    isValid = false;
                }

                // if (!formData.ceb) {
                //     errors.ceb = 'Veuillez sélectionner votre CEB';
                //     isValid = false;
                // }

            }
            else if (currentStep.value === 3) {
                if (!formData.finalConfirm) {
                    errors.finalConfirm = 'Veuillez confirmer l\'exactitude des informations';
                    isValid = false;
                }
            }

            return isValid;
        };

        const nextStep = () => {
            if (validateStep()) {
                if (currentStep.value === 3) {
                    // Soumettre le formulaire
                    submitForm();
                } else {
                    currentStep.value++;
                }
            }
        };

        const prevStep = () => {
            if (currentStep.value > 0) {
                currentStep.value--;
            }
        };

        const submitForm = () => {
            // Ici vous pourriez envoyer les données à votre backend
            console.log('Soumission du formulaire avec les données:', formData);

            // Simuler un appel API
            setTimeout(() => {
                // Passer à l'étape de succès
                currentStep.value = 4;
            }, 1000);
        };

        const resetForm = () => {
            // Réinitialiser les données du formulaire
            for (const key in formData) {
                if (typeof formData[key] === 'boolean') {
                    formData[key] = false;
                } else {
                    formData[key] = '';
                }
            }

            // Réinitialiser à la première étape
            currentStep.value = 0;
        };

        return {
            currentStep,
            steps,
            formData,
            errors,
            paroisses,
            cebs,
            tailles,
            loading,
            loadingCebs,
            selectedParoisse,
            nextStep,
            prevStep,
            resetForm,
            selectParoisse 
        };
    }
}
</script>