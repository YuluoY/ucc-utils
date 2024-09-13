import type { Options } from 'tsup'
import vue from '@vue/compiler-sfc' // 可以使用 Vite 的 Vue 插件
import { Plugin } from 'esbuild'
import sass from 'sass'
import fs from 'node:fs'
import path from 'node:path'

export const tsup: Options = {
  entry: {
    index: './index.ts',
    polyfill: './Polyfill.ts',
    'core/index': 'src/core/index.ts',
    'dom/index': 'src/dom/index.ts',
    'hooks/index': 'src/hooks/index.ts',
    'request/index': 'src/request/index.ts',
    'socket/index': 'src/socket/index.ts',
    'sql/index': 'src/sql/index.ts',
    'storage/index': 'src/storage/index.ts',
    'worker/index': 'src/worker/index.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  clean: true,
  minify: true,
  outDir: 'dist',
  legacyOutput: true,
  target: 'esnext',
  external: ['ucc-utils', 'vue'],
  esbuildOptions(opts) {
    opts.platform = 'node'
    opts.alias = {
      'ucc-utils/core': 'ucc-utils/dist/core',
      'ucc-utils/dom': 'ucc-utils/dist/dom',
      'ucc-utils/hooks': 'ucc-utils/dist/hooks',
      'ucc-utils/request': 'ucc-utils/dist/request',
      'ucc-utils/socket': 'ucc-utils/dist/socket',
      'ucc-utils/sql': 'ucc-utils/dist/sql',
      'ucc-utils/storage': 'ucc-utils/dist/storage',
      'ucc-utils/worker': 'ucc-utils/dist/worker'
    }
    opts.plugins = [
      {
        name: 'vue-sfc',
        setup(build) {
          // 处理 Vue 文件的插件
          build.onLoad({ filter: /\.vue$/ }, async (args) => {
            const source = fs.readFileSync(args.path, 'utf8')
            const { descriptor } = vue.parse(source)

            // 编译 `<script setup>`
            const script = vue.compileScript(descriptor, { id: args.path })

            return {
              contents: script.content,
              loader: 'ts'
            }
          })
        }
      } as Plugin,
      {
        name: 'scss',
        setup(build) {
          build.onLoad({ filter: /\.scss$/ }, async (args) => {
            const result = sass.renderSync({ file: args.path })
            return {
              contents: result.css.toString(),
              loader: 'css'
            }
          })
        }
      } as Plugin
    ]
  },
  async onSuccess() {
    // 将 src/types 拷贝到 dist 目录下
    fs.cpSync('src/types', 'dist/types', { recursive: true })
    // fs.copyFileSync(path.resolve(__dirname, './package.json'), path.resolve(__dirname, './dist/package.json'))
  }
}
