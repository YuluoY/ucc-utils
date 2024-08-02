import type { Options } from 'tsup'

export const tsup: Options = {
  entry: ['./index.ts', './Polyfill.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  clean: true,
  minify: true
}
