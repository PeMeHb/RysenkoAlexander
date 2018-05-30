const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const textPlugin = require('extract-text-webpack-plugin');
const args = require('yargs').argv;
const CopyWebpackPlugin = require('copy-webpack-plugin');

let styleLoader = ['style-loader', 'css-loader', 'sass-loader'];

const images = ['jpg', 'jpeg', 'png', 'gif', 'svg'];

const plugins = [
  new htmlPlugin({
    template: 'index.html'
  }),
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
  new webpack.HotModuleReplacementPlugin(),
  new textPlugin({
    filename: 'main-[contenthash].css',
    allChunks: true
  }),
  new webpack.ProvidePlugin({
    React: 'react',
    $: 'jquery',
    PropTypes: 'prop-types',
    Component: ['react', 'Component']
  }),
  new CopyWebpackPlugin([
    ...images.map(ext => ({ from: `**/*/*.${ext}`, to: 'images/[name].[ext]' }))
  ])
];

module.exports = {
  entry: {
    main: './app.js',
    vendor: ['react', 'react-dom']
  },
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /src.*\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-class-properties']
          }
        }
      },
      {
        test: /\.s?css$/,
        use: textPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['src']
              }
            }
          ]
        })
      }
    ],
  },

  plugins,

  devtool: 'source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    port: 9000
  }
};
