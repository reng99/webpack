module.exports = {
    root:true,
    parser:"babel-eslint",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jquery":true,//添加支持jquery语法检查，不然会出现'$'is no-undef
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    plugins:[
        "html"//检查.html中的javascript中的语法错误
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [//检查分号
            "error",
            "always"
        ],
        "no-console":"off"
    }
};
