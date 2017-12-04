## 简介

基于webpack开发，搭建公司的项目，适合PC端的多页面开发。喜欢的话就star🌟一下咯。如有不妥的地方，还请指正，不胜感激。


## 项目背景

因为业务的需要，自己被抽调出来支持另外一个项目。然而，这个项目只有我一个前端，再然而，自己没有跟java的合作过。

他们的技术选型初期是，网页是使用多页面的，前端（我）这边是提供静态的网页给到他们，然后他们使用freemarker来进行数据的写入，然后有什么交互的话我再介入。让后自己就构造出了这么一个实现多页面的`webpack`项目。

昨天(2017-08-03)进行交流，现在是百分之六十确定上面的方案，不过这样他们后台的工作量就增多，而且好像我也用不到前端的框架。乘着设计还没给设计稿，然后我又新建了一个仓库[vue-cli_multipage](https://github.com/reng99/vue-cli_multipage)，用来探讨一下vue实现多页面应用。

-----------------分割线--------------------

在这两天的搭建[vue-cli_multipage](https://github.com/reng99/vue-cli_multipage)项目中，自己深深感到用vue实现的mpa页面的恶意，混合的东西还是很多，对于多页面来说是个头疼的问题。原谅自己的水平有限，后期回头再看看[vue-cli_multipage](https://github.com/reng99/vue-cli_multipage)。因为在这方面的种种问题，还是使用现在的这个搭建好的`webpack`项目来支持公司的业务（最多要减轻后端压力的话，自己再学点`freemarker`语法），因为`webpack`项目是自己纯手动搭建的，不像`vue-cli`脚手架搭建mpa，出了什么问题那我就有的背锅了。:blush:


## 项目地址

[https://github.com/reng99/webpack](https://github.com/reng99/webpack)



## 使用方法 -- 请保持网络的顺畅

```

# 下载代码
$ git clone https://github.com/reng99/webpack.git

# 进入根目录
$ cd webpack

# 安装依赖
$ npm install   (如果安装依赖失败，有可能是您的npm 版本过低哦，请尝试npm i -g npm 之后执行npm install)

# 开发模式 (执行完npm run dev 后，如果浏览器没有弹出新窗口，请手动输入localhost:9000访问)
$ npm run dev

# 检查语法(此步骤可省略，因为在开发的过程中已经检查)
$ npm run lint

# 生产模式
$ npm run build
[注意，在生产模式中，使用到的第三方的资源需要额外在vendor文件夹中按需引用,建议引用相关的CDN(Content Delivery Network 【内容分发网络】)来进行前端优化]
[如果在生产环境中，相关的.js文件只是引入了.less的文件，那么在生产环境中就要去除生产的相关的.js文件，保留相关的.css文件就可以了。比如：about.js文件引入了about.less的代码，但是about.js文件中没有任何的javascript代码，在生产环境中保留相关的about.css(build后的文件名称有所不同)文件，删除多余的about.js(build后的文件名称有所不同)]

```

生产环境中引入了`vendor`里面的内容，如下

```javascript

    ...
    new webpack.ProvidePlugin({
        $: "jquery",//jquery
        jQuery: "jquery",
        "window.jQuery": "jquery",
        _:"lodash"//lodash
    })
    ...

```
额外引入了`handlebars`。

然而在生产环境中没有引用到，所以，在`npm run build`之后，你需要在使用到的页面引用`vendor`文件夹里面的内容。


**转换成非压缩版的css和js**

在某种情况下，需要对`npm run build`之后的生成的`.css`和  `.js`文件进行更改，这个时候压缩就不好阅读并更改，此时可以更改一下生成环境`./build/webpack.config.prod.js`里面的内容，注释掉压缩`js和css`的相关代码就行。

```javascript

    ..
    plugins:[//插件，具体的内容可以查看链接 -- https://doc.webpack-china.org/plugins/

        // 注释掉
        new OptimizeCssAssetsPlugin({//对生产环境的css进行压缩
            cssProcessorOptions:{
                safe:true
            }
        }),
        // 注释掉
        new UglifyJSPlugin({//压缩js代码--链接 https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/

        }),

    ],
    ...

````
然后更改一下生成文件的名称就可以了。`./build/webpack.base.config.js`

```javascript
    ...
    output:{
        path:path.join(__dirname,'../dist/'),
        filename:'js/[name].[chunkhash].js',// 原先压缩的为'js/[name].[chunkhash].min.js'
    },
    ...
    plugins:[
        ...
        new ExtractTextPlugin({//从bundle中提取出
            filename:(getPath)=>{
                return getPath('css/[name].[chunkhash].css').replace('css/js', 'css'); // 原名'css/[name].[chunkhash].min.css'
             },
       ...
    ]
```



## 优化历史(optimation 文件夹中)

1. [提交到github忽略node_modules等文件](./optimization/gitignore.md)

2. [支持es6语法](./optimization/supportEs6.md)

3. [团队ide中editorconfig规范](./optimization/editorconfig.md)

4. [添加服务器外部可以访问](./optimization/devhost.md)

5. [添加eslint规范代码](./optimization/eslint.md)

6. [添加chunkhash值管理资源](./optimization/chunkhash.md) 2017-08-09

7. [添加handlebars处理](./optimization/handlebars.md) 2017-08-24

8. [使用chunksSortMode对相关的js进行顺序管理](./optimization/jsQueue.md) 2017-09-07



## plugins选讲

- [webpack-merge](https://npm.taobao.org/package/webpack-merge) --> it provides a `merge` function that concatenates(联系) arrays and merges objects creating a new object.

- [uglifyjs-webpack-plugin](https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/) --> uglify js

- [plugin ProvidePlugin](https://webpack.github.io/docs/shimming-modules.html#plugin-provideplugin) --> This plugin makes a module availble as a variable in `every` module is required only you use the variable.


## vendor 引用

- [jQuery](https://jquery.com/) --> jQuery is a fast,small,and feature-rich Javascript library.It makes things like HTML document traversal and manipulation,event handling,and Ajax much simpler with an easy-to-use API that works across a multitude of browers.With a combination of versatility,jQuery has changed the way thar millions of people write Javascript.

- [lodash](https://lodash.com/) --> A modern JavaScript utility library delivering modularity(模块化),performance & extras. 类似[underscore](http://underscorejs.org/)

- [handlebars](http://handlebarsjs.com/)(2017-08-24) --> Handlebars provides the power necessary to let you build `sematic templates`(语义化模板) effectively with no frustration.



## 仓库说明

- 本仓库用到的代码是自己学习中总结的

- 本仓库用到的图片是自己在谷歌浏览器上运行的截图和本公司[官网](https://www.52tt.com/)的图片

- 本仓库中部分文字引用出自网络，如有侵权，请与我联系--1837895991@qq.com 。我会在第一时间删除。


## 相关参考

- [webpack官网](http://webpack.github.io/)

- [eslint配置](http://eslint.org/docs/user-guide/configuring)


## 后话

项目已经上线，基于本仓库完成的前端效果--线上的地址为[https://www.taomitao.com/](https://www.taomitao.com/) 2017-11-03。喜欢本仓库的搭建就star🌟支持一下啦:blush:

最近(2017.12.04)自己花了一周时间重新搭建了自己的博客，网站是[http://reng99.cc](http://reng99.cc/) 在2018年一月份之后，公司本项目（pc端和m端）结束后，自己会将自己的webpack的搭建重头到尾用博文的方式展示出来，还请多多指教！

