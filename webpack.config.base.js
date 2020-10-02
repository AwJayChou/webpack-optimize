const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const LogWebpackPlugin = require("./plugin/test-plugin")
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: 3 });
module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "./src"),
        // exclude: path.resolve(__dirname, "./node_module"),
        // use: ["style-loader", "css-loader"]
        use: [
          {
            loader: "happypack/loader?id=css"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: path.resolve(__dirname, "./src"),
        // use: {
        //   loader: "file-loader",
        //   options: {
        //     name: "[name]_[hash:6].[ext]",
        //     outputPath: "images/"
        //   }
        // }
        use: {
          loader: "happypack/loader?id=pic"
        }
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: path.resolve(__dirname, './loader/test-loader.js'),
            options: {
              info: 'loader-test'
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "./src"),
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     presets: ["@babel/preset-env"]
        //   }
        // }
        use: ["happypack/loader?id=babel"]
      },
      // {
      //   test: /\.jsx?$/,
      //   include: path.resolve(__dirname, "./src"),
      //   use: 'vue-loader'
      // },
      // {
      //   test: /\.vue$/,
      //   include: path.resolve(__dirname, "./src"),
      //   use: 'vue-loader'
      // }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "./node_modules")],
    alias: {
      react: path.resolve(
        __dirname,
        "./node_modules/react/umd/react.production.min.js"
      ),
      "react-dom": path.resolve(
        __dirname,
        "./node_modules/react-dom/umd/react-dom.production.min.js"
      ),
      'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
    },
    // extensions: [".js"]
  },
  plugins: [
    //支持ejs模板引擎的写法
    new HappyPack({
      id: "css",
      loaders: ["style-loader", "css-loader"],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: "pic",
      loaders: [
        {
          loader: "file-loader",
          options: {
            name: "[name]_[hash:6].[ext]",
            outputPath: "images/"
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: "babel",
      loaders: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new CleanWebpackPlugin(),
    new LogWebpackPlugin({
      logName: 'runtime-log'
    })
    //抽离css为独立文件输出
    // new MiniCssExtractPlugin({
    //   filename: "css/[name]_[hash:6].css"
    // }),
  ]
};
