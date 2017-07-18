const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry:{//string|object|array,起点或者是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行
        home:'./src/js/index.js',
        test:'./src/css/index.css',
        intro:'./src/less/index.less'
    },
    output:{//指示webpack如何去输出，以及在哪里输出你的「bundle、asset和其他你所打包或使用webpack载入的任何内容」。
        path:path.join(__dirname,'dist'),//目录对应一个绝对路径
        //pathinfo:true,//告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。默认是false，pathinfo是在开发环境中使用，在生产环境中就不推荐
        filename:'js/[name].js',//filename选项决定了在每个输出bundle的名称。这些bundle将写入到「output.path」选项指定的目录下
        //publicPath:'dist/',//值是string类型，对于加载（on-demand-load）或加载外部资源(external resources)（如图片、文件等）来说
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
    module:{ //处理项目中的不同的模块
        rules:[//格式array,创建模块时，匹配请求的规则数组。这些规则能够对修改模块的创建方式。这些规则能够对（module）应用loader，或修改解析器（parser）
            {// 处理js-es6的规则
                test:/\.js$/,//匹配资源，处理的文件的后缀名
                use:['babel-loader'],//每个入口（entry）指定使用一个loader，处理的加载器是loader
                include:path.join(__dirname,'src')//包含的路径（匹配特定条件）
            },
            {//处理css的规则
                test:/.css$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader:"css-loader",
                    },
                    publicPath: "../"//重写资源的引入的路径,参考链接https://webpack.js.org/plugins/extract-text-webpack-plugin/#-extract
                })
            },
            {//处理less的规则
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','autoprefixer-loader','less-loader'],
                    publicPath:'../'
                })
            },
            {//处理图片资源,样式
                test:/\.(png|svg|jpe?g|gif|ico)$/i,//这里处理了以.png .svg .jpg .jpeg .gif为后缀名的图片
                use:[
                    {
                        loader:'file-loader?limit=1024&name=images/[name].[ext]'//这里指出的是build之后将图片存储的文件夹
                    }
                ]
            },
            {//处理html，插入在html中的图片img用此处理
                test:/\.html$/,
                use:[
                    {loader:'html-loader'}
                ]
            },
            {//处理字体
                test:/\.(woff2?|eot|ttf|otf)$/i,
                use:[
                    // 'file-loader'//等同于{loader:'file-loader'}
                    'file-loader?limit=1024&name=fonts/[name].[ext]'// 这里指出了build之后将用到的字体存储的文件夹
                ]
            }
        ]
    }
}