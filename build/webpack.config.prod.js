const baseWebpackConfig = require('./webpack.base.config.js');

const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseWebpackConfig,{
    plugins:[//插件，具体的内容可以查看链接 -- https://doc.webpack-china.org/plugins/
        new HtmlWebpackPlugin({//简化了html文件的创建，以便为webpack包提供服务。
            filename:'index.html',
            template:'./src/index.html'
        }),
        new OptimizeCssAssetsPlugin({//对生产环境的css进行压缩
            cssProcessorOptions:{
                safe:true
            }
        }),
        new UglifyJSPlugin({//压缩js代码--链接 https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/

        }),
    ],
})
