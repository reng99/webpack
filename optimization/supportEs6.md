## 支持es6的语法


### 优化需求

使用es6语法开发能够使得开发周期缩短和写代码的优雅等。然而，对于es6的语法，现在浏览器还是不能够识别，需要将语法转换成es5。


### 优化方案

ECMAScript 6 是一个泛指，含义是5.1版本后的JavaScript的下一代标准，涵盖了ES2015, ES2016, ES2017等。

Babel转码器是一个广泛使用的ES6转码器，可以将ES6转码为ES5。

> 配置文件:.babelrc

在根目录下新建名为`.babelrc`的文件。
配置文件的基本格式：

```json

    // .babelrc
    {
    "presets": [],
    "plugins": [],
    }

```

使用babel先要安装规则集，安装完后加入到配置文件中。官方的规则集如下：

```javascript

    # ES2015转码规则
    $ npm install --save-dev babel-preset-es2015

    # ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
    $ npm install --save-dev babel-preset-stage-0
    $ npm install --save-dev babel-preset-stage-1
    $ npm install --save-dev babel-preset-stage-2
    $ npm install --save-dev babel-preset-stage-3

```

配置相关的`.babelrc`，我根据需求，配置了如下的内容:

```json

    {
        "presets":[
            "es2015",
            "stage-2"
        ]
    }

```
