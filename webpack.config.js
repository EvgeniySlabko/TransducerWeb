const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',      //создает map файл для отладки
  entry: './src/main.tsx',
  mode: 'development',
  //mode: 'production',
  
  /*
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      //{ test: /\.txt$/, use: 'raw-loader' },
      {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }, 
    ],
  },
  plugins: 
  [
    new HtmlWebpackPlugin({ favicon: "images/icons/favicon-32x32.png", template: './index.html' }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      filename: "index.html", //Name of file in ./dist/
      template: "index.html", //Name of template in ./src
      hash: true,
    }),
    require('precss'),
    require('autoprefixer'),
  ],
  
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
  },
  
};