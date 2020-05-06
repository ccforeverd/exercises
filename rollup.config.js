console.log(process.env)

export default {
  input: `${process.env.TARGET_FOLDER}/index.js`,
  output: {
    file: `.cache/index.js`,
    format: 'cjs'
  }
}