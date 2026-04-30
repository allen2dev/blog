<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="leap-site-header">
    <h1 class="leap-site-header__title">
      <RouterLink to="/">静态博客</RouterLink>
    </h1>
    <p class="leap-site-header__tagline">
      Markdown 内容源 · Vite SSG · GitHub Pages
    </p>
  </header>
</template>

<style scoped>
.leap-site-header {
  padding: 25px 20px 40px;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  background: linear-gradient(180deg, #5089cc 0%, #4276b6 50%, #3a6ba8 100%);
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.75);
  z-index: 99;
  -webkit-font-smoothing: antialiased;
  min-height: 76px;
}

.leap-site-header__title {
  font:
    40px/48px var(--font-display),
    serif;
  color: #f3f3f3;
  text-shadow: 0 2px 0 #235796;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.leap-site-header__title a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.leap-site-header__title a:hover {
  color: #fff;
}

.leap-site-header__tagline {
  color: #d8d8d8;
  text-shadow: rgba(0, 0, 0, 0.2) 0 1px 0;
  font-size: 18px;
  margin: 0;
}

@media print, screen and (max-width: 720px) {
  .leap-site-header {
    padding: 20px;
  }

  .leap-site-header__title {
    font-size: 32px;
    line-height: 40px;
  }

  .leap-site-header__tagline {
    display: none;
  }
}

@media print, screen and (max-width: 480px) {
  .leap-site-header {
    position: relative;
    padding: 8px 0;
    min-height: 0;
  }

  .leap-site-header__title {
    font-size: 24px;
    line-height: 32px;
  }
}
</style>
