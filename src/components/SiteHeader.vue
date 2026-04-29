<script lang="ts" setup>
import { RouterLink } from 'vue-router'

const nav = [
  { to: '/', label: '首页' },
  { to: '/posts', label: '文章' },
]
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand">静态博客</RouterLink>
      <nav class="nav" aria-label="主导航">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          active-class="nav-link--active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: linear-gradient(180deg, var(--color-header-top) 0%, var(--color-header-bottom) 100%);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1rem;
  gap: 1rem;
}

.brand {
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.brand:hover {
  color: var(--color-link-hover);
}

.nav {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.nav-link {
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  color: var(--color-muted);
  font-size: 0.95rem;
  text-decoration: none;
}

.nav-link:hover {
  color: var(--color-link);
  background: rgba(255, 255, 255, 0.35);
}

.nav-link--active {
  color: var(--color-link);
  font-weight: 600;
}
</style>
