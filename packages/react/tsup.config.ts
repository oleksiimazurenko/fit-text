import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  // Declarations are emitted by tsc (tsconfig.build.json), not tsup's
  // rollup-plugin-dts — decoupling types from the JS bundler and keeping
  // the toolchain compatible with the native TypeScript compiler.
  dts: false,
  treeshake: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react/jsx-runtime'],
})
