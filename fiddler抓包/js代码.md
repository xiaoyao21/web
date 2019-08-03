```js
//-------------------------------------------------------------------抓包下来的js文件-----------------------------------------------------------------------
//...此处省略几万行代码
(function() {
    var c7f = NEJ.P,
        es9j = c7f("nej.g"),
        v7o = c7f("nej.j"),
        k7d = c7f("nej.u"),
        QE1x = c7f("nm.x.ek"),
        l7e = c7f("nm.x");
    if (v7o.bk7d.redefine) return;
    window.GEnc = true;
    var bqu9l = function(cHA6u) {
        var m7f = [];
        k7d.be7X(cHA6u, function(cHy6s) {
            m7f.push(QE1x.emj[cHy6s])
        });
        return m7f.join("")
    };
    var cHx6r = v7o.bk7d;
    v7o.bk7d = function(Z7S, e7d) {
        var i7b = {},
            e7d = NEJ.X({}, e7d),
            mp1x = Z7S.indexOf("?");
        if (window.GEnc && /(^|\.com)\/api/.test(Z7S) && !(e7d.headers && e7d.headers[es9j.zM5R] == es9j.JM8E) &&
            !e7d.noEnc) {
            if (mp1x != -1) {
                i7b = k7d.gV0x(Z7S.substring(mp1x + 1));
                Z7S = Z7S.substring(0, mp1x)
            }
            if (e7d.query) {
                i7b = NEJ.X(i7b, k7d.fN9E(e7d.query) ? k7d.gV0x(e7d.query) : e7d.query)
            }
            if (e7d.data) {
                i7b = NEJ.X(i7b, k7d.fN9E(e7d.data) ? k7d.gV0x(e7d.data) : e7d.data)
            }
            i7b["csrf_token"] = v7o.gL0x("__csrf");
            Z7S = Z7S.replace("api", "weapi");
            e7d.method = "post";
            delete e7d.query;
            var bXY8Q = window.asrsea(JSON.stringify(i7b), bqu9l(["流泪", "强"]), bqu9l(QE1x.md), bqu9l(["爱心",
                "女孩", "惊恐", "大笑"
            ]));
            e7d.data = k7d.cy8q({
                params: bXY8Q.encText,
                encSecKey: bXY8Q.encSecKey
            })
        }
        cHx6r(Z7S, e7d)
    };
    v7o.bk7d.redefine = true
})();
//...此处省略几万行代码
//---------------------------------------修改后的js文件  部分代码-------------------------------------------
function changeString(findStr,page) {  //封装成函数changeString
    var c7f = NEJ.P,
        es9j = c7f("nej.g"),
        v7o = c7f("nej.j"),
        k7d = c7f("nej.u"),
        QE1x = c7f("nm.x.ek"),
        l7e = c7f("nm.x");
    if (v7o.bk7d.redefine) return;
    window.GEnc = true;
    var bqu9l = function(cHA6u) {
        var m7f = [];
        k7d.be7X(cHA6u, function(cHy6s) {
            m7f.push(QE1x.emj[cHy6s])
        });
        return m7f.join("")
    };
    var cHx6r = v7o.bk7d;
    v7o.bk7d = function(Z7S, e7d) { //！！！！！！！！！！！！！！！！！！！！注意了
        var i7b = {},
            e7d = NEJ.X({}, e7d),
            mp1x = Z7S.indexOf("?");
        if (window.GEnc && /(^|\.com)\/api/.test(Z7S) && !(e7d.headers && e7d.headers[es9j.zM5R] == es9j.JM8E) &&
            !e7d.noEnc) {
            if (mp1x != -1) {
                i7b = k7d.gV0x(Z7S.substring(mp1x + 1));
                Z7S = Z7S.substring(0, mp1x)
            }
            if (e7d.query) {
                i7b = NEJ.X(i7b, k7d.fN9E(e7d.query) ? k7d.gV0x(e7d.query) : e7d.query)
            }
            if (e7d.data) {
                i7b = NEJ.X(i7b, k7d.fN9E(e7d.data) ? k7d.gV0x(e7d.data) : e7d.data)
            }
            i7b["csrf_token"] = v7o.gL0x("__csrf");
            Z7S = Z7S.replace("api", "weapi");
            e7d.method = "post";
            delete e7d.query;
            i7b.s=findStr //改变   搜索的关键字
            i7b.offset= (page-1)*30 //改变  传入页数的数字
            var bXY8Q = window.asrsea(JSON.stringify(i7b), bqu9l(["流泪", "强"]), bqu9l(QE1x.md), bqu9l(["爱心",
                "女孩", "惊恐", "大笑"
            ]));
            e7d.data = k7d.cy8q({
                params: bXY8Q.encText,
                encSecKey: bXY8Q.encSecKey
            })
            if (i7b.noescape == true) {  //判断什么时候拿到的是真正的密钥
                transtring = i7b.data;
            }
        }
        cHx6r(Z7S, e7d)
    };
    v7o.bk7d.redefine = true
    
     return new Promise(function(resolve, reject) {  //解决直接打印全局变量transtring 执行顺序的问题
        setTimeout(function(){   //定时器 使其异步触发
                    if(transtring!="")
                    resolve(transtring);
                }, 1);
    });
};


changeString("水果",2).then((obj)=>{
    console.log(obj,"kkk");
})
```