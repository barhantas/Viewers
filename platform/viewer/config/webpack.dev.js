const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const SRC_DIR = path.join(__dirname, '../src');
const DIST_DIR = path.join(__dirname, '../dist');
const INDEX = path.join(DIST_DIR, 'index.html');

module.exports = (env, argv) => {
  const commonConfig = common(env, argv);

  return merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
      path: DIST_DIR,
      publicPath: '/',
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(gif|jp?g|png|svg|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                context: SRC_DIR,
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      // hot: true,
      inline: true,
      compress: false,
      // contentBase: DIST_DIR,
      open: true,
      port: 3001,
      writeToDisk: true,
      historyApiFallback: {
        index: '/',
      },
    },
  });
};