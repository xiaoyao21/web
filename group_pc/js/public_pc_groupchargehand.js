//------------------------------查看当前面试进度-----------------------------------------
 //state0:未开始   1：1面   2：二面   3：3面     4：面试结束
var statenow;   //当前的面试状态
var dafen;    //当前状态的打分规则
var jsonarr;  //当前状态的打分规则转数组
var chargehand;  

//----------------------------------请求面试状态---------------------------------------------
function statemian(){  
 Ajax({
				    url: "http://192.168.137.1:7070/searchState", //请求地址
				    type: 'get',   //请求方式
				    data: null,
				    async: false,   //是否异步
				    success: function (responseText) {
				    	
						var obj=JSON.parse(responseText);
						if(obj.style==0){
							alert(obj.msg)
						}else{
							statenow=obj.state;

						}
				    },
				    fail: function (err) {
				        alert("通信错误"); 
				    }
				}); 
	var interviewstate=document.getElementsByClassName("interviewstate");

		interviewstate[statenow].style.backgroundColor="#00bfa3"
		interviewstate[statenow].style.color="white"
}
//---page-1-------------------------------------------------------------
var rollroll={};   //存储队列 组长的筛选
var choose_all=document.getElementsByClassName("choose-1");
var zunei=document.getElementsByClassName("zunei")[0];
var quanti=document.getElementsByClassName("zunei")[0];
var telltitle_=document.getElementsByClassName("telltitle_");
var tellcontent=document.getElementsByClassName("tellcontent");
//---page-1-----------------------请求全部公告内容--------------------------------------
function tellallcontent(){
Ajax({
				    url: "http://192.168.137.1:7070/shownotice", //请求地址
				    type: 'get',   //请求方式
				    data: null,
				    async: false,   //是否异步
				    success: function (responseText) {
						var obj=JSON.parse(responseText);
						if(obj.style==0){
							alert(obj.msg)
						}else{
							//var gonggao=obj.group;
							var gonggroup=JSON.parse(obj.group);
							var gongmain=JSON.parse(obj.main);
							telltitle_[0].innerHTML=gonggroup.title;
							telltitle_[1].innerHTML=gongmain.title;

							tellcontent[0].innerHTML=gonggroup.context;
							tellcontent[1].innerHTML=gongmain.context;
						}
				    },
				    fail: function (err) {
				        alert("通信错误"); 
				    }
				});

}

var request=document.getElementsByClassName("request")[0];

request.addEventListener('click',function(){
			tellallcontent();
			       },false);
choose_all[0].addEventListener('click',function(){
			tellallcontent();
			statemian();
			       },false);
//---page-2-------------------------------------------------------------
var applaydata;
var sect_face=document.getElementById("sect_face");
var face_=document.getElementsByClassName("face_");
var messxuehao=document.getElementsByClassName("messxuehao");
var messname=document.getElementsByClassName("messname");
var messsex=document.getElementsByClassName("messsex");
var messall=document.getElementsByClassName("messall");
var messphone=document.getElementsByClassName("messphone");

var messstate=document.getElementsByClassName("messstate");
var yeshu=document.getElementsByClassName("yeshu")[0];
var requrie_new=document.getElementById("requrie_new");

