const path = require("path");

const htmlwebpackplugin = require("html-webpack-plugin");
const webpack = require("webpack");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

// const { DllReferencePlugin } = require("webpack");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const devConfig = {
  output: {
    path: path.resolve(__dirname, "./dev"),
    filename: "[name]_[hash:6].js"
    // publicPath: "http://cdn.com/assets/"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "./src"),
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      }
    ]
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8081,
    hot: true,
    hotOnly: true,
  },

  plugins: [
    //支持ejs模板引擎的写法
    new htmlwebpackplugin({
      title: "首页",
      template: "./src/index.html",
      filename: "index.html"
    }),
    //抽离css为独立文件输出
    // new MiniCssExtractPlugin({
    //   filename: "css/[name]_[hash:6].css"
    // }),
    new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = devConfig;
