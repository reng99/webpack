## 简介

基于webpack开发，搭建公司的项目，适合PC端的多页面开发。完善搭建中，喜欢的话就star🌟一下咯。如有不妥的地方，还请指正，不胜感激。


## 项目地址

[https://github.com/reng99/webpack](https://github.com/reng99/webpack)


## 相关参考

- [webpack官网](http://webpack.github.io/)

- [eslint配置](http://eslint.org/docs/user-guide/configuring)


## 使用方法

```

# 下载代码
$ git clone https://github.com/reng99/webpack.git

# 安装依赖
$ npm install

# 开发模式
$ npm run dev

# 检查语法(此步骤可省略，因为在开发的过程中已经检查)
$ npm run lint

# 生产模式
$ npm run build
[注意，在生产模式中，使用到的第三方的资源需要额外在vendor文件夹中按需引用,建议引用相关的CDN(Content Delivery Network 【内容分发网络】)来进行前端优化]

```

## 优化历史(optimation 文件夹中)

1. [提交到github忽略node_modules等文件](./optimization/gitignore.md)

2. [支持es6语法](./optimization/supportEs6.md)

3. [团队ide中editorconfig规范](./optimization/editorconfig.md)

4. [添加服务器外部可以访问](./optimization/devhost.md)

5. [添加eslint规范代码]()



## plugins选讲

- [webpack-merge](https://npm.taobao.org/package/webpack-merge) --> it provides a `merge` function that concatenates(联系) arrays and merges objects creating a new object.

- [uglifyjs-webpack-plugin](https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/) --> uglify js

- [plugin ProvidePlugin](https://webpack.github.io/docs/shimming-modules.html#plugin-provideplugin) --> This plugin makes a module availble as a variable in `every` module is required only you use the variable.


## vendor 引用

- [jQuery](https://jquery.com/) --> jQuery is a fast,small,and feature-rich Javascript library.It makes things like HTML document traversal and manipulation,event handling,and Ajax much simpler with an easy-to-use API that works across a multitude of browers.With a combination of versatility,jQuery has changed the way thar millions of people write Javascript.

- [lodash](https://lodash.com/) --> A modern JavaScript utility library delivering modularity(模块化),performance & extras. 类似[underscore](http://underscorejs.org/)
