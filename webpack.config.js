'use strict';

const Config = require('getconfig');
const Webpack = require('webpack');
const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const Fs = require('fs');

const { isDev, env } = Config.getconfig;

// Generated files aren't committed to source control, so we can read the glob paths
// from gitignore to make sure that all generated files are removed and rebuilt
// when webpack is run between dev/prod modes
const generatedFiles = Fs.readFileSync(Path.resolve(__dirname, '.gitignore'), 'utf-8')
  .split('\n')
  .filter((p) => p.startsWith('public/'))
  .map((p) => p.replace('public/', ''));

module.exports = {
  entry: {
    app: './client/main.js'
  },

  output: {
    filename: isDev ? '[name].js' : '[name].[hash].js',
    path: Path.resolve(__dirname, 'public')
  },

  devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
  devServer: Object.assign({}, Config.webpackDev, {
    quiet: true,
    noInfo: true,
    // webpack-dev-server isn't used to serve any other assets
    contentBase: false
  }),

  resolve: {
    extensions: ['.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env === 'dev' ? 'development' : env)
    }),
    new CleanWebpackPlugin(generatedFiles, {
      verbose: false,
      root: Path.resolve(__dirname, 'public')
    }),
    !isDev && new AssetsPlugin(),
    !isDev && new Webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ].filter(Boolean)
};
