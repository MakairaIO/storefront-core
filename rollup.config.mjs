import { swc } from 'rollup-plugin-swc3'

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/bundle.js',
        format: 'es',
      },
    ],
    plugins: [
      swc({
        minify: true,
        isModule: true,
        module: {
          type: 'es6',
        },
        jsc: {
          minify: true,
          parser: {
            syntax: 'typescript',
            dynamicImport: true,
          },
        },
      }),
    ],
  },
]
