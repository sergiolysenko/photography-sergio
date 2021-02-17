const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: `development`,
  entry: [`./main.js`],
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `dist`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `dist`),
    open: true,
    compress: true,
    hot: isDev,
    port: 9000,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: path.join(__dirname, `dist`)
          }
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      }, {
        test: /\.(png|jpe?g|webp)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          }
        }]
      }, {
        test: /\.(ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          }
        }]
      }
    ],
  }
};
