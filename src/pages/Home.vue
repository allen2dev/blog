<script lang="ts" setup>
import { useHead } from '@unhead/vue'

useHead({ title: '首页 · 静态博客' })
</script>

<template>
  <div class="home-intro">
    <p>
      文本支持 <strong>粗体</strong>、<em>斜体</em>、<del>删除线</del>。
    </p>
    <p>
      <RouterLink to="/posts">前往文章列表</RouterLink>。
    </p>
    <p>
      段落之间应有留白。本站基于 Markdown 内容源，构建阶段生成静态 HTML，部署于 GitHub Pages。
    </p>
    <p>
      欢迎在侧栏浏览「全部文章」，或通过上方横幅下载源码压缩包。
    </p>
  </div>
</template>

<style scoped>
.home-intro {
  margin: 0;
}
</style>