//---------------------------------------请求报名数据-------------------------------------------------
function qingqing(){
	            Ajax({
				    url: "http://192.168.137.1:7070/viewgroupreg", //请求地址
				    type: 'get',   //请求方式
				    data: null,
				    async: false,   //是否异步
				    success: function (responseText) {
						var obj=JSON.parse(responseText);
						if(obj.style==0){
							alert(obj.msg)
						}else{
							applaydata=obj.selfInfo;
						}
				    },
				    fail: function (err) {
				        alert("通信错误"); 
				    }
				}); 
	var apply=applaydata.filter(item => item.pass==sect_face.value);  //筛选
	yeshu.innerHTML="";
	var xiaokuai;
	for(var i=1;i<=(apply.length/15)+1;i++)
	{
	var dian=document.createTextNode(i);   //创建文本节点
    xiaokuai=document.createElement('li');   //创建元素节点
    xiaokuai.setAttribute('state',i); //给标签设置属性
    xiaokuai.setAttribute('class',"zhuanye"); //给标签设置属性
    xiaokuai.appendChild(dian);  //
    yeshu.appendChild(xiaokuai);  // 
	}
	if(apply.length>=15)
		var longlong=15;
	else longlong=apply.length;
	for(var i=0;i<longlong;i++) 
		{
			messxuehao[i].innerHTML=apply[i].xuehao;
			messname[i].innerHTML=apply[i].name;
			messsex[i].innerHTML=apply[i].xingbie;
			messall[i].innerHTML=apply[i].xueyuan+" / "+apply[i].zhuanye+" / "+apply[i].banji;
		    messphone[i].innerHTML=apply[i].phoneNum;
			if(apply[i].style==0)//<p class="student-state" style="color:;">面试中</p>
			messstate[i].innerHTML='<p class="student-state" style="background-color:#7b5cac;">面试中</p>';
			else if(apply[i].style==1)
			messstate[i].innerHTML='<p class="student-state" style="background-color:#ff9103;">打分中</p>';
			else if(apply[i].style==2)
		 	messstate[i].innerHTML='<p class="student-state" style="background-color:#00d037;">已通过</p>';
		    else if(apply[i].style==3)
			messstate[i].innerHTML='<p class="student-state" style="background-color:#f70004;">未通过</p>'; 
		}
		for(var i=longlong;i<15;i++) 
		{
			messxuehao[i].innerHTML=messname[i].innerHTML=messsex[i].innerHTML=messall[i].innerHTML=messphone[i].innerHTML=messstate[i].innerHTML=""
		}
    
    var zhuanye=document.getElementsByClassName("zhuanye");  //获取下标元素
    zhuanye[0].style.backgroundColor="#004b9f";
    zhuanye[0].style.opacity=.9;

	for(var r=0;r<(apply.length/15);r++)   //详细 绑定所有的事件
	{
		(function(r){
			zhuanye[r].addEventListener('click',function(){
			         //console.log("1");
			        zhuanye[r].style.backgroundColor="#004b9f"; //改变选项的颜色
    				zhuanye[r].style.opacity=.9;
    				for(var j=0;j<(apply.length/15);j++)
    				{
    					if(j!=r)
    					{
    						zhuanye[j].style.backgroundColor="grey";
    				        zhuanye[j].style.opacity=.7;
    					}
    				}

			         if(apply.length>=(r+1)*15)   //18 15
			        	var longlong=15;
			         else longlong=apply.length-r*15   //3
			        for(var i=0;i<longlong;i++) //15 16 17
					{
						//console.log(i,"00",longlong+r*15);
						messxuehao[i].innerHTML=apply[i+r*15].xuehao;
						messname[i].innerHTML=apply[i+r*15].name;
						messsex[i].innerHTML=apply[i+r*15].xingbie;
						messall[i].innerHTML=apply[i+r*15].xueyuan+" / "+apply[i+r*15].zhuanye+" / "+apply[i+r*15].banji;
					    messphone[i].innerHTML=apply[i+r*15].phoneNum;
						if(apply[i+r*15].style==0)//<p class="student-state" style="color:;">面试中</p>
						messstate[i].innerHTML='<p class="student-state" style="background-color:#7b5cac;">面试中</p>';
						else if(apply[i+r*15].style==1)
						messstate[i].innerHTML='<p class="student-state" style="background-color:#ff9103;">打分中</p>';
						else if(apply[i+r*15].style==2)
					 	messstate[i].innerHTML='<p class="student-state" style="background-color:#00d037;">已通过</p>';
					    else if(apply[i+r*15].style==3)
						messstate[i].innerHTML='<p class="student-state" style="background-color:#f70004;">未通过</p>'; 
					}
					for(var i=longlong;i<15;i++) 
					{
						messxuehao[i].innerHTML=messname[i].innerHTML=messsex[i].innerHTML=messall[i].innerHTML=messphone[i].innerHTML=messstate[i].innerHTML=""
					}
			       },false);
		}(r));      
	}	
}


sect_face.addEventListener('click',function(){
			qingqing();
			       },false);

requrie_new.addEventListener('click',function(){
			qingqing();
			       },false);

choose_all[1].addEventListener('click',function(){
			qingqing();
			       },false);
