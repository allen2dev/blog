<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { postsFull } from 'virtual:posts-data'

const route = useRoute()

const slug = computed(() => route.params.slug as string)

const post = computed(() => postsFull.find((p) => p.slug === slug.value))

useHead(() => ({
  title: post.value ? `${post.value.title} · 静态博客` : '未找到 · 静态博客',
}))
</script>

<template>
  <article v-if="post" class="article">
    <header class="article-head">
      <h1 class="article-title">{{ post.title }}</h1>
      <div class="meta">
        <time v-if="post.date" :datetime="post.date">{{ post.date }}</time>
        <span v-if="post.category" class="meta-item">{{ post.category }}</span>
      </div>
      <div v-if="post.tags?.length" class="tags">
        <RouterLink
          v-for="tag in post.tags"
          :key="tag"
          :to="`/tags/${encodeURIComponent(tag)}`"
          class="tag"
        >
          {{ tag }}
        </RouterLink>
      </div>
    </header>
    <div class="prose markdown-body" v-html="post.html" />
  </article>

  <div v-else class="not-found">
    <h1>文章不存在</h1>
    <p>请从 <RouterLink to="/posts">文章列表</RouterLink> 返回。</p>
  </div>
</template>

<style scoped>
.article-head {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.article-title {
  margin: 0 0 0.65rem;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  color: var(--color-heading);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--color-muted);
}

.meta-item::before {
  content: '·';
  margin-right: 0.75rem;
}

.tags {
  margin-top: 0.75rem;
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

.not-found {
  text-align: center;
  padding: 2rem 0;
}

.not-found h1 {
  color: var(--color-heading);
}

.not-found a {
  color: var(--color-link);
}
</style>
