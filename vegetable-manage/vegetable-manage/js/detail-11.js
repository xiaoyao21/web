function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

var a = GetRequest();
var index_1 = a['index']; //该页点击的序号
var curpage_1 = a['curpage']; //第几页

var people_obj; //渲染左边的订单信息
var food_obj; //渲染右边的食物信息
var status_l; //记录当前订单状态
var count;  //记录蔬菜/水果订单的总数
var number; //激励第一次提示是否发货按钮

Ajax({
	url: "http://120.79.141.139/MTmarket/orderApi/1/" + curpage_1 + "/3", //请求地址
	type: 'get', //请求方式
	async: true, //是否异步
	success: function(responseText) {
		var obj = JSON.parse(responseText);
		console.log(obj);
		food_obj = obj.rows[index_1 - 1].orderDetails;
		people_obj = obj.rows[index_1 - 1];
		pac_time.innerHTML = people_obj.orderDate;
		// 			console.log(food_obj,'111')
		// 			console.log(people_obj,'222')
		people();
		food();
	},
	fail: function(err) {
		alert("通信错误");
	}
});

var right_ = document.getElementsByClassName("right_");
var newnew = document.getElementsByClassName("newnew")[0];
var pac_time = document.getElementById("pac_time");

function people() {
	console.log(people_obj)
	var arr1 = jiequ(people_obj.orderAddress)
	right_[0].innerHTML = arr1[0];
	right_[1].innerHTML = people_obj.user.userName;
	right_[2].innerHTML = people_obj.orderPhone;
	right_[3].innerHTML = "下午 5:00-7:00";
	right_[4].innerHTML = people_obj.orderId;
}

function count_number() {
	count = 0;
	for (let i = 0; i < food_obj.length; i++) {
		//if (food_obj[i].goods.goodsType == 1) {
			count++;
		//}
	}
}

var string_obj; //获取最终创建好的内容
function food() {
	count_number();
	
	newnew.innerHTML = ""
	string_obj = "";
	number=0;
	for (let i = 0; i < food_obj.length; i++) {
		switch (people_obj.orderState) {
			case 1:
				status_l = '待付款';
				break;
			case 2:
				status_l = '待发货';
				break;
			case 3:
				status_l = '待收货';
				break;
			case 4:
				status_l = '待评价';
				break;
			case 5:
				status_l = '已完成';
				break;
		}
		var arr = fenge(food_obj[i].goods.goodsImg)
		//var count=0
		//if (food_obj[i].goods.goodsType == 1) { //判断是蔬菜还是水果
		number++;
			if (number!=1) {
				string_obj +=
					`
			<tr>
				<td class="dingdan">
					<div class="iborder">
					<center><img src="${arr[0]}" width="65px" height="65px" class="viamge"></center>
					</div>
					<p class="vname">${food_obj[i].goods.goodsName}</p>
				</td>
				<td class="shuliang">
					x${food_obj[i].detailNum}
				</td>
			</tr>`
			} else if (status_l == '待发货') {
				string_obj +=
					`
				<tr>
					<td class="dingdan">
						<div class="iborder">
						<center><img src="${arr[0]}" width="65px" height="65px" class="viamge"></center>
						</div>
						<p class="vname">${food_obj[i].goods.goodsName}</p>
					</td>
					<td class="shuliang">
						x${food_obj[i].detailNum}
					</td><td class="zhuangtai" rowspan="${count}">
					<center><p class="Status">${status_l}</p><button class="status">发货</button></center>
					</td>
				</tr>
				`
			} else {
				//console.log("jinlaile")
				string_obj +=
					`
				<tr>
					<td class="dingdan">
						<div class="iborder">
						<center><img src="${arr[0]}" width="65px" height="65px" class="viamge"></center>
						</div>
						<p class="vname">${food_obj[i].goods.goodsName}</p>
					</td>
					<td class="shuliang">
						x${food_obj[i].detailNum}
					</td><td class="zhuangtai" rowspan="${count}">
					<center><p class="Status">${status_l}</p>
					</td>
				</tr>
				`
			}
		//}
	}
	newnew.innerHTML = string_obj;
}

function fenge(str) {
	let arr = [];
	arr = str.split(",");
	return arr;
}

function jiequ(str) {
	let arr = [];
	arr = str.split("/");
	return arr;
}
