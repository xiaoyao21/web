     	var close=document.getElementsByClassName('close')[0];
    	var button=document.getElementsByTagName('button')[0];
	 	var input=document.getElementsByTagName('input')[0];
	 	var last;
        var noul=document.getElementsByClassName('noul');  //无序列表 3
    	var mymiddle1=document.getElementsByClassName('my-middle-1')[0];
    	var mymiddle2=document.getElementsByClassName('my-middle2')[0];
    	var mymiddle=document.getElementsByClassName('my-middle');  //一组 3
    	var firstname=document.getElementsByClassName('firstname');  // 3
        var pic=document.getElementsByClassName('pic'); // 3
        var tag=document.getElementsByClassName('tag'); // 3
        var content=document.getElementsByClassName('content');  // 3
        var cookingtime=document.getElementsByClassName('cookingtime'); //3
    	var more=document.getElementsByClassName("more")[0];
        var moverun="";
        var m=2;
        var a=document.getElementsByClassName("a");
        for(var i=0;i<a.length;i++){

                (function(i){
                  a[i].onclick=function(){
                  input.value=a[i].textContent;
                  } 
                }(i))
        }
    	close.onclick=function(){  //点击关闭按钮
    		if(m%2==1){
              mymiddle1.style.opacity=0;
              mymiddle2.style.opacity=0; 
              setTimeout(
                function(){
                mymiddle1.style.display="none";
                mymiddle2.style.display="none"; 
              },1000);

              close.id="moverun";
              moverun=document.getElementById('moverun');
              m++;
          }
          else{
                mymiddle1.style.display="block";
                mymiddle2.style.display="block"; 
                mymiddle1.style.opacity=1;
                mymiddle2.style.opacity=1; 
              close.id="";
              m++;
          }
    	}
    	var k=1;  //全局控制变量
        var r=3;
        button.onclick=function(){
        	 k=1;  //点击搜索变为1
             last=input.value;
             var script=document.createElement("script");
             script.src= "http://api.jisuapi.com/recipe/search?keyword="+last+"&num=10&appkey=8093e927caca1880&callback=handle";
             document.getElementsByTagName("head")[0].appendChild(script);
             // if (input.value=="客官，请输入") {
             //    return;
             // }
             // close.style.display="block";
             // mymiddle1.style.display="block";
             // mymiddle2.style.display="block"; 
             // mymiddle1.style.opacity=1;
             // mymiddle2.style.opacity=1;
             // close.id="";
             // m++;
	 	} 

	 	document.onkeydown=function(e){  //对整个页面进行键盘监听
      var key=window.event?e.keyCode:e.which;   //考虑兼容性前IE
      if(key==13){
           k=1;  //点击搜索变为1
             last=input.value;
             var script=document.createElement("script");
             script.src= "http://api.jisuapi.com/recipe/search?keyword="+last+"&num=10&appkey=8093e927caca1880&callback=handle";
             document.getElementsByTagName("head")[0].appendChild(script);
             // function(){
             //     if (input.value=="客官，请输入") { 
             //    console.log(1111);
             //    return;
             //    }
             // }
            //  console.log(input.value,"3");
            //  close.style.display="block";
            // mymiddle1.style.display="block";
            // mymiddle2.style.display="block"; 
            // close.id="";
            // m++;
      }

    }
    	 	more.onclick=function(){ 
	 		 k=2;
	 		 r=r+3;
	 		 if(r>12){
            		 alert('客官，已显示全部~');
            		 return;
            	}
	 		 last=input.value;
             var script=document.createElement("script");
             script.src= "http://api.jisuapi.com/recipe/search?keyword="+last+"&num=10&appkey=8093e927caca1880&callback=handle";
             document.getElementsByTagName("head")[0].appendChild(script);
             if(r==12){
            		 alert('客官，已显示全部~');
            	}
    	}
    	
        function handle(a){  //回调函数参数就是获取的对象
            if(a.status==205){

                input.value="客官，请输入";
                alert('客官，没有该信息~')
                return ;
            }
        	if(k==1){
        		r=3;
        	}
         for(var i=(r-3);i<r;i++){   //请求三组数据
         	    var name1=cookingtime1=pic1=content1=tag1=noul1="";
                var nono=a.result.list[i].process;
            	for(var j in nono){
            		noul1+="<li>"+(parseInt(j)+1)+". "+nono[j].pcontent+"</li>";
            	}
            name1+=a.result.list[i].name;
            cookingtime1+=a.result.list[i].cookingtime;
            pic1+=a.result.list[i].pic;
            content1+=a.result.list[i].content;
            tag1+=a.result.list[i].tag;
            if (i%3==0) {
            noul[4].innerHTML=noul[1].innerHTML=noul1;
            firstname[4].innerHTML=firstname[1].innerHTML=name1;
            cookingtime[4].innerHTML=cookingtime[1].innerHTML=cookingtime1;
            pic[4].src=pic[1].src=pic1;
            pic[4].innerHTML=pic[1].innerHTML=pic1;
            content[4].innerHTML=content[1].innerHTML=content1;
            tag[4].innerHTML=tag[1].innerHTML=tag1;
            }
            else if(i%3==2){
            noul[3].innerHTML=noul[0].innerHTML=noul1;
            firstname[3].innerHTML=firstname[0].innerHTML=name1;
             cookingtime[3].innerHTML=cookingtime[0].innerHTML=cookingtime1;
            pic[3].src=pic[0].src=pic1;
            pic[3].innerHTML=pic[0].innerHTML=pic1;
            content[3].innerHTML=content[0].innerHTML=content1;
            tag[3].innerHTML=tag[0].innerHTML=tag1;
            }
            else if(i%3==1){
            noul[2].innerHTML=noul1;
            firstname[2].innerHTML=name1;
            cookingtime[2].innerHTML=cookingtime1;
            pic[2].src=pic1;
            pic[2].innerHTML=pic1;
            content[2].innerHTML=content1;
            tag[2].innerHTML=tag1;
        }
         }
             close.style.display="block";
             mymiddle1.style.display="block";
             mymiddle2.style.display="block"; 
             mymiddle1.style.opacity=1;
             mymiddle2.style.opacity=1;
             close.id="";
             m++;
             console.log("ok");
            
    }
