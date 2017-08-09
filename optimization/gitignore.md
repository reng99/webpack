### 忽略node_modules等文件


### 优化需求

在进行github的提交的过程中，需要忽略一些不必要的提交，比如忽略提交依赖--`node_modules`等。

### 优化方案

在根目录里面添加`.gitignore`文件，这个文件的意思是gtihub提交的时候忽略的内容。
忽略什么内容，你可以在文件内添加。这里我只是忽略提交`node_modules && dist`【dist文件夹是在执行npm run build之后产生的】，所以我添加的内容如下:

```javascript

/node_modules

/ dist

```
