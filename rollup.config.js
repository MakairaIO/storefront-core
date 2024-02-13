/* eslint-disable @typescript-eslint/no-var-requires */
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve')
const external = require('rollup-plugin-peer-deps-external')
const postcss = require('rollup-plugin-postcss')
const sourceMaps = require('rollup-plugin-sourcemaps')
const terser = require('@rollup/plugin-terser')
const typescript = require('rollup-plugin-typescript2')
const pkg = require('./package.json')

module.exports = [
  {
    input: 'src/client/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: 'inline',
        plugins: [terser()],
        exports: 'auto',
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: 'inline',
        plugins: [terser()],
        exports: 'auto',
      },
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: 'inline',
        exports: 'auto',
      },
    ],
    watch: {
      include: 'src/client/**',
    },
    plugins: [
      external(),
      postcss({
        modules: true,
      }),
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript({
        useTsconfigDeclarationDir: true,
        exclude: ['**/__tests__/**', '*.spec.*', '*.test.*'],
        clean: true,
      }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),
      // Resolve source maps to the original source
      sourceMaps(),
    ],
  },
  {
    input: 'src/ui/index.ts',
    output: [
      {
        file: 'dist/ui/index.min.js',
        format: 'cjs',
        sourcemap: 'inline',
        plugins: [terser()],
        exports: 'auto',
      },
      {
        file: 'dist/ui/index.es.js',
        format: 'es',
        sourcemap: 'inline',
        plugins: [terser()],
        exports: 'auto',
      },
      {
        file: 'dist/ui/index.js',
        format: 'cjs',
        sourcemap: 'inline',
        exports: 'auto',
      },
    ],
    watch: {
      include: 'src/ui/**',
    },
    plugins: [
      external(),
      postcss({
        modules: true,
      }),
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript({
        useTsconfigDeclarationDir: true,
        exclude: ['**/__tests__/**', '*.spec.*', '*.test.*'],
        clean: true,
      }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),
      // Resolve source maps to the original source
      sourceMaps(),
    ],
  },
]
