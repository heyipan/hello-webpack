const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  output: {
    /*path: path.resolve(__dirname, 'dist'),*/
    path: __dirname + '/dist',
    /*filename: '[name].[chunkhash].js'*/
    filename: 'app.bundle.js'
  },

};
