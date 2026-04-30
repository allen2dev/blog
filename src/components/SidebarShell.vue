<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { posts } from 'virtual:posts-data'

const route = useRoute()

const postMeta = computed(() => {
  if (route.name !== 'post') return undefined
  const slug = route.params.slug as string
  return posts.find((p) => p.slug === slug)
})

/** Article detail: show outline when markdown has h2–h6 with ids */
const showOutline = computed(
  () => Boolean(postMeta.value?.headings?.length),
)

/** Home: recent posts (banner already has quick actions; sidebar complements) */
const showRecent = computed(() => route.name === 'home')

const recent = computed(() => posts.slice(0, 6))

/** List / tag views: no sidebar — avoid repeating banner shortcuts */
const hideSidebar = computed(
  () => route.name === 'posts' || route.name === 'tag',
)
</script>

<template>
  <nav
    v-if="!hideSidebar && showOutline && postMeta"
    class="leap-sidebar leap-sidebar--outline"
    aria-label="本页目录"
  >
    <p class="sidebar-heading">目录</p>
    <ul class="outline-list">
      <li
        v-for="h in postMeta.headings"
        :key="h.id"
        :class="'outline-item outline-level-' + h.level"
      >
        <a :href="'#' + h.id">{{ h.text }}</a>
      </li>
    </ul>
  </nav>

  <nav
    v-else-if="!hideSidebar && showRecent"
    class="leap-sidebar leap-sidebar--recent"
    aria-label="近期文章"
  >
    <p class="sidebar-heading">近期</p>
    <ul class="recent-list">
      <li v-for="p in recent" :key="p.slug">
        <RouterLink :to="'/posts/' + p.slug">{{ p.title }}</RouterLink>
      </li>
    </ul>
    <p class="sidebar-more">
      <RouterLink to="/posts">全部文章 →</RouterLink>
    </p>
  </nav>
</template>

<style scoped>
.sidebar-heading {
  margin: 0 0 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #888;
}

.outline-list,
.recent-list {
  list-style: none;
  list-style-image: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
  line-height: 1.35;
}

.outline-item {
  padding: 3px 0;
}

.outline-item a {
  display: block;
  color: #555;
  text-decoration: none;
  word-break: break-word;
}

.outline-item a:hover {
  color: #4276b6;
}

.outline-level-2 {
  padding-left: 0;
}

.outline-level-3 {
  padding-left: 10px;
}

.outline-level-4 {
  padding-left: 18px;
}

.outline-level-5 {
  padding-left: 26px;
}

.outline-level-6 {
  padding-left: 34px;
}

.recent-list li {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}

.recent-list li:last-child {
  border-bottom: none;
}

.recent-list a {
  color: #4276b6;
  text-decoration: none;
  font-weight: 500;
}

.recent-list a:hover {
  text-decoration: underline;
}

.sidebar-more {
  margin: 12px 0 0;
  font-size: 12px;
}

.sidebar-more a {
  color: #888;
  text-decoration: none;
}

.sidebar-more a:hover {
  color: #4276b6;
}
</style>
