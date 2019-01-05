const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
  const config = {
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 5000,
      historyApiFallback: true
    },
    entry: {
      bundle: path.join(__dirname, 'src/index.js')
    },
    output: {
      publicPath: '/',
      filename: '[name].js',
      path: path.join(__dirname, 'build'),
    },
    module: {
      loaders: [
        {
          loader: 'babel-loader',
          include: [
            path.join(__dirname, '/src/')
          ],
          exclude: /(node_modules|bower_components)/,
          test: /\.jsx?$/,
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      ]
    },
  };
  if (env.development)
    config.devtool = 'inline-source-map';
  if (env.production)
    config.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new UglifyJsPlugin({})
    ];
  return config;
};
