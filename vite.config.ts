import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { postsDataPlugin } from './vite/plugins/posts-data'

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [vue(), postsDataPlugin()],
})
