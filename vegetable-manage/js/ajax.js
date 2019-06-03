Ajax({
    url: "http://120.79.141.139/MTmarket/releasenotice", //请求地址
    type: 'get', //请求方式
    // data: tell,
    async: true, //true是否异步
    success: function(responseText) {
        var obj = JSON.parse(responseText);
        // //console.log(responseText);
        // if(obj.style==-200){
            
        //     window.location.href="http://132.232.169.227:8858/login_pc.html"
        // }else if (obj.style == 0)
        //     alert(obj.msg);
        // else {
        //     alert(obj.msg);
        // }
    },
    fail: function(err) {
        alert("请求打分规则,通信错误");
    }
});
