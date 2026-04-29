import { build as viteSsgBuild } from 'vite-ssg/node'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { getStaticRoutePaths } from '../vite/plugins/posts-data.ts'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

await viteSsgBuild(
  {
    dirStyle: 'nested',
    includedRoutes() {
      return getStaticRoutePaths(projectRoot)
    },
  },
  {
    configFile: resolve(projectRoot, 'vite.config.ts'),
  },
)
