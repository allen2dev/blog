<script lang="ts" setup>
import { useHead } from '@unhead/vue'

useHead({ title: '首页 · 静态博客' })
</script>

<template>
  <section class="hero">
    <p class="ribbon">Welcome</p>
    <h1 class="hero-title">记录与分享</h1>
    <p class="lead">
      基于 Markdown 的静态博客，构建阶段生成 HTML，部署于 GitHub Pages。
      列表支持分页，文章支持代码高亮与标签筛选。
    </p>
    <div class="cta-row">
      <RouterLink class="btn btn-primary" to="/posts">浏览文章</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 0.5rem 0 1.5rem;
}

.ribbon {
  display: inline-block;
  margin: 0 0 0.75rem;
  padding: 0.2rem 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  background: var(--color-accent-dark);
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}

.hero-title {
  margin: 0 0 0.75rem;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--color-heading);
}

.lead {
  max-width: 38rem;
  margin: 0 auto 1.5rem;
  line-height: 1.65;
  color: var(--color-muted);
  font-size: 1.05rem;
}

.cta-row {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.55rem 1.25rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
}

.btn-primary {
  color: #fff;
  background: linear-gradient(180deg, var(--color-link) 0%, var(--color-accent-dark) 100%);
  border-color: var(--color-accent-dark);
  box-shadow: 0 1px 2px rgba(0, 48, 135, 0.25);
}

.btn-primary:hover {
  filter: brightness(1.05);
}
</style>
