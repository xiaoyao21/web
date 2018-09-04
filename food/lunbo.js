    	var myname=1;
    	var img=document.getElementsByClassName("my-middle");
    	var right=document.getElementsByClassName("right")[0];
    	var left=document.getElementsByClassName("left")[0];
    	var span=document.getElementsByClassName("spanon");
    	var buttonone=document.getElementsByClassName("buttonone")[0];
        var enen=1;
        function move(a){  //移动
             var time=10; 
             var spead=a/time;  //运动的速度
             var j=0;

             var time1=setInterval(function(){   //动画效果
             	    enen=2;
             	    j++;
                     //  if(parseInt(img[i].style.left)==0){
                     //    img[i].style.opacity=0;
                     //  }
                     // else if((parseInt(img[i].style.left)==-780)||(parseInt(img[i].style.left)==780)){
                     //     img[i].style.opacity=1;
                     // }
                     // else if()
                     for(var i=0;i<img.length;i++){
                        if(a==0||(parseInt(img[0].style.left)==0))
                          img[i].style.opacity=1;
                     }
                      if(parseInt(img[0].style.left)==0){
                       img[3].style.opacity=1;
                       if(a>0)
                       img[2].style.opacity=1;
                       else
                       img[4].style.opacity=1;
                     }
                     else if(parseInt(img[1].style.left)==0){
                      if(a>0)
                       img[0].style.opacity=1;
                      else
                       img[2].style.opacity=1;
                     }
                     else if(parseInt(img[2].style.left)==0){
                      if(a>0)
                       img[1].style.opacity=1;
                      else
                       img[3].style.opacity=1;
                     }
                     else if(parseInt(img[3].style.left)==0){
                      if(a>0)
                       img[2].style.opacity=1;
                      else
                       img[4].style.opacity=1;
                     }
                     if(parseInt(img[4].style.left)==0){
                       img[1].style.opacity=1;
                       if(a<0)
                       img[2].style.opacity=1;
                       else
                       img[0].style.opacity=1;
                     }
                   for(var i=0;i<img.length;i++){
                      img[i].style.left=parseInt(img[i].style.left)+spead+"px";
                    } 
                 if(j==time){
                 	clearInterval(time1);
                 	enen=1;
                 }
             },32) 

             for(var i=0;i<img.length;i++){   //清空透明度  
                     if((parseInt(img[i].style.left)!=0)){
                         img[i].style.opacity=0;
                     }
           }
            var i=img.length-1;  //最后一个
            if (parseInt(img[i].style.left)>=3120) {
                img[3].style.opacity=1;
            	for(var i=0;i<img.length;i++){
               img[i].style.left=parseInt(img[i].style.left)-2340+"px";
              } 
            }

            else if(parseInt(img[i].style.left)<=0) {
              img[1].style.opacity=1;
            	for(var i=0;i<img.length;i++){
               img[i].style.left=parseInt(img[i].style.left)+2340+"px";
              }
            }

            for(var s=0;s<img.length;s++){
            if(parseInt(img[s].style.left)==250){
            	img[s].style.display="block";
            }
          }
        }

        
        
      for(var i=0;i<span.length;i++){
	  	span[i].onclick=function(){
        if(this.className=="on")  //点击同一个按钮 不动
          return;
           var my=parseInt(this.getAttribute("name"));//获取自定义属性
           var move1=-780*(my-myname);
           myname=my;
           liang();
           move(move1);
	  	}
	  }
      //选取小圆点
    function liang(){
    	for(var i=0;i<span.length;i++){
    		if(span[i].id=="on"){
    			span[i].id=""
    			break;
    		}
    	}
    	if(myname==0)
    		myname=3;
    	if(myname==4)
    		myname=1;
    	span[myname-1].id='on';
    }
        right.onclick=function(){   //-780
        	if(enen==2)
        		return;
        	myname+=1;
        	liang();
            move(-780);
        }
        left.onclick=function(){    //+780
        	if(enen==2)
        		return;
        	myname-=1;
        	liang();
        	move(780);
        }
