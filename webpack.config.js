const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config')

var isProd = process.env.NODE_ENV === 'production'; // true or false
var cssDev = ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'];
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  //resolve-url-loader may be chained before sass-loader if necessary
  use: ['css-loader', 'sass-loader']
})

var cssConfig = isProd ? cssProd : cssDev;

var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

let pathsToClean = [
  'dist',
]

module.exports = {
  /*entry: './src/app.js',*/
    entry: {
        "app.bundle": './src/app.js',/*这里的app.bundle相当于别名 */
        // 这行是新增的。
        "contact": './src/contact.js'
    },
  output: {
      path: path.resolve(__dirname, 'dist'),
     /* path: __dirname + '/dist',*/
      filename: '[name].[hash].js' /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
      /*filename: 'app.bundle.js'*/
  },
    module: {
        rules: [
            /*处理css 引用img的情况*/
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            name:'[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        }
                    }
                ]
            },
            /*处理 html  img标签引用图片的情况*/
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            },
            /*处理css*/
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            /*处理scss*/
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader','sass-loader' ]
               /* use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })*/
            },
            // 这两行是处理 react 相关的内容
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins:[
       new HtmlWebpackPlugin({
           template: './src/index.html',
           filename: 'index.html',
           minify: {
               collapseWhitespace: true,
           },
           hash: true,
           excludeChunks: ['contact']
       }),
        new HtmlWebpackPlugin({
            template: './src/contact.html',
            filename: 'contact.html',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
           excludeChunks: ['app.bundle']
        }),
        new ExtractTextPlugin({
            filename:'style.css',
            disable:true/*关闭生成style.css*/
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        // 这两行是新增的 热加载
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()

   ],
    devServer: {
        port: 9000,
        open: true,
        hot:true,/*启用热加载*/
    },

};
