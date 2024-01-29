const { mergeWithRules } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const dotenv = require('dotenv');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const path = require('path');
const common = require('./webpack.common.js');

dotenv.config();

const merge = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'replace'
    }
  }
});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    host: process.env.HOST,
    port: process.env.PORT,
    hot: true
  },
  resolve: {
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-router-dom': path.resolve('./node_modules/react-router-dom'),
      'react-redux': path.resolve('./node_modules/react-redux')
    }
  },
  plugins: [
    new ReactRefreshWebpackPlugin({ overlay: false })
  ],
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        exclude: [/node_modules/], 
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()],
              }),
              transpileOnly: true
            }
          }
        ]
      }
    ]
  }
});
