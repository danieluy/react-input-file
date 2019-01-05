const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
  const config = {
    entry: {
      bundle: path.join(__dirname, 'src/InputFile/InputFile.js'),
    },
    output: {
      filename: 'index.js',
      path: path.join(__dirname, '/lib/'),
      library: 'InputFile',
      libraryTarget: 'umd',
    },
    module: {
      loaders: [
        {
          loader: 'babel-loader',
          include: [
            path.join(__dirname, '/src/'),
          ],
          exclude: /(node_modules)/,
          test: /\.jsx?$/,
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new UglifyJsPlugin({}),
    ],
  };
  return config;
};
