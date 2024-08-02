import type { Options } from 'tsup'
import fs from 'node:fs'

export const tsup: Options = {
  entry: {
    index: './index.ts',
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
  external: ['ucc-utils'],
  esbuildOptions(opts) {
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
  },
  async onSuccess() {
    // 将 src/types 拷贝到 dist 目录下
    fs.cpSync('src/types', 'dist/types', { recursive: true })
  }
}
