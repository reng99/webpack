## 团队协作中不同编辑器的代码缩进等统一规范

### 优化需求

在团队的开发中，统一的代码格式是必要的。但是不同的开发人员使用的编辑工具可能不同，这样就造成代码的differ。


### 优化方案

添加`.editorconfig`文件，我根据需求，在这个文件中添加了下面的一些内容。

```bash

# 详情查考http://editorconfig.org/

root = true #表明是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件。

# Unix-style newlines with a newline ending every file
[*]
charset = utf-8 #编码，latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用utf-8-bom。
indent_style = space #设置缩进风格，tab或者空格。tab是hard tabs，space为soft tabs。
indent_size = 4 #缩进的宽度，即列数，整数。如果indent_style为tab，则此属性默认为tab_width。
end_of_line = cr #换行符，lf、cr和crlf
insert_final_newline = true #设为true表明使文件以一个空白行结尾
trim_trailing_whitespace = true #设为true表示会除去换行行首的任意空白字符。

```

具体配置的详细内容请参考[官网](http://editorconfig.org/)。

配置好上面的内容之后，需要在使用的编辑器上面安装`editorconfig`的插件（plugin）才能生效。
