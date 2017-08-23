//index页面引用

// 引入相关的样式
require("../less/index.less");

console.log("index content");

// const arr = ["reng","jia","ming"];

// import {login} from "./login.js";

var loginTpl = require("./login.handlebars");

$("#login").click(function(){
    var div = document.createElement("div");
    div.innerHTML = loginTpl({
        name:"reng jia handlebars"
    });
    $("body").prepend(div);
});

