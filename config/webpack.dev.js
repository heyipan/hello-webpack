const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const bootstrapEntryPoints = require('../webpack.bootstrap.config')

module.exports = merge(common, {
  entry: './src/app.js'
    /*"contact": './src/contact.js',*/
    /*"bootstrap": bootstrapEntryPoints.dev*/
  ,
  devtool: 'inline-source-map',
});
