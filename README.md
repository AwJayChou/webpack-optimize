#### webpack优化

几个关键点

entry可以是对象

```js
{  // key 为打包到html中分支名称
    entry: {
        shop: './src/shop.js', 
        job: './src/job.js'
    }
}
```



优化点 （打包体积， 打包速度）

css 压缩 

js 压缩 treeshaking

```js
// 抽离css为独立文件输出
    new MiniCssExtractPlugin({
      filename: "css/[name]_[contenthash:6].css"
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      }
    }),
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(__dirname, "./src/*.html"), // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(__dirname, "./src/*.js")
      ])
    })
```



1.useExports  减少没有用到的代码

2. splitchunk  分割分支
3. externals 引用外部cdn

```js
optimization: {
    usedExports: true,
    // 基本配置就可以
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: "-",
      cacheGroups: {
        // lodash: {
        //   test: /lodash/,
        //   name: "lodash",
        //   minChunks: 1
        // },
        // react: {
        //   test: /react|react-dom/,
        //   name: "react",
        //   minChunks: 1
        // }
      }
    }
  },
  // 或者html中引用外部cdn
  // externals : {
  //   react: 'react'
  // },
```



打包速度比较简单 当然也是基于打包体积

happypack 支持多线程打包

```
const happyThreadPool = HappyPack.ThreadPool({ size: 3 });
```

webpack 4以后支持 配置简易

HardSourceWebpackPlugin