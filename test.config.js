const path = require("path");

const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");
const proConfig = require("./webpack.config.pro.js");
const devConfig = require("./webpack.config.js");

// module.exports = merge(baseConfig, devConfig);
// console.log(process.env.Node_ENV);
module.exports = env => {
  if (env && env.production) {
    return merge(baseConfig, proConfig);
  } else {
    return merge(baseConfig, devConfig);
  }
};
