<script lang="ts" setup>
import SiteHeader from './components/SiteHeader.vue'
import LeapBanner from './components/LeapBanner.vue'
import SidebarNav from './components/SidebarNav.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="layout leap-layout">
    <SiteHeader />
    <LeapBanner />
    <div class="wrapper leap-wrapper">
      <SidebarNav />
      <section class="leap-section">
        <RouterView />
      </section>
    </div>
    <SiteFooter />
  </div>
</template>
