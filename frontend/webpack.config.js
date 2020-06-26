/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProdMode = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash].js'
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: isProdMode ? false : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: isProdMode ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProdMode ? '[id].[hash].css' : '[id].css'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProdMode
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer];
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = config;
