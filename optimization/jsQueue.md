## chunksSortMode进行JS引用顺序进行必要的优化

内容今晚整理提交

先添加一个示范：

```javascript

 new HtmlWebpackPlugin({// 首充号-- 多选项
            filename:resolve('/dist/initial_charge_multi_select.html'),
            template:'./src/initial_charge_multi_select.html',
            chunks:['common','initialCharge','pagination'],
            chunksSortMode:function(chunk1,chunk2){// 按照指定的顺序加载
                var order = ['common','initialCharge','pagination'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1-order2;
            }
        }),

```