//---page-3-------------------------------------------------------------	
	var student_more=document.getElementsByClassName('student-more');
	var student_sore_block=document.getElementById('student_sore_block');
	var more_colse=document.getElementsByClassName('more_colse')[0];
	var student_face_li=document.getElementsByClassName('student_face_li');
	var student_face=document.getElementsByClassName('student_face');
	var studentfen=document.getElementsByClassName('studentfen');
	var studentda=document.getElementsByClassName('studentda');
	var studentjian=document.getElementsByClassName('studentjian');
	var studentji=document.getElementsByClassName('studentji');
	var studentren=document.getElementsByClassName('studentren');
	var studenttime=document.getElementsByClassName('studenttime');
	var onemore=document.getElementsByClassName('onemore');
	var onemore1=document.getElementsByClassName('onemore1')[0];

//--------------------------请求一个学生的所有面试信息----------------------------------------
// for(var i=0;i<student_more.length;i++)   //详细 绑定所有的事件
// 	{
// 		(function(i){
// 			student_more[i].addEventListener('click',function(){
			        
// 			       },false);
// 		}(i));      
// 	}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
//var dafen='{"C语言":50,"沟通能力":10}'  //获取一面打分准则 {"C语言":50,"沟通能力":10}!!!!!!!!!
//var defenarr=Object.values(JSON.parse(dafen)) //[50,10];!!!!!!!!!!!
	for(var i=0;i<15;i++)   //详细 绑定所有的事件
	{
		(function(i){
			student_more[i].addEventListener('click',function(){
			         student_sore_block.style.display="block";
			         student_sore_block.style.display="block";
			         var name=this.getAttribute("name");
			         var obj1={"xuehao":parseInt(name)};
			         console.log(obj1,"wancheng");
			     Ajax({
				    url: "http://192.168.137.1:7070/rankdetails", //请求地址
				    type: 'get',   //请求方式
				    data: obj1,
				    async: false,   //是否异步
				    success: function (responseText) {
				    	var obj=JSON.parse(responseText);
						if(obj.style==0){
							alert(obj.msg)
						}else{
							var studentall=obj.scoreInfo;
							studentmassage(studentall);
						}
				    },
				    fail: function (err) {
				        alert("通信错误"); 
				    }
				});
			       },false);
		}(i));      
	}


function studentmassage(){   //请求一个学生的详细信息

			       s=0;
			       for(var i=0;i<4;i++)
			       {
			       	onemore[i].style.display="none";
			       }
			       for(var i=0;i<studentall.length;i++)
			       {
			       		if(studentall[i].type==1)
			       		{
			       			var tiqu=(Object.values(JSON.parse(studentall[i].obj)));
			       			var score=0;
			       			console.log(defenarr,tiqu)
			       			for(var j=0;j<tiqu.length;j++)
			       			{
			       				score+=tiqu[j]*defenarr[j];
			       			}

							studentfen[i-s].innerHTML=score;
							studentda[i-s].innerHTML=studentall[i].obj;
							studentjian[i-s].innerHTML=studentall[i].advice;
							//studentji[i-s].innerHTML=studentall[i].history;
							studentren[i-s].innerHTML="("+studentall[i].person+")";
							studenttime[i-s].innerHTML=studentall[i].time;
							onemore[i-s].style.display="block";
			       		}
			       		else {
			       			var tiqu=(Object.values(JSON.parse(studentall[i].obj)));
			       			var score=0;
			       			console.log(defenarr,tiqu)
			       			for(var j=0;j<tiqu.length;j++)
			       			{
			       				score+=tiqu[j]*defenarr[j];
			       			}
			       			s=1;
							studentfen[4].innerHTML=score;
							studentda[4].innerHTML=studentall[i].obj;
							studentren[4].innerHTML=="("+studentall[i].person+")";
							studenttime[4].innerHTML=studentall[i].time;
			       		}
			       }
}


	more_colse.addEventListener('click',function(){
		 student_sore_block.style.display="none";
	})

	
	for(var i=0;i<2;i++)   //切换几面的详细信息
	{
		(function(i){
			student_face_li[i].addEventListener('click',function(){
			         
			         student_face[i].style.opacity="1";
			         student_face_li[i].style.backgroundColor="rgb(0, 183, 169)";
			         for(var j=0;j<2;j++)
				     {
						if(j!=i)
						{
						 student_face[j].style.opacity="0";
						 student_face_li[i].style.backgroundColor="#32443c";
						}
				     }
			       },false);
		}(i));      
	}

