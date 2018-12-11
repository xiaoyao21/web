const express=require('express');
const expressstatic=require('express-static');
const url1=require('url');
var cookieParser=require('cookie-parser');

var server=express('xiaoyao');

var users={
	'one':'123456', //用户名，密码 数字字母
	'two':'123456',
}
var last;


server.use(cookieParser());
server.get('/one',function(req,res,next){  //从什么地方拿到文件
   
   //if(res.cookie[last])
   var obj=url1.parse(req.url,true); //自动解析
   var message=obj.query;//包含在路由中每个查询字符串参数属性的对象。如果没有，默认为{}
        if(message.now=='zhu'){
            if (users[message.names]) {
                    res.send('{"ok":false,"msg":"用户已存在"}');
                    //console.log("用户名，密码存在");
                    res.end();
                } else {
                    users[message.names] = message.pass;
                    console.log(users[message.names]);
                    res.send('{"ok": true,"msg":"注册成功,快去登陆吧！"}');
                    res.end();
            }
        }
    else if(message.now=='deng')    
    {
    	if (users[message.names]) {
                    if ( users[message.names] == message.pass) {
                        req.secret="xiaoyao";
                        res.cookie(message.names,users[message.names],{path:'/one.html',maxAge:20*1000,signed:true});  //cookie的
                        res.send('{"ok":true,"msg":"登录成功"}');
                        res.send("ok");
                        res.end();
                    } else {
                        res.send('{"ok":false,"msg":"用户名或密码有误"}');
                        res.end();
                    }
                
                } else {
                    res.send('{"ok": false,"msg":"此用户不存在"}');
                    res.end();
                }
        }

 });

server.use(expressstatic('./www'));
server.listen(8080);
