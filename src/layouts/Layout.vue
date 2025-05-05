<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
</script>
<template>
    <Navbar />
    <div class="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 transition-colors duration-500">
        <slot />
    </div>
    <Footer />
</template>