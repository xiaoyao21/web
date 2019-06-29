
var all_obj;  //记录当前请求的订单统计
let num=1;  //当前的页数
let rows=7;  //定义每页的数量
let now_time;


var myDate = new Date();
now_time=myDate.toLocaleDateString(); 

var but_all=document.getElementsByClassName("but_all")[0].children;
var all_class=document.getElementsByClassName("all_class")[0];

but_all[0].addEventListener('click',function(){but_left(a=2)},false)
but_all[6].addEventListener('click',function(){but_left(a=1)},false)

function json_p(num){
	var script=document.createElement("script");
	script.src= "http://120.79.141.139/MTmarket/orderApi/bought/"+num+"/"+rows+"?callback=handle";
	document.getElementsByTagName("head")[0].appendChild(script);
	
}

function handle(e){
		all_obj=e;	
		console.log(all_obj);
		var rows_obj=all_obj.rows;
		all_class.innerHTML="";
		for(let j=0;j<rows_obj.length;j++)
		{
			all_class.innerHTML+=`
			<div class="vag">
				<div class="vag_pic"><img src=${rows_obj[j].images}/></div>
				<p class="vag_name">${rows_obj[j].goodsName}</p>
				<p class="vag_time">${now_time}</p>
				<div class="vag_num">x${rows_obj[j].nums}</div>
			</div>`
		}
	for(let j=0;j<7;j++)
	{
		but_all[j].style.backgroundColor="white";
		but_all[j].style.color="black";
	}
	console.log(num);
	if(num%5==0)
	{
		but_all[5].style.backgroundColor="#1DBA08";
		but_all[5].style.color="white";
	}	
	else
	{
		but_all[num%5].style.backgroundColor="#1DBA08";
		but_all[num%5].style.color="white";
	}
}

json_p(1);  //页面其实刷新

function but_left(){
	console.log(all_obj.total);
	if(a==1)  //right
	{
		
			if(num%5==0&&(parseInt(but_all[5].innerHTML)*rows<all_obj.total))
			{
				for(let i=1;i<=5;i++)
				{
					but_all[i].innerHTML=parseInt(but_all[i].innerHTML)+5;		
				}
				num=parseInt(num)+1;
				json_p(num);
			}
			
			else if(but_all[5].innerHTML<=all_obj.total&&num*rows<all_obj.total)
			{
				num=parseInt(num)+1;
				json_p(num);
			}
	}
	else{  //left
		
			if(num%5==1&&(but_all[1].innerHTML>1))
			{
				for(let i=1;i<=5;i++)
				{
					but_all[i].innerHTML=parseInt(but_all[i].innerHTML)-5;
				}
				num=parseInt(num)-1;
				json_p(num);
			}
			
			else if(but_all[1].innerHTML>=1&&num>1)
			{
				num=parseInt(num)-1;
				json_p(num);
			}
		}
	
}

for(let i=1;i<=5;i++)
{
		but_all[i].addEventListener('click',function(){
			
			json_p(num=this.innerHTML);
 		},false)
}


