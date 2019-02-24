// var xhr = new XMLHttpRequest();  //请求打分规则数据
// xhr.open( 'GET', '/searchrule' , true );
// xhr.onreadystatechange = function () {
//   if (xhr.readyState !== 4 || xhr.status !== 200) {
//     return;
//   }
//   console.log(xhr.responseText);
// };
// xhr.send();
function opens(obj) {
   for (var i=1;i<=5; i++) {
    if (i===obj){
      document.getElementById("page-" + i).style.display = "block"; 
      document.getElementsByClassName("choose-1")[i-1].style.backgroundColor = "#00b7a9";
      document.getElementsByClassName("choose-1")[i-1].style.color = "white";
    }else
      {
      document.getElementById("page-" + i).style.display = "none";
      document.getElementsByClassName("choose-1")[i-1].style.backgroundColor = "#303c36";
      document.getElementsByClassName("choose-1")[i-1].style.color = "#959a9a";
      }
      
  }   
}

//---page-1-------------------------------------------------------------
//---page-2-------------------------------------------------------------
//---page-3-------------------------------------------------------------
//---page-4-------------------------------------------------------------
//---page-5-------------------------------------------------------------

var grouphand_add=document.getElementsByClassName("grouphand_add")[0];
var grouphand_tell=document.getElementsByClassName("grouphand_tell")[0];
grouphand_add.addEventListener('mousemove',function(){    //添加提交框的提示信息
			         grouphand_tell.style.display="block"; 
			       },false);
grouphand_add.addEventListener('mouseout',function(){
			         grouphand_tell.style.display="none"; 
			       },false);


//一面打分规则
//---------------------------------请求一面打分规则-----------------------------------------------	
var newmessage=document.getElementsByClassName("new-message");
var newsmessage=document.getElementsByClassName("news-message");
//var chargehand;//='{"C语言":50,"沟通能力":10,"算法能力":10}';
//for(var)
Ajax({
    url: "http://192.168.137.1:7070/searchrule", //请求地址
    type: 'get',   //请求方式
    data: {number:1},
    async: false,   //是否异步
    success: function (responseText) {
		var obj=JSON.parse(responseText);
		if(obj.style==0){
			//alert("没有打分标准，请添加!")
		}else{
			//if(r==1)
			//{
			var chargehand=obj.rules;
			var jsonobj=JSON.parse(chargehand); //可以将json字符串转换成json对象 
			var jsonarr = Object.keys(jsonobj); 
			//console.log(jsonarr[0]);  //C语言 属性
			//console.log(jsonobj[jsonarr[0]]);  //50 值
			//console.log(jsonarr.length);  //2 数组的长度
			for(var i=0;i<jsonarr.length;i++)
			{
				newmessage[i].value=jsonarr[i];
				newsmessage[i].value=jsonobj[jsonarr[i]];
			}
		 // }
		}
    },
fail: function (err) {
alert("通信错误"); 
}
}); 


function create_noempty(){
    var list = new Array();
    for(var i=0;i<11;i++){
    	if(newmessage[i].value!=""&&newsmessage[i].value!=""){
    		var obj = {
    			name:newmessage[i].value,
    			value:newsmessage[i].value
    		}
            list.push(obj);
    	}else if(newmessage[i].value!=""&&newsmessage[i].value==""){
    		alert(newmessage[i].value+"没有分值");
    		return false;
    	}
    	else if(newmessage[i].value==""&&newsmessage[i].value!=""){
    		alert(newsmessage[i].value+"没有类别");
    		return false;
    	}
    }
    return list;
}
//提取有效的打分数据

function listToObj(list) {
	var obj={}
	var rex = /\D/g;
	for(var i=0;i<list.length;i++){
		if(rex.test(list[i].value)){
			alert(list[i].name+"的分值不是数字");
			return false;
		}
		obj[list[i].name]=list[i].value;
	}
	return obj;
}
//判断打分数据是否有效

//---------------------------------组长修改打分规则-----------------------------------------------					
grouphand_add.addEventListener('click',function(){  //提交更改好的一面打分规则
    var list = create_noempty();
    if(list==false){
    	return ;
    }
    var send = listToObj(list);
    if(send==false){
    	return ;
    }
	Ajax({
    url: "http://192.168.137.1:7070/releaserule", //请求地址
    type: 'post',   //请求方式
    data: send,
    async: false,   //是否异步
    success: function (responseText) {
		var obj=JSON.parse(responseText);
		if(obj.style==0)
			alert(obj.msg);
		else{
			alert(obj.msg);
		}
    },
    fail: function (err) {
        alert("通信错误"); 
    }
    }); 
},false);

//message={title:"111",context:"22233"}发布公告
var charge_tell=document.getElementById("charge_tell");
var telltitle=document.getElementsByClassName("telltitle")[0];
var tellgong=document.getElementsByClassName("tellgong")[0];
var tellbutton=document.getElementsByClassName("tellbutton")[0];

             telltitle.onfocus=function(){
                if(this.value=="公告主题")
                this.value="";
                this.style.color="black";
             }
             telltitle.onblur=function(){  
                if(this.value==""){
                this.value="公告主题";
                this.style.color="#999";
                }
            }

//---------------------------------组长发布公告---------------------------------------------------
           var tell=new Object();
			tellbutton.addEventListener('click',function(){        
			        tell.title=telltitle.value;
			        tell.context=tellgong.value;
			        //console.log(JSON.stringify(tell)); 
								Ajax({
							    url: "http://192.168.137.1:7070/releasenotice", //请求地址
							    type: 'post',   //请求方式
							    data: tell,
							    async: false,   //是否异步
							    success: function (responseText) {
									var obj=JSON.parse(responseText);
									//console.log(responseText);
									if(obj.style==0)
										alert(obj.msg);
									else{
										alert(obj.msg);
									}
							    },
							    fail: function (err) {
							        alert("请求打分规则,通信错误"); 
							    }
							    }); 
			       },false);
//---page-6-------------------------------------------------------------
 