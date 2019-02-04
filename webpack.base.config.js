import path from 'path';
import { DefinePlugin } from 'webpack';

export default ({
  mode,
  entry,
  output,
  optimization,
  plugins,
  devtool,
  performance,
}) => ({
  mode,

  entry,

  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    ...output,
  },

  optimization,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    ...plugins,
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],

  resolve: {
    modules: ['node_modules', 'src', 'src/app'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },

  devtool,

  target: 'web',

  performance,
});
