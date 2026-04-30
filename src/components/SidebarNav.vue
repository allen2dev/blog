<script lang="ts" setup>
import { RouterLink } from 'vue-router'

const items = [
  { to: '/', label: '首页' },
  { to: '/posts', label: '全部文章' },
  { to: '/tags/AI', label: 'AI 专题' },
]
</script>

<template>
  <nav class="leap-sidebar leap-nav" aria-label="站内导航">
    <ul>
      <li
        v-for="item in items"
        :key="item.to"
        class="tag-h1"
      >
        <RouterLink :to="item.to">{{ item.label }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.leap-nav ul {
  list-style: none;
  list-style-image: none;
  font-size: 14px;
  line-height: 24px;
  padding: 0;
  margin: 0;
}

.leap-nav li {
  padding: 5px 0;
  line-height: 16px;
}

.leap-nav li.tag-h1 {
  font-size: 1.2em;
}

.leap-nav li.tag-h1 a {
  font-weight: bold;
  color: #333;
}

.leap-nav a {
  color: #666;
  text-decoration: none;
  font-weight: 400;
}

.leap-nav a:hover {
  color: #999;
}

.leap-nav a.router-link-active {
  color: #4276b6;
}
</style>