//------------------------------------请求当前面试的打分规则----------------------------------------
function mianshi(){   //返回当前面试的打分规则
	//请求面试状态
	//请求当前状态的打分规则
	statemian();
	if(statenow==1||statenow==2)
	{
	Ajax({
		    url: "http://192.168.137.1:7070/searchrule", //请求地址
		    type: 'get',   //请求方式
		    data: {"number":statenow},
		    async: false,   //是否异步
		    success: function (responseText) {
				var obj=JSON.parse(responseText);
				if(obj.style==0)
					alert(obj.msg);
				else{

					dafen=obj.rules;
				}
		    },
		    fail: function (err) {
		        alert("通信错误"); 
		    }
		});
    }
    console.log(dafen,"2323");
}
mianshi();
//-------------------------------------------------------------------
//!!!!!!!!!!!!!!!!!!!!!!!!!
//---page-4-------------------------------------------------------------
var input=document.getElementById('find');   //输入框
         input.onfocus=function(){
            if(this.value=="请输入学号")
            this.value="";
            this.style.color="black";
         }
         input.onblur=function(){  
            if(this.value==""){
            this.value="请输入学号";
            this.style.color="#999"
            }
         }
    //关闭的提示框
var page4_star=document.getElementsByClassName("page4_star")[0];
var page_4_left=document.getElementsByClassName("page_4_left")[0];
var page4_tell=document.getElementsByClassName("page4_tell")[0];
var page4_all=document.getElementsByClassName("page4_all")[0];
var yimian=document.getElementsByClassName("yimian")[0];
var ermian=document.getElementsByClassName("ermian")[0];
var page_4_add=document.getElementsByClassName("page_4_add")[0];
var wenbenkuang=document.getElementsByClassName("wenbenkuang");
var page4_=document.getElementsByClassName("page4_");

//--------------------------------------------查询打分规则----------------------------------------

page4_star.addEventListener('mouseover',function(){
		      page4_tell.style.display="block"   
		       },false);
page4_star.addEventListener('mouseout',function(){
		      page4_tell.style.display="none"   
		       },false);
page4_star.addEventListener('click',function(){
		      page4_all.style.display="none"   
		       },false);


//------------------------------------请求二面上次打分面试时间-------------------------------------------
function dafentime(){
	var objobj;
	Ajax({
    url: "http://192.168.137.1:7070/findSecond", //请求地址
    type: 'get',   //请求方式
    data: {xuehao:input.value},
    async: false,   //是否异步
    success: function (responseText) {
		var obj=JSON.parse(responseText);
		if(obj.style==0){	
			objobj=obj.msg;
			//alert(obj.msg)
		}else{
			objobj=obj.lastTime;
		}
    },
    fail: function (err) {
    alert("通信错误"); 
    }
    });
    return(objobj); 
}

function dafenmessage(){

jsonarr = Object.keys(JSON.parse(dafen)); 
console.log(jsonarr);
	r=statenow-1;  //请求几面  接口！！！！！！！！！！！！！
    page4_[r].style.backgroundColor="#00b7a9";
    page_4_left.innerHTML="";

    if(r==0)
    {
     	yimian.style.display="block";
     	ermian.style.display="none";
    }
    else {
     	yimian.style.display="none";
     	ermian.style.display="block";		
     	var lasttime=document.getElementsByClassName("lasttime")[0];
     	var obj=dafentime();	
     	lasttime.innerHTML=obj;      	
    }
    for(var i=0;i<jsonarr.length;i++)
        {
        var dian=document.createTextNode(jsonarr[i]);   //创建文本节点
	    var chuang=document.createElement('p');   //创建元素节点
	    chuang.setAttribute('class',"daqing"); //给标签设置属性

	    chuang.appendChild(dian);  //
	    page_4_left.appendChild(chuang);  // 
		var chuang1=document.createElement('input');   //创建元素节点
		chuang1.setAttribute('value',""); //给标签设置属性
	    chuang1.setAttribute('class',"daqing1"); //给标签设置属性
	    chuang1.onkeyup=function(){chuang1.value=chuang1.value.replace(/[^\d]/g,'')};
	    chuang1.maxlength="3"
	    page_4_left.appendChild(chuang1);  // 
        }	      
     for(var j=0;j<2;j++)
     {
		if(j!=r)
		{
		 page4_[j].style.backgroundColor="black";
		}
	}
}

