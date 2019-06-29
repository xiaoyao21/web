//window.onload = function(){
    var check = document.getElementById("checkimg");
    var eye = document.getElementById('Eye')
    var eyedisplay = document.getElementById('eyedisplay');
	var eyemi = document.getElementById('eyemi');
	var eyeming = document.getElementById('eyeming');
	var gx = document.getElementById('gxcheckimg');
	var wgx = document.getElementById('wgxcheckimg');
    var user = document.getElementById("user");
    var password = document.getElementById("pass");
    var submit = document.getElementById("BtnInput");
    var error = document.getElementById("error");
   
    check.onclick = function(){
       if(gx.style.display == "block"){
       	gx.style.display = "none";
       	wgx.style.display = "block"; 
       }
       else if(gx.style.display=="none"){
       	gx.style.display = "block";
       	wgx.style.display = "none";
       }
    }
    eye.onclick = function(){
		
		if(eyemi.style.display == "block"){
		pass.type = "text"
			eyemi.style.display = "none";
			eyeming.style.display = "block"; 
		}
		else if(eyemi.style.display=="none"){
			
				pass.type = "password"
			eyemi.style.display = "block";
			eyeming.style.display = "none";
		}

	
    }

    submit.onclick = function(){
        console.log(user.value);
        console.log(password.value);
        var tell = {
            "user":user.value,
            "password":password.value
        }
		
		if(tell.user == 'admin'&&tell.password =='123456')
			window.location.href="../html-fruit/index-2.html";
		else if(tell.user!='admin'){
				alert('用户名输入错误！')
		}
		else if(tell.password!='123456'){
			
			alert('密码输入错误！')
		}
// 		Ajax({
// 		    url:"http://192.168.3.20:8080/superman",
// 		    type:'post',
// 			data:tell,
// 		    async:true,
// 		    success:function(responseText){
// 		        var obj = JSON.parse(responseText);
// 		        console.log(obj);
// 				
// 		    },
// 		    fail:function(err){
// 		       console.log(err);
// 		    }
// 		});
		
        

    }
//}