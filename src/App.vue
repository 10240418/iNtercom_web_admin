<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <main class="max-w-4xl mx-auto p-6">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* 保留一些自定义样式，但主要使用TailwindCSS */
</style>
