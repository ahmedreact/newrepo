const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

module.exports = {
  entry: {
    main: resolve(__dirname, '../src'),
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-thunk',
      'styled-components',
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, '../src')],
        loader: 'babel-loader',
        options: {
          presets: [("babel-preset-es2015", "babel-preset-es2016",
          "babel-preset-es2017").map(require.resolve)],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Sam Affiliates Portal',
      template: 'webpack/template.html',
    }),
    // new OfflinePlugin({
    //   ServiceWorker: {
    //     navigateFallbackURL: '/',
    //   },
    //   AppCache: false,
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_ROOT: JSON.stringify('http://www.sam-affiliate-portal.herokuapp.com'),
      },
    }),
  ],
}
