<script setup>
import Hero from '../components/Hero.vue';
import PilgrimSection from '../components/PilgrimSection.vue';
import Resources from '../components/Resources.vue';
import Sponsors from '../components/Sponsors.vue';
import Layout from '../layouts/Layout.vue';
</script>
<template>
  <Layout>
    <Hero dueDate="2025-06-07T23:59:59" />
    <PilgrimSection />
    <Resources />
    <Sponsors />
  </Layout>
</template>