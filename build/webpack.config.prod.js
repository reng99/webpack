const baseWebpackConfig = require('./webpack.base.config.js');

const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseWebpackConfig,{
    plugins:[//插件，具体的内容可以查看链接 -- https://doc.webpack-china.org/plugins/
        new HtmlWebpackPlugin({//简化了html文件的创建，以便为webpack包提供服务。
            filename:'index.html',
            template:'./src/index.html'
        }),
        new ExtractTextPlugin({//从bundle中提取出
            filename:(getPath)=>{
                return getPath('css/[name].css').replace('css/js', 'css');//将入口文件的.css/.less文件从输出的.js文件转换成.css文件
            },
            disable:false,//禁用插件为false
            allChunks:true
        }),
        new OptimizeCssAssetsPlugin({//对生产环境的css进行压缩
            cssProcessorOptions:{
                safe:true
            }
        })
    ],
})
