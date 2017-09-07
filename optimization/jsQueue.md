## chunksSortMode进行JS引用顺序进行必要的优化

### 优化需求

有时候在进行`npm run dev`或`npm run build`的时候，需要确定好加载的`.js`文件的顺序，方便调试和代码的编写，这就要指定`.js`的加载的顺序了。


### 优化方案

使用webpack中`html-webpack-plugin`插件中的`chunksSortMode`字段就可以解决这个问题。

以`../build/webpack.base.config.js`文件中的ahout页面引用的文件做示范:

```javascript

...
    new HtmlWebpackPlugin({
        filename:resolve('/dist/about.html'),
        template:'./src/about.html',
        chunks:['common','about']
    }),
...


```

不做更改的情况下，引入的两个`.js`文件的顺序可能是`common.js  about.js`或者`about.js  common.js`

现在我们需要的是加载顺序是这样的--`common.js  about.js`,那么我们可以做下面的修改以达到目标。

```javascript

 new HtmlWebpackPlugin({
            filename:resolve('/dist/about.html'),
            template:'./src/about.html',
            chunks:['common','about'],
            chunksSortMode:function(chunk1,chunk2){// 按照指定的顺序加载
                var order = chunks:['common','about'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1-order2;
            }
        }),

```


### 参考的文章

- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)

- [chunksSortMode_issue](https://github.com/jantimon/html-webpack-plugin/issues/481)

`chunksSortMode:` Allows to control how chunks should be sorted before they are included to the html. Allowed values: 'none' | 'auto' | 'dependency' |'manual' | {function} - default: 'auto'
