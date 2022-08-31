const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const fs = require('fs');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: "./src/main.tsx",
    mode: "development",
    //mode: 'production',
    devServer: {
        static: path.resolve(__dirname, 'dist', 'static'),
        compress: true,
        //https: true,
        port: 9000,
    },
  
    optimization: {
        //minimize: true,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
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
              { from: "static", to: "./static" },
            ],
          }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            exclude: [/node_modules/, /src/],
            maximumFileSizeToCacheInBytes: 99999999999,
            clientsClaim: true,
            skipWaiting: true,
            swDest: './service-worker.js'
          }),
    ],

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
