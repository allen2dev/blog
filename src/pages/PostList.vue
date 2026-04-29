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
    /* sync URL when total pages shrink */
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
      <h1 class="page-title">全部文章</h1>
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
  margin: 0 0 0.65rem;
  line-height: 1.55;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
  background: var(--color-tag-bg);
  color: var(--color-link);
  text-decoration: none;
}

.tag:hover {
  background: var(--color-tag-bg-hover);
}
</style>
