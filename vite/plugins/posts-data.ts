import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItPrism from 'markdown-it-prism'

const VIRTUAL_ID = 'virtual:posts-data'
const RESOLVED = '\0' + VIRTUAL_ID

export interface PostFrontmatter {
  title: string
  date: string
  description?: string
  tags?: string[]
  category?: string
}

export interface PostEntry extends PostFrontmatter {
  slug: string
  html: string
}

function createMarkdown() {
  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
  })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({}),
    })
    .use(markdownItPrism)

  return md
}

function scanPosts(root: string): PostEntry[] {
  const dir = path.join(root, 'posts')
  if (!fs.existsSync(dir)) return []

  const md = createMarkdown()
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  const posts: PostEntry[] = []

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    const fm = data as Partial<PostFrontmatter>
    const slug = path.basename(file, '.md')
    const title = fm.title ?? slug
    const date = fm.date ?? ''
    const html = md.render(content)
    posts.push({
      slug,
      title,
      date,
      description: fm.description,
      tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
      category: fm.category,
      html,
    })
  }

  posts.sort((a, b) => {
    const ta = Date.parse(a.date) || 0
    const tb = Date.parse(b.date) || 0
    return tb - ta
  })

  return posts
}

/** Used by vite-ssg `includedRoutes` (Node, no virtual module). */
export function getStaticRoutePaths(root: string): string[] {
  const posts = scanPosts(root)
  const paths = ['/', '/posts']
  const tags = new Set<string>()
  for (const p of posts) {
    paths.push(`/posts/${p.slug}`)
    for (const t of p.tags ?? []) tags.add(String(t))
  }
  for (const t of tags)
    paths.push(`/tags/${encodeURIComponent(t)}`)
  return paths
}

export function postsDataPlugin(): Plugin {
  let root = process.cwd()

  return {
    name: 'posts-data',
    configResolved(config) {
      root = config.root
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED
    },
    load(id) {
      if (id !== RESOLVED) return
      const posts = scanPosts(root)
      const postsPerPage = 5
      const code = `
export const posts = ${JSON.stringify(
        posts.map(({ html: _h, ...rest }) => rest),
      )};
export const postsFull = ${JSON.stringify(posts)};
export const postsPerPage = ${postsPerPage};
export default { posts, postsFull, postsPerPage };
`
      return code
    },
  }
}
