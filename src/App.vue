<script lang="ts" setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="layout">
    <SiteHeader />
    <main class="main-area">
      <div class="container paper">
        <RouterView />
      </div>
    </main>
    <SiteFooter />
  </div>
</template>
