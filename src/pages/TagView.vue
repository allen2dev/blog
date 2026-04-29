<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { posts } from 'virtual:posts-data'

const route = useRoute()

const tag = computed(() => decodeURIComponent(route.params.tag as string))

const filtered = computed(() =>
  posts.filter((p) => p.tags?.includes(tag.value)),
)

useHead(() => ({
  title: `标签：${tag.value} · 静态博客`,
}))

function formatDate(d: string) {
  if (!d) return ''
  const t = Date.parse(d)
  if (!Number.isFinite(t)) return d
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(t))
}
</script>

<template>
  <div>
    <header class="page-head">
      <h1 class="page-title">标签：{{ tag }}</h1>
      <p class="page-desc">共 {{ filtered.length }} 篇</p>
    </header>

    <ul v-if="filtered.length" class="post-list">
      <li v-for="item in filtered" :key="item.slug" class="post-card">
        <time class="date" :datetime="item.date">{{ formatDate(item.date) }}</time>
        <h2 class="post-title">
          <RouterLink :to="`/posts/${item.slug}`">{{ item.title }}</RouterLink>
        </h2>
        <p v-if="item.description" class="excerpt">{{ item.description }}</p>
      </li>
    </ul>

    <p v-else class="empty">该标签下暂无文章。</p>

    <p class="back">
      <RouterLink to="/posts">← 返回列表</RouterLink>
    </p>
  </div>
</template>

<style scoped>
.page-head {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.page-title {
  margin: 0 0 0.35rem;
  font-size: 1.65rem;
  color: var(--color-heading);
}

.page-desc {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.post-card {
  padding: 1.15rem 0;
  border-bottom: 1px dashed var(--color-border);
}

.post-card:last-child {
  border-bottom: none;
}

.date {
  display: block;
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-bottom: 0.35rem;
}

.post-title {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.post-title a {
  color: var(--color-link);
  text-decoration: none;
}

.post-title a:hover {
  color: var(--color-link-hover);
  text-decoration: underline;
}

.excerpt {
  margin: 0;
  line-height: 1.55;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.empty {
  color: var(--color-muted);
}

.back {
  margin-top: 2rem;
}

.back a {
  color: var(--color-link);
}
</style>
