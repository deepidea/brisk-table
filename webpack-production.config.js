const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: {
    main: [
      './src/app/brisk-table.js',
    ],
  },
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: path.resolve(__dirname, '.'), // Path of output file
    filename: 'brisk-table.js', // Name of output file
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    // Transfer Files
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets:['es2015', 'react', 'stage-2'],
        },
      },
    ],
  },
};

module.exports = config;
