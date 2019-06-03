var script=document.createElement("script");
script.src= "http://120.79.141.139/MTmarket/orderApi/bought/1/2?callback=handle";
document.getElementsByTagName("head")[0].appendChild(script);
function handle(e){
	console.log(e);
}
//handle();