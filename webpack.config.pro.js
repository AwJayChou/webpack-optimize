const path = require("path");

const htmlwebpackplugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");
const proConfig = {
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name]_[hash:6].js"
    // publicPath: "http://cdn.com/assets/"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: "-",
      cacheGroups: {
        //缓存组
        lodash: {
          test: /lodash/,
          name: "lodash",
          minChunks: 1
        },
        react: {
          test: /react|react-dom/,
          name: "react",
          minChunks: 1
        }
      }
    }
  },
  plugins: [
    //支持ejs模板引擎的写法
    new htmlwebpackplugin({
      title: "首页",
      template: "./src/index.html",
      filename: "index.html",
    }),
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
  ]
};

module.exports = proConfig;
