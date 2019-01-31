import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import base from './webpack.base.config';

export default base({
  mode: 'development',

  entry: [
    require.resolve('react-app-polyfill/ie11'),
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
  ],

  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
});
