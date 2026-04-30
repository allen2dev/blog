<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import Pagination from '../components/Pagination.vue'
import { posts, postsPerPage } from 'virtual:posts-data'

useHead({ title: '文章列表 · 静态博客' })

const route = useRoute()
const router = useRouter()

const totalPages = computed(() =>
  Math.max(1, Math.ceil(posts.length / postsPerPage)),
)

const page = computed({
  get() {
    const raw = Number(route.query.page)
    if (!Number.isFinite(raw) || raw < 1) return 1
    return Math.min(Math.floor(raw), totalPages.value)
  },
  set(v: number) {
    router.push({
      path: '/posts',
      query: v <= 1 ? {} : { page: String(v) },
    })
  },
})

watch(
  () => route.query.page,
  () => {
    if (page.value > totalPages.value) {
      router.replace({
        path: '/posts',
        query:
          totalPages.value <= 1 ? {} : { page: String(totalPages.value) },
      })
    }
  },
)

const slice = computed(() => {
  const start = (page.value - 1) * postsPerPage
  return posts.slice(start, start + postsPerPage)
})

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
      <h1>全部文章</h1>
      <p class="page-desc">共 {{ posts.length }} 篇，每页 {{ postsPerPage }} 篇</p>
    </header>

    <ul class="post-list">
      <li v-for="item in slice" :key="item.slug" class="post-card">
        <time class="date" :datetime="item.date">{{ formatDate(item.date) }}</time>
        <h2 class="post-title">
          <RouterLink :to="`/posts/${item.slug}`">{{ item.title }}</RouterLink>
        </h2>
        <p v-if="item.description" class="excerpt">{{ item.description }}</p>
        <div v-if="item.tags?.length" class="tags">
          <RouterLink
            v-for="tag in item.tags"
            :key="tag"
            :to="`/tags/${encodeURIComponent(tag)}`"
            class="tag"
          >
            {{ tag }}
          </RouterLink>
        </div>
      </li>
    </ul>

    <Pagination
      v-model:page="page"
      :total-pages="totalPages"
    />
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

.post-card:last-child {
  border-bottom: none;
}

.date {
  display: block;
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.post-title {
  margin: 0 0 8px;
  font-size: 18px;
  line-height: 1.25;
}

.post-title a {
  color: #4276b6;
  font-weight: 700;
}

.post-title a:hover {
  color: #235796;
}

.excerpt {
  margin: 0 0 8px;
  color: #666;
  font-size: 13px;
  line-height: 1.5;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 2px;
  background: #eee;
  color: #4276b6;
  text-decoration: none;
}

.tag:hover {
  background: #e5e5e5;
}
</style>
