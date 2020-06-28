
import path from 'path'
import babel from 'rollup-plugin-babel';

const { TARGET_FOLDER } = process.env

if (!TARGET_FOLDER) {
  new Error('no TARGET_FOLDER env')
  process.exit(1)
}

const FOLDER_NAME = TARGET_FOLDER.split(path.sep).reverse()[0]

export default {
  input: `${TARGET_FOLDER}/index.js`,
  output: {
    // file: `.cache/${FOLDER_NAME}.js`,
    file: `.cache/launch.js`,
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}

