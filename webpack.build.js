const path = require('path')
const WebpackBar = require('webpackbar')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./webgis-src/app.js",
  output: {
    filename: "build.js",
    path: path.join(__dirname, "./dist")
  },

  mode: 'production',
  plugins: [
    new WebpackBar(),
    new UglifyJsPlugin({
      //多嵌套了一层
      uglifyOptions: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有注释
          comments: false,
        }
      }
    })
  ],
  module: {
    unknownContextCritical: /^.\/.*$/,
    unknownContextCritical: false,
    rules: [
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      },
    ]
  }
}
