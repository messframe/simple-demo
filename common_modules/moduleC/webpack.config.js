/* eslint-env node */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'moduleC.js',
    library: 'moduleC',
    libraryTarget: 'amd',
    path: path.resolve(__dirname, './build/moduleC'),
    publicPath: process.env.NODE_ENV === 'development' ? 'http://localhost:8240' : 'https://mess-c.winerlu.com/moduleC'
  },
  mode: 'production',
  module: {
    rules: [{
        parser: {
          System: false
        }
      },
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  require('autoprefixer')
                ];
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        exclude: [/\.krem.css$/],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader'
        }]
      }
    ],
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ],
  },
  devtool: 'source-map',
  externals: [
    /^@portal\/*/,
    /^lodash$/,
    /^single-spa$/,
    /^rxjs\/?.*$/,
    /^react$/,
    /^react\/lib.*/,
    /^react-dom$/,
    /.*react-dom.*/,
    /^redux$/,
    /^react-redux$/,
  ],
};