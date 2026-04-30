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
  title: `标签：${tag.value} · 栈迹手记`,
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
      <h1>标签：{{ tag }}</h1>
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
  margin-bottom: 20px;
}

.page-head h1 {
  margin-bottom: 6px;
}

.page-desc {
  margin: 0;
  font-size: 13px;
  color: #666;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-card {
  padding: 14px 0;
  border-bottom: 1px solid #e5e5e5;
}

.date {
  display: block;
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.post-title {
  margin: 0;
  font-size: 18px;
}

.post-title a {
  color: #4276b6;
  font-weight: 700;
}

.excerpt {
  margin: 8px 0 0;
  color: #666;
  font-size: 13px;
}

.empty {
  color: #666;
}

.back {
  margin-top: 24px;
}
</style>
