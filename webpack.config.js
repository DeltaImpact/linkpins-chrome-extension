const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PAGES_PATH = "./src/pages";

function generateHtmlPlugins(items) {
  return items.map(
    name =>
      new HtmlPlugin({
        filename: `./${name}.html`,
        chunks: [name]
      })
  );
}

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    background: ["babel-polyfill", `${PAGES_PATH}/background`],
    popup: ["babel-polyfill", `${PAGES_PATH}/popup`]
  },
  output: {
    path: path.resolve("dist/pages"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: "file-loader?name=[name].[ext]?[hash]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/fontwoff"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css"
    }),
    new CopyPlugin([
      {
        from: "src",
        to: path.resolve("dist"),
        ignore: ["pages/**/*"]
      }
    ]),
    ...generateHtmlPlugins(["background", "popup"]),
    new CopyWebpackPlugin([
      { from: "src/static/images", to: "images" },
      { from: "src/static/styles", to: "styles" },
      { from: "src/static/css", to: "css" }
    ])
  ],
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "https://localhost:5001"
    })
  }
};
