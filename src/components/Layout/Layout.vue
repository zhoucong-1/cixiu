<template>
  <div class="layout">
    <Header />
    <main class="layout-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
import './Layout.css'
</script>

