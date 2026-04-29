/// <reference types="vite/client" />

declare module 'virtual:posts-data' {
  export interface PostSummary {
    slug: string
    title: string
    date: string
    description?: string
    tags?: string[]
    category?: string
  }

  export interface PostFull extends PostSummary {
    html: string
  }

  export const posts: PostSummary[]
  export const postsFull: PostFull[]
  export const postsPerPage: number
}
