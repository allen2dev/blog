<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'
import { posts } from 'virtual:posts-data'

const router = useRouter()

function openRandomPost() {
  if (!posts.length) return
  const pick = posts[Math.floor(Math.random() * posts.length)]
  router.push(`/posts/${pick.slug}`)
}
</script>

<template>
  <div id="banner" class="banner-strip">
    <div class="banner-strip__inner">
      <span class="banner-strip__mark" aria-hidden="true" />
      <span class="banner-strip__label">快速入口</span>
      <RouterLink to="/posts" class="button">全部文章</RouterLink>
      <button type="button" class="button btn-random" @click="openRandomPost">
        随机一篇
      </button>
      <RouterLink to="/tags/AI" class="button">AI 专题</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.banner-strip {
  z-index: 100;
  position: fixed;
  top: 115px;
  left: 0;
  right: 0;
  height: 50px;
  background: #ffcc00;
  border-bottom: 1px solid #f0b500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

.banner-strip__inner {
  position: relative;
  max-width: 650px;
  margin: 0 auto;
  padding: 0 max(12px, env(safe-area-inset-right, 0px)) 0 max(12px, env(safe-area-inset-left, 0px));
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.banner-strip__label {
  font-size: 12px;
  color: #9d7f0d;
  text-transform: uppercase;
  text-shadow: rgba(255, 255, 255, 0.2) 0 1px 0;
  margin-right: 4px;
}

.banner-strip .button {
  border: 1px solid #dba500;
  background: linear-gradient(#ffe788, #ffce38);
  border-radius: 2px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 1px 1px rgba(0, 0, 0, 0.1);
  background-color: #ffe788;
  padding: 8px 12px;
  line-height: 14px;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  font-family: inherit;
}

.banner-strip .button:hover {
  background: #ffeca0;
}

.btn-random {
  flex: 0 0 auto;
}

.banner-strip__mark {
  position: absolute;
  right: max(10px, env(safe-area-inset-right, 0px));
  top: 50%;
  transform: translateY(-50%);
  height: 28px;
  width: 28px;
  opacity: 0.35;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='1.5'%3E%3Cpath d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/%3E%3Cpath d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/%3E%3Cpath d='M8 7h8M8 11h6'/%3E%3C/svg%3E")
    center / contain no-repeat;
}

@media print, screen and (max-width: 720px) {
  .banner-strip {
    top: 80px;
    height: auto;
    min-height: 50px;
    padding: 6px 0;
  }

  .banner-strip__inner {
    padding-right: max(40px, calc(28px + env(safe-area-inset-right, 0px)));
  }
}

@media print, screen and (max-width: 480px) {
  .banner-strip {
    display: none;
  }
}
</style>