//一面打分
function onerank(){
	Ajax({
    url: "http://192.168.137.1:7070/firstmark", //请求地址
    type: 'post',   //请求方式
    data: chargehand,
    async: false,   //是否异步
    success: function (responseText) {
		var obj=JSON.parse(responseText);
		if(obj.style==0){
			alert(obj.msg,"one")
		}else{
			alert(obj.msg,"oneone");
		}
    },
    fail: function (err) {
    alert("通信错误"); 
    }
    }); 
}

//二面打分
function tworank(){
	Ajax({
    url: "http://192.168.137.1:7070/secondmark", //请求地址
    type: 'post',   //请求方式
    data: chargehand,
    async: false,   //是否异步
    success: function (responseText) {
		var obj=JSON.parse(responseText);
		if(obj.style==0){
			alert(obj.msg,"two")
		}else{
			alert(obj.msg,"twotwo");
		}
    },
    fail: function (err) {
    alert("通信错误"); 
    }
    }); 
}


page_4_add.addEventListener('click',function(){ 
		var daqing=document.getElementsByClassName("daqing");
		var daqing1=document.getElementsByClassName("daqing1");
		console.log(daqing1,daqing1.value,"222222");
        
       for(var i=0;i<2;i++)
       {
       		if(page4_[i].style.backgroundColor!="black")
       			break;
       }
       if(i==0)  //一面接口
       {
       	var content=new Object();
       	for(var j=0;j<jsonarr.length;j++)
       	{
       		content[jsonarr[j]]=daqing1[j].value
       	}
       	var chargehand_=new Object();
       	chargehand_.obj=content;
       	chargehand_.xuehao=parseInt(input.value);
       	chargehand_.advince=wenbenkuang[0].value;
       	chargehand_.history=wenbenkuang[1].value;
       	chargehand_.present=statenow;
       	chargehand=chargehand_;
       	console.log(content);
       	chargehand.obj = JSON.stringify(chargehand.obj);
       	console.log(chargehand);
       	onerank()
       wenbenkuang[0].innerHTML="";
       wenbenkuang[1].innerHTML="";
       }else{   //二面接口
       	var content=new Object();
       	for(var j=0;j<jsonarr.length;j++)
       	{
       		content[jsonarr[j]]=daqing1[j].value
       	}
       	var chargehand_=new Object();
       	chargehand_.obj=content;
       	chargehand_.xuehao=parseInt(input.value);
       	chargehand_.history=wenbenkuang[2].value;
       	chargehand_.present=statenow;
       	chargehand=chargehand_;
       	console.log(content);
       	chargehand.obj = JSON.stringify(chargehand.obj);
       	console.log(chargehand);
       	tworank()
       	wenbenkuang[2].innerHTML="";
       }
},false);

//---------------------------输入学号查看个人信息,查看当前学生是否存在------------------------------------
function stuxinxi(obj){
	var r=1;
	Ajax({
    url: "http://192.168.137.1:7070/searchinfobynum", //请求地址
    type: 'get',   //请求方式
    data: obj,
    async: false,   //是否异步
    success: function (responseText) {
		var obj=JSON.parse(responseText);
		if(obj.style==0)
		{
			r=0;
			alert(obj.msg);
		}
		else{
			var a=obj.info;
			var xinxi=document.getElementsByClassName("xinxi")[0];
			xinxi.innerHTML=a.name+'--'+a.xingbie+'--('+a.xueyuan+"/"+a.zhuanye+"/"+a.banji+")"
			r=1
		}
    },
    fail: function (err) {
        alert("通信错误"); 
    }
    }); 
    return r;
}

function inputstu(){ 
    if(input.value.length!=8){
        alert("学号格式只能为8为数字呦~~( •̀ ω •́ )y~~") 
        return ;
   }
   else {
   	var obj={xuehao:parseInt(input.value)};
   	if(stuxinxi(obj)==0)
   	{
        return ;
   	}
   	else {
   		dafenmessage();
		page4_all.style.display="block";
   	}
   }
}

document.onkeydown=function(event){
             var e = event || window.event || arguments.callee.caller.arguments[0];    
              if(e && e.keyCode==13){ // enter 键
                 inputstu()
             }
         }; 

var dasou=document.getElementsByClassName("dasou")[0];
dasou.addEventListener('click',inputstu,false);


