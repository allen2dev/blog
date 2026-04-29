import type { RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import PostList from '../pages/PostList.vue'
import PostDetail from '../pages/PostDetail.vue'
import TagView from '../pages/TagView.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home, meta: { title: '首页' } },
  {
    path: '/posts',
    name: 'posts',
    component: PostList,
    meta: { title: '文章列表' },
  },
  {
    path: '/posts/:slug',
    name: 'post',
    component: PostDetail,
    meta: { title: '文章' },
  },
  {
    path: '/tags/:tag',
    name: 'tag',
    component: TagView,
    meta: { title: '标签' },
  },
]
