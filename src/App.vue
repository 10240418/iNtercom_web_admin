<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app" class="min-h-screen w-screen">
    <RouterView />
  </div>
</template>

<style scoped>
/* 确保应用程序能够全屏显示，让每个页面控制自己的布局 */
#app {
  width: 100%;
  height: 100%;
}
</style>
