import { defineConfig } from 'tsup'
import { rimraf } from 'rimraf'
import type { Format } from 'tsup'

// 清理 dist 目录
rimraf.sync('dist')

// 基础配置
const baseConfig = {
  dts: {
    entry: {
      index: 'src/index.browser.ts',
      'index.node': 'src/index.node.ts',
      'dom/index': 'src/dom/index.ts',
      'hooks/index': 'src/hooks/index.ts',
      'request/index': 'src/request/index.ts',
      'storage/index': 'src/storage/index.ts',
      'worker/index': 'src/worker/index.ts',
      'vue/index': 'src/vue/index.ts',
      'cesium/index': 'src/cesium/index.ts',
      'redis/index': 'src/redis/index.ts',
      'core/index': 'src/core/index.ts',
      'sql/index': 'src/sql/index.ts',
      'socket/index': 'src/socket/index.ts'
    }
  },
  clean: true,
  minify: true,
  splitting: true,
  sourcemap: false,
  treeshake: true
}

export default defineConfig([
  // 1. 浏览器环境入口
  {
    ...baseConfig,
    entry: {
      index: 'src/index.browser.ts'
    },
    format: ['esm'] as Format[],
    outDir: 'dist',
    platform: 'browser',
    external: ['axios', 'lodash', 'vue', 'cesium'],
    outExtension: () => ({ js: '.mjs' })
  },

  // 2. Node.js 环境入口
  {
    ...baseConfig,
    entry: {
      index: 'src/index.node.ts'
    },
    format: ['cjs'] as Format[],
    outDir: 'dist',
    platform: 'node',
    external: ['axios', 'lodash', 'redis'],
    outExtension: () => ({ js: '.js' })
  },

  // 3. 浏览器专用模块
  {
    ...baseConfig,
    entry: {
      'dom/index': 'src/dom/index.ts',
      'hooks/index': 'src/hooks/index.ts',
      'request/index': 'src/request/index.ts',
      'storage/index': 'src/storage/index.ts',
      'worker/index': 'src/worker/index.ts',
      'vue/index': 'src/vue/index.ts',
      'cesium/index': 'src/cesium/index.ts'
    },
    format: ['esm'] as Format[],
    outDir: 'dist',
    platform: 'browser',
    external: ['axios', 'lodash', 'vue', 'cesium'],
    outExtension: () => ({ js: '.mjs' })
  },

  // 4. 服务端专用模块
  {
    ...baseConfig,
    entry: {
      'redis/index': 'src/redis/index.ts'
    },
    format: ['cjs'] as Format[],
    outDir: 'dist',
    platform: 'node',
    external: ['axios', 'lodash', 'redis'],
    outExtension: () => ({ js: '.js' })
  },

  // 5. 通用模块（core + 跨平台模块）
  {
    ...baseConfig,
    entry: {
      'core/index': 'src/core/index.ts',
      'sql/index': 'src/sql/index.ts',
      'socket/index': 'src/socket/index.ts'
    },
    format: ['cjs', 'esm'] as Format[],
    outDir: 'dist',
    platform: 'neutral',
    external: ['axios', 'lodash'],
    outExtension({ format }) {
      return {
        js: format === 'cjs' ? '.js' : '.mjs'
      }
    }
  }
])
