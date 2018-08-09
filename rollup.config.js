import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from "rollup-plugin-node-resolve"

export default {
  input: 'lib/es6/src/SwpWallet.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs'
  },
  plugins: [
    commonjs({
      include: ["node_modules/bs-platform"]
    }),
    nodeResolve({
      jsnext: true,
      main: false,
      modulesOnly: true,
    })
  ]
};