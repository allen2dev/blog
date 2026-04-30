<script lang="ts" setup>
import { useHead } from '@unhead/vue'

useHead({ title: '首页 · 栈迹手记' })
</script>

<template>
  <div class="home-intro">
    <p>
      你好，这里是<strong>栈迹手记</strong>——一名写了十余年<strong>前端</strong>与<strong>Node</strong>的开发者随手记下的一线经验：工程化、运行时、团队协作，以及近两三年和<strong>AI</strong>打交道的一点心得。
    </p>
    <p>
      <RouterLink to="/posts">浏览全部文章</RouterLink>，或用顶部黄条里的<strong>随机一篇</strong>、<strong>AI 专题</strong>快速跳转。
    </p>
    <p>
      正文均为 Markdown，构建时生成静态页面；技术栈为 Vue 3、Vite SSG，托管于 GitHub Pages。
    </p>
  </div>
</template>

<style scoped>
.home-intro {
  margin: 0;
}
</style>
