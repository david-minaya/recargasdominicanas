const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public' }
      ]
    })
  ],
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        exclude: [/node_modules/], 
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          'group-style-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[folder]-[local]-[hash:base64:5]"
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  }
}
