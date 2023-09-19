const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/main.tsx",
    mode: "development",
    //mode: 'production',
  
    optimization: {
        //minimize: true,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
              test: /\.s[ac]ss$/i,
              use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
              test: /\.css$/i,
              use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "static/favicon-32x32.png",
            template: "./index.html",
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
            filename: "index.html", //Name of file in ./dist/
            template: "index.html", //Name of template in ./src
            hash: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: "static", to: "./" },
            ],
          }),
    ],

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
