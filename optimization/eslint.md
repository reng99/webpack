## 添加eslint规范代码

### 优化需求

团队协作中不可避免有人因为粗心什么的，将js代码写错，比如表达式后面增加了`;;;`三个分号，这也许会导致后期中的代码错误，ESlint和webpack集成，在babel编译代码开始前，进行代码规范检测,有效控制代码的质量。

这里使用`javascript-style-standard`对代码进行规范。


### 优化方案

安装下面的几个npm包：

-    "eslint": "^4.2.0",
-    "eslint-config-standard": "^10.2.1",
-    "eslint-friendly-formatter": "^3.0.0",
-    "eslint-loader": "^1.9.0",
-    "eslint-plugin-html": "^3.1.1",
-    "eslint-plugin-promise": "^3.5.0",
-    "eslint-plugin-standard": "^3.0.1",

上面的安装包的版本号是本项目建立时候时候的版本号，你可以下载最新的，使用`npm install --save-dev + 包名`

在webpack的module字段中，使用相关的规则:

```javascript

    ...
    {//本json是对js的eslint的检查
        enforce:"pre",//在babel-loader对源码进行编译前进行lint的检查
        test:/\.(js|html)$/,//检查js文件和html文件内的javascript代码的规范
        exclude:path.join(__dirname,'node_module'),
        use:[{
            loader:"eslint-loader",
            options:{
                formatter: require('eslint-friendly-formatter')   // 编译后错误报告格式
            }
        }]
    },
    ...

```

另外增加一个文件`.eslintrc`，我自己的相关的配置的内容如下：

```javascript

module.exports = {
    root:true,
    parser:"babel-eslint",
    "env": {
        "browser": true,
        "node":true,
        "commonjs": true,
        "es6": true,//至此es6语法检查
    },
    "extends": "eslint:recommended",//表示使用默认的规则进行校验
    //"extends":"standard",
    "parserOptions": {
        "sourceType": "module"
    },
    plugins:[
        "html",//检查.html中的javascript中的语法错误，执行npm run link就行

        //The eslint-plugin- prefix can be omitted from the plugin name.
        "standard",
        "promise"
    ],
    "rules": {
        //规则有3个等级：off（0）、warn（1）和error（2）。off表示禁用这条规则，warn表示给出警告，并不会导致检查不通过，而error则会导师检查不通过
        "indent": [//缩进
            "error",//可以用2代替error
            "tab"
        ],
        // "linebreak-style": [
        //     "error",
        //     "unix"//如果是在window平台上开发的话，就要改成""windows"
        // ],
        "quotes": [//字符串的引用使用双引号
            "error",
            "double"
        ],
        "semi": [//检查分号semicolons
            "error",
            "always"
        ],
        "no-console":"off"//不检查console.log的语法，忽略它
    },
    "globals":{//声明在代码中自定义的全局变量
        "document":true,
        "navigator":true,
        "window":true,
        "_":true,//检查lodash的语法，否则会产生 '_'is no-undef
        "$":true,////添加支持jquery语法检查，不然会出现 '$'is no-undef,这也可以在env中添加“jquery:true”解决
    }
};


```

更多具体的内容，请访问[eslint的官网](http://eslint.org/)

如果你想确保最后的生产环境下，JS的语法是否正确的时候，你可以在`package.json`scripts字段中添加`"lint":"eslint --ext .html,.js src"`。在生产环境之前执行语法检查就行了。（自我感觉是有些多余了...）
