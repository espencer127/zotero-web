const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point of your application
  output: {
    filename: "[name].js", // Output bundle file name
    path: path.resolve(__dirname, "dist"), // Output directory
    chunkFilename: '[id].[chunkhash].js'
  },
  plugins: [
          new NodePolyfillPlugin(),
          new HtmlWebpackPlugin({
              template: "public/index.html",
              filename: "index.html",
              inject: true,
              favicon: "public/favicon.ico",
              manifest: "public/manifest.json",
          })
      ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'public/[name].[ext]'
        }
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
          http: require.resolve("stream-http") // that is this
    }
  },
  devServer: {
    port: 8080, // Port for the development server
    open: false, // Open the default web browser when the server starts
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
  },
};