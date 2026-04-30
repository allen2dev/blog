<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { postsFull } from 'virtual:posts-data'

const route = useRoute()

const slug = computed(() => route.params.slug as string)

const post = computed(() => postsFull.find((p) => p.slug === slug.value))

useHead(() => ({
  title: post.value ? `${post.value.title} · 栈迹手记` : '未找到 · 栈迹手记',
}))
</script>

<template>
  <article v-if="post" class="article">
    <header class="article-head">
      <h1>{{ post.title }}</h1>
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
    <div class="markdown-body" v-html="post.html" />
  </article>

  <div v-else class="not-found">
    <h1>文章不存在</h1>
    <p>请从 <RouterLink to="/posts">文章列表</RouterLink> 返回。</p>
  </div>
</template>

<style scoped>
.article-head {
  margin-bottom: 20px;
}

.article-head h1 {
  margin-bottom: 10px;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #666;
}

.meta-item::before {
  content: '·';
  margin-right: 8px;
}

.tags {
  margin-top: 10px;
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

.not-found {
  text-align: center;
  padding: 40px 0;
}

.not-found p {
  margin-bottom: 0;
}
</style>
