Ajax({
    url: "...", //请求地址
    type: 'get', //请求方式
    // data: tell,
    async: true, //true是否异步
    success: function(responseText) {
        var obj = JSON.parse(responseText);
        // //console.log(responseText);
        // if(obj.style==-200){
            
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
