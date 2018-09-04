//导航栏
 var li=document.getElementsByClassName("li");
    var lione=document.getElementsByClassName("lione");  // 动态实时的
        for(var i=0;i<li.length;i++){
          (function(j){
            li[j].onmouseover=function(){
              li[j].style.width="122px";
              lione[j].classList.add("lione1");
            }
          }(i))
        }

        for(var i=0;i<li.length;i++){
          (function(j){
            li[j].onmouseout=function(){
              li[j].style.width="52px";
              lione[j].classList.remove("lione1");
            }
          }(i))
        }  
//输入框         
         var input=document.getElementsByTagName('input')[0];
             input.onfocus=function(){
                if(this.value=="客官，请输入")
                this.value="";
                this.style.color="black";
             }
             input.onblur=function(){  
                if(this.value==""){
                this.value="客官，请输入";
                this.style.color="#999"
                }
             }

//音频
          var yinpin=document.getElementsByClassName("yinpin")[0];
          var mp=document.getElementsByClassName("mp")[0];
          mp.onmouseover=function(){
            yinpin.style.opacity=1;
          }
          mp.onmouseout=function(){
            yinpin.style.opacity=0;
          }

//节气
          var jieqi=document.getElementsByClassName("jieqi")[0];
          var jieqiname=document.getElementsByClassName("jieqiname")[0];
          var date=document.getElementsByClassName("date")[0];
          var jieqipic=document.getElementsByClassName("jieqipic")[0];
          var yangsheng=document.getElementsByClassName("yangsheng")[0];
          var suoxiao=document.getElementsByClassName("suoxiao")[0];
          var bottom=document.getElementsByClassName("bottom")[0];
          var kuai=document.getElementById("kuai");
          var jiade=document.getElementById("jiade");
          var jiqison=jieqi.children;
          var num;
          var p=1;
          jieqi.onmouseover=function(){
             bottom.style.bottom="-63px";
             console.log("df");
             jieqi.style.backgroundColor="rgba(12,13,13,.9)";
             jieqi.style.opacity=".6";
          }
           jieqi.onmouseout=function(){
            bottom.style.bottom="0px";
            jieqi.style.backgroundColor="rgba(12,13,13,0)";
            jieqi.style.opacity=".3";
          }
            for(var i=0;i<jiqison.length;i++){
              (function(j){
                 jiqison[j].onclick=function(){
                    num=j+1;
                    var script=document.createElement("script");
              script.src= "http://api.jisuapi.com/jieqi/detail?appkey=8093e927caca1880&jieqiid="+num+"&year=2018&callback=handleone";
              document.getElementsByTagName("head")[0].appendChild(script);
                    kuai.className="kuang1";
                    console.log(jiqison[j].style.width);
                    kuai.style.left=54.5*(j+1)+"px";
                    jiade.style.left=54.5*(j+1)+"px";
                    jiade.className="jia1";
                    kuai.className="kuang1";
                    setTimeout(function(){
                        jiade.className="jia";
                        kuai.style.left="680px";
                        jiade.style.left="603px";
                        kuai.className="kuang";

                      },550);
                 }
              }(i))
            }
            suoxiao.onclick=function(){
              kuai.className="kuang1";
              if(p==1){
                kuai.style.left="680px";
                p=2;
              }
            }
            function handleone(b){
              console.log(b);
                var jieqiname1=date1=jieqipic1=yangsheng1="";
                jieqiname1+=b.result.name;
                date1+=b.result.date;
                jieqipic1+=b.result.pic;
                yangsheng1+=b.result.yangsheng;
                jieqipic.src=jieqipic1;
                jieqiname.innerHTML=jieqiname1;
                date.innerHTML=date1;
                yangsheng.innerHTML=yangsheng1;
             }