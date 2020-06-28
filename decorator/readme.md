# Decorator 环境准备

## jsconfig

为了应对报错:

> 对修饰器的实验支持功能在将来的版本中可能更改。在 "tsconfig" 或 "jsconfig" 中设置 "experimentalDecorators" 选项以删除此警告。ts(1219)

在 `jsconfig.json` 中添加配置:

``` json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## rollup

在 `rollup.config.js` 中添加 rollup 编译配置

``` js
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
```

## babel

在 `.babalrc` 中加入对 decorator 的编译

``` json
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false
    }]
  ],
  "plugins": [
    "@babel/plugin-external-helpers",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
```

## vscode-task

在 `.vscode/tasks.json` 中添加一个 vscode 的 task, 用于 rollup 编译, 为下面的 launch 服务

``` json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "compile",
      "problemMatcher": [],
      "label": "npm: compile",
      "detail": "rollup -c",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "isBackground": false,
      "options": {
        "env": {
          "NODE_ENV": "develop",
          "TARGET_FOLDER": "${workspaceFolder}/decorator"
        },
        "shell": {
          "args": []
        }
      }
    }
  ]
}
```

## vscode-launch

在 `.vscode/launch.json` 中添加一个 vscode 的 launch, 用于 node 调试

``` json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "decorator",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/decorator/index.js"
    }
  ]
}
```

## 使用

打开 vscode 的 node 调试, 在 `运行` 中选择 `decorator`, 然后点击运行

在 `终端` 中输出:

``` txt
> Executing task: npm run compile <


> exercises@1.0.0 compile /Users/zhangshuyao/Sites/github/exercises
> rollup -c


/Users/zhangshuyao/Sites/github/exercises/decorator/index.js → .cache/launch.js...
(!) Plugin babel: Using "external-helpers" plugin with rollup-plugin-babel is deprecated, as it now automatically deduplicates your Babel helpers.
decorator/index.js
created .cache/launch.js in 1.6s

终端将被任务重用, 按任意键关闭。
```

切换到 `调试控制台`, 会有下面输出:

``` txt
/usr/local/bin/node --inspect-brk=46248 .cache/launch.js
Debugger listening on ws://127.0.0.1:46248/25ddbaae-0df3-4f0d-a260-625c49482865
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
test1Class.key1 1 launch.js:23
test1Obj.key1 2 launch.js:24
```

## 后续

以上是准备阶段的环境配置

有修改后, 使用 `F5` 可以重新编译和输出

有几点优化:

1. 如果切换文件夹, (一道题目即一个文件夹, 每个文件夹固定 `index.js` 文件为入口), `launch.json` 和 `task.json` 都要进行修改, 如何做到只修改一个文件, 或一个文件都不修改, 就可以进行编译和输出
2. 输出中有个小问题, 比如 `test1Obj.key1 2 launch.js:24`, 其中行号是编译后文件的行号, 如何加入 `map` 使行号能正确指向到原文件
3. `watch` 功能, 自动编译和输出, 不知道 vscode 有没有这个, 还没有仔细研究
