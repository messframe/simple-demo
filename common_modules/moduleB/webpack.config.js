/* eslint-env node */
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'moduleB.js',
    library: 'moduleB',
    libraryTarget: 'amd',
    path: path.resolve(__dirname, './build/moduleB'),
    publicPath: process.env.NODE_ENV === 'development' ? 'http://localhost:8239' : 'https://mess-c.winerlu.com/moduleB'
  },
  mode: 'production',
  module: {
    rules: [
      {parser: {System: false}},
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
    /^redux$/,
    /^react-redux$/,
    /^react\/lib.*/,
    /^react-dom$/,
    /.*react-dom.*/,
  ]
};

