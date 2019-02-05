import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { DefinePlugin } from 'webpack';

import base from './webpack.base.config';

export default base({
  mode: 'development',

  entry: [
    '@babel/polyfill',
    'react-app-polyfill/ie11',
    path.join(process.cwd(), 'src/index.js'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
    }),

    new DefinePlugin({
      BASE_API_PATH: JSON.stringify(''),
    }),
  ],

  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true,
  },

  performance: {
    hints: false,
  },
});
