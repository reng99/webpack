## 使用chunkhash来管理资源

这里使用chunkhash管理的资源主要是生产环境下的`css和js`资源。


### 优化需求

当项目随着时间的推移，需求的增加，系统版本的叠加，就有必要对资源进行整改，但是又想保留之前的生产版本，方便回滚。

而且当项目发布到线上的时候，对静态资源的管理直接影响到系统的体验--如下面

![deploy](./images/deploy.png)

采用query更新缓存的方式实际上要覆盖线上文件的，index.html和a.js总有一个先后的顺序，从而中间出现一段或大或小的时间间隔。尤其是当页面是后端渲染的模板的时候，静态资源和模板是部署在不同的机器集群上的，上线的过程中，静态资源和页面文件的部署时间间隔可能会非常长，对于一个大型互联网应用来说即使在一个很小的时间间隔内，都有可能出现新用户访问。在这个时间间隔中，访问了网站的用户会发生什么情况呢？

如果先覆盖index.html，后覆盖a.js，用户在这个时间间隙访问，会得到新的index.html配合旧的a.js的情况，从而出现错误的页面。
如果先覆盖a.js，后覆盖index.html，用户在这个间隙访问，会得到旧的index.html配合新的a.js的情况，从而也出现了错误的页面。
这就是为什么大型web应用在版本上线的过程中经常会较集中的出现前端报错日志的原因，也是一些互联网公司选择加班到半夜等待访问低峰期再上线的原因之一。


### 优化方案

对于静态资源缓存更新的问题，目前来说最优方案就是 基于文件内容的hash版本冗余机制 了。也就是说，我们希望项目源码是这么写的：

```javascript

<script type="text/javascript" src="a.js"></script>

```

发布后代码变成

```javascript

<script type="text/javascript" src="a_8244e91.js"></script>

```

也就是a.js发布出来后被修改了文件名，产生一个新文件，并不是覆盖已有文件。其中”_82244e91”这串字符是根据a.js的文件内容进行hash运算得到的，只有文件内容发生变化了才会有更改。由于将文件发布为带有hash的新文件，而不是同名文件覆盖，因此不会出现上述说的那些问题。同时，这么做还有其他的好处：

上线的a.js不是同名文件覆盖，而是文件名+hash的冗余，所以可以先上线静态资源，再上线html页面，不存在间隙问题；
遇到问题回滚版本的时候，无需回滚a.js，只须回滚页面即可；
由于静态资源版本号是文件内容的hash，因此所有静态资源可以开启永久强缓存，只有更新了内容的文件才会缓存失效，缓存利用率大增；

【注意】⚠️ ️不过为了方便管理，我在生产环境和开发环境的过程中都用了`chunkhash`

代码的添加如下：

在`build->webpack.base.config.js`内修改js和css输出的文件就可以了

```javascript

    ...

        output:{
                path:path.join(__dirname,'../dist/'),
                filename:'js/[name].[chunkhash].min.js',//添加chunkhash
            },
        plugins: [
            new ExtractTextPlugin({
                filename:(getPath)=>{
                    return getPath('css/[name].[chunkhash].min.css').replace('css/js', 'css');//添加chunkhash
                },
                disable:false,
            }),
            ...
        ]

    ...

```


> 以文件内容的hash值为依据生产新文件的非覆盖式发布策略是解决静态资源缓存更新最有效的手段


### 参考文章

部分内容引用自[https://github.com/fouber/blog/issues/3](https://github.com/fouber/blog/issues/3)

