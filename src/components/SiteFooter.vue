<script lang="ts" setup></script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p class="muted">
        由 Vue 3 + Vite SSG 构建 · 部署于 GitHub Pages
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: auto;
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-border);
  background: var(--color-footer-bg);
}

.footer-inner {
  text-align: center;
}

.muted {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-muted);
}
</style>
