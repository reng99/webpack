const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:[//string|object|array,起点或者是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行
        './src/js/index.js',
        './src/less/index.less',
        './src/css/index.css'
    ],
    output:{//指示webpack如何去输出，以及在哪里输出你的「bundle、asset和其他你所打包或使用webpack载入的任何内容」。
        path:path.join(__dirname,'dist'),//目录对应一个绝对路径
        //pathinfo:true,//告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。默认是false，pathinfo是在开发环境中使用，在生产环境中就不推荐
        filename:'bundle.js',//filename选项决定了在每个输出bundle的名称。这些bundle将写入到「output.path」选项指定的目录下
        publicPath:'/',//值是string类型，对于加载（on-demand-load）或加载外部资源(external resources)（如图片、文件等）来说
        //output.publicPath是很重要的选项。如果指定了一个错误的值，则在加载这些资源的时候会收到404错误
    },
    devServer:{//通过来自「webpack-dev-server」的这些选项，能够通过多种方式改变其行为。
        port:9000,//指定监听的端口号
        contentBase:path.join(__dirname,'dist'),// 告诉服务器从哪来提供内容。只有在你想要提供静态文件时才需要。
        publicPath:'/',//用于确定从哪里提供bundle，并且此选项优先
        compress:true,//一切服务都启用「gzip」压缩
        //quiet:true,//除了初始化启动信息之外的任何内容都不会被打印到控制台。这也就意味着来自webpack的错误或警告在控制台不可见
    },
    plugins:[//插件，具体的内容可以查看链接 -- https://doc.webpack-china.org/plugins/
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    module:{ //处理项目中的不同的模块
        rules:[//格式array,创建模块时，匹配请求的规则数组。这些规则能够对修改模块的创建方式。这些规则能够对（module）应用loader，或修改解析器（parser）
            {// 处理js-es6的规则
                test:/\.js$/,//匹配资源，处理的文件的后缀名
                use:['babel-loader'],//每个入口（entry）指定使用一个loader，处理的加载器是loader
                include:path.join(__dirname,'src')//包含的路径（匹配特定条件）
            },
            {
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            },
            {//处理css的规则,处理less的规则
                test:/\.less$/,
                use:[//use的别名--loaders
                    {loader:'style-loader'},//style-loader 和 css-loader 的顺序是不能够颠倒的
                    {
                        loader:'css-loader',//使用loader来解析选项
                        // options:{//loader的选项
                        //     modules:true
                        // }
                    },
                    {loader:'autoprefixer-loader'},
                    {loader:'less-loader'},
                ]
            },
            {//处理图片资源,样式
                test:/\.(png|svg|jpg|jpeg|gif)$/,//这里处理了以.png .svg .jpg .jpeg .gif为后缀名的图片
                use:[
                    {loader:'file-loader'}
                ]
            },
            {//处理html，插入在html中的图片img用此处理
                test:/\.html$/,
                use:[
                    {loader:'html-loader'}
                ]
            },
            {//处理字体
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'//等同于{loader:'file-loader'}
                ]
            }
        ]
    }
}