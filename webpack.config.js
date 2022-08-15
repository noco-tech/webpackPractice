const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // mode: "devlopment",
  devtool: "source-map",
  entry: "./src/javascripts/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./javascripts/[name]-[contenthash]].js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            // options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)/,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[contenthash][ext]",
        },

        loader: "image-webpack-loader",
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
        },
        // use: [
        //   {
        //     loader: "file-loader",
        //     options: {
        //       esModule: false,
        //       name: "images/[name][ext]",
        //     },
        //   },
        // ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./stylesheets/[name]-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/access.html",
      filename: "access.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
