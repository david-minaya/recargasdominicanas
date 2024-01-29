const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    components: './src/components/index.ts',
    types: './src/types/index.ts',
    utils: './src/utils/index.ts',
    api: './src/api/index.ts',
    hooks: './src/hooks/index.ts',
    store: './src/store/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name]/index.js',
    library: {
      name: 'core',
      type: 'umd',
    },
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
    'react-redux': 'react-redux',
    '@reduxjs/toolkit': '@reduxjs/toolkit',
    'axios': 'axios'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './package.json' },
        { from: './src/theme.css' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /\.stories.tsx?/],
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
                auto: true,
                localIdentName: "core-[folder]-[local]-[hash:base64:5]"
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  }
}
