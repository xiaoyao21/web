//window.onload = function(){
let left = document.getElementById('_Left');
let right = document.getElementById('_Right');
let li_List = document.getElementsByClassName("jump");
let order = null; //从后台获取到的订单数量
let page = null; //最大页码
var detail_obj = {};
var curpage = 1; //当前页码
let change = document.getElementById('cccchange');
var middle_con = document.getElementById('middle');
var allselect = document.getElementsByClassName('choose')[0];
var flag = 0;
var big_num = document.getElementsByClassName('big_num')[0];
var ids = [];
var batch_change = [];


//刚进入页面时获取第一页的订单
var middle_con = document.getElementById('middle');
middle_con.innerHTML = '';


var xhr = null;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			var jsonString = xhr.responseText;
			var json2 = JSON.parse(jsonString);
			detail_obj = json2;
			document.getElementsByTagName("head")[0].innerHTML += '<script src = "../js/detail.js"></script>'

			var tianchong = '';
			var dingdan = '';
			// console.log(json2);
			order = json2.total; //总订单数
			// console.log(order,"orderahhhhhhhh")
			page = Math.ceil(order / 3); //页码数

			// 设计页面页数
			const slp = new SimplePagination(page)
			slp.init({
				container: '.box',
				maxShowBtnCount: 3,
				onPageChange: state => {
					console.log('pagination change:', state.pageNumber)
				}
			})

			for (let i = 0; i < json2.rows.length; i++) { //3

				var state = '';
				// 每个订单的状态
				switch (json2.rows[i].orderState) {
					case 1:
						state = '待付款';
						break;
					case 2:
						state = '待发货';
						break;
					case 3:
						state = '待收货';
						break;
					case 4:
						state = '待评价';
						break;
					case 5:
						state = '待评价';
						break;
				}

				tianchong +=
					`
          <div class = "block">
          <div class="block_top">
                      <div class="pac_kuang"></div>
                      <div class="pac_time">${json2.rows[i].orderDate}</div>
                      <div class="pac_dan">订单号</div>
                      <div class="pac_hao">${json2.rows[i].orderId}</div>
                      <div class="pac_more" index = ${i+1}>订单详细>></div>
          </div>
          <div class="block_con">
          <table>`
				var arr = fenge(json2.rows[i].orderDetails[0].goods.goodsImg)
				var arr1 = fenge1(json2.rows[i].orderAddress)

				dingdan = dingdan +
					`
                <tr>
                <td class="dingdan">
                    <div class="iborder">
                    <center><img src="${arr[0]}" width="65px" height="65px" class="viamge"></center>
                    </div>
                    <p class="vname">${json2.rows[i].orderDetails[0].goods.goodsName}</p>
                </td>
                <td class="shuliang">
                    x${json2.rows[i].orderDetails[0].detailNum}
                </td>
                
                <td class="kuaidi" rowspan=${json2.rows[i].orderDetails.length}	>
                     ${arr1[1]}
                </td>
                <td class="zhuangtai" rowspan=${json2.rows[i].orderDetails.length}>
                    <center><p class="Status">${state}</p>
                    <button class="status" id = "Status" >发货</button></center>
                </td>
                </tr>
                `
				for (var j = 1; j < json2.rows[i].orderDetails.length; j++) {
					 var arr =  fenge(json2.rows[i].orderDetails[j].goods.goodsImg)
					var dingdan = dingdan +
						`
                <tr>
                <td class="dingdan">
                    <div class="iborder">
                    <center><img src="${arr[0]}" width="65px" height="65px" class="viamge"></center>
                    </div>
                    <p class="vname">${json2.rows[i].orderDetails[j].goods.goodsName}</p>
                </td>
                <td class="shuliang">
                    x${json2.rows[i].orderDetails[j].detailNum}
                </td>
                </tr>
                `
				}
				tianchong = tianchong + dingdan;
				tianchong = tianchong + `
               </table>
             </div>
            </div>
            `
				middle_con.innerHTML = tianchong;
				dingdan = ''
			}

			//---------------------------------发货按钮的显示与否    
			var d = document.getElementsByClassName('zhuangtai')
			for (var t = 0; t < d.length; t++) {
				var btnstate = d[t].children[0].children[0].innerHTML;
				switch (btnstate) {
					case "待发货":
						d[t].children[0].children[1].style.visibility = "visible"
						// console.log(d[i].children[0].children[1])
						d[t].children[0].children[1].onclick = function(e) {
							// 不能引用d[i].children[0].children[1]
							console.log(e)
							// e.path[0].style.display = "none"
							e.path[0].style.visibility = "visible"
							e.path[1].innerHTML = `<p class="Status">待收货</p>`
							// console.log(e.path[7])
							ids.push(e.path[7].children[0].children[3].innerHTML)
							console.log(ids, '单个的订单号');
							ids = JSON.stringify(ids)
							console.log(ids, 'IDS')
							//----------ajax发送要改变的数据给后台
							var xhr = null;
							// xhr.setRequestHeader("Content-Type",
							// "application/json; charset=utf-8");
							if (window.XMLHttpRequest) {
								xhr = new XMLHttpRequest();
							} else {
								xhr = new ActiveXObject("Microsoft.XMLHTTP");
							}
							console.log(xhr, 'xhr')
							xhr.onreadystatechange = function() {
								if (xhr.readyState == 4) {
									if (xhr.status == 200) {
										var jsonString = xhr.responseText;
										console.log(jsonString);
									}
								}
							}
							// xhr.traditional = true;

							xhr.open("POST", "http://120.79.141.139/MTmarket/orderApi/update", true);
							// setRequestHeader必须放在xhr.open后面
							xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
							xhr.send(ids);
							ids = [];



						}

						break;
					default:
						d[t].children[0].children[1].style.visibility = "hidden"
				}
			}
			allselect.addEventListener('click', AllSelect);
			xiangxi(json2.rows.length);
		}
	}
}
xhr.open("GET", "http://120.79.141.139/MTmarket/orderApi/2/1/3", true);
xhr.send(null);

class SimplePagination {
	constructor(totalPageCount) {
		if (!totalPageCount) return
		this.state = {
			pageNumber: 1,
			totalPageCount
		}
	}

	init(paramsObj) {
		let state = this.state
		// 页面元素的外部容器
		state.container = paramsObj.container || 'body'
		// 不包括开头和结尾的两个固定按钮外，中间最多展示几个数字页码按钮
		state.maxShowBtnCount = paramsObj.maxShowBtnCount || 5
		// 所有的页码元素，包括上一页、下一页
		state.pCName = paramsObj.pCName || 'page-li',
			// 当选中页码时添加的类名class
			state.activeCName = paramsObj.activeCName || 'page-active',
			// 代表页码数字的属性
			state.dataNumberAttr = paramsObj.dataNumberAttr || 'data-number',
			// 上一页 按钮的类名class
			state.prevCName = paramsObj.prevCName || 'page-prev',
			// 下一页 按钮的类名class
			state.nextCName = paramsObj.nextCName || 'page-next',
			// 禁用 上一页 按钮时给此按钮添加的类名class
			state.disbalePrevCName = paramsObj.disbalePrevCName || 'no-prev',
			// 禁用 下一页 按钮时给此按钮添加的类名class
			state.disbaleNextCName = paramsObj.disbaleNextCName || 'no-next',
			// 不包括 上一页 下一页 省略号 按钮的页码元素类名
			state.pageNumberCName = paramsObj.pageNumberCName || 'page-number'
		// 触发切换页面的事件
		state.swEvent = paramsObj.swEvent || 'click'
		// 切换页面时调用的函数
		state.onPageChange = paramsObj.onPageChange
		// 当需要省略符号占位时，确定 active的位置
		state.totalPageCount > state.maxShowBtnCount + 2 && (state.activePosition = Math.ceil(state.maxShowBtnCount / 2))
		this.renderPageDOM()
	}

	switchPage() {

		let state = this.state
		let pCNameList = this.selectorEle('.' + state.pCName, true)
		let pageNumber
		pCNameList.forEach(item => {
			item.addEventListener(state.swEvent, e => {
				const currentPageEle = e.target
				if (this.hasClass(currentPageEle, state.activeCName)) return
				let dataNumberAttr = currentPageEle.getAttribute(state.dataNumberAttr)
				if (dataNumberAttr) {
					// 点击 数字 按钮
					pageNumber = +dataNumberAttr
				} else if (this.hasClass(currentPageEle, state.prevCName)) {
					// 点击 上一页 按钮
					state.pageNumber > 1 && (pageNumber = state.pageNumber - 1)
				} else if (this.hasClass(currentPageEle, state.nextCName)) {
					// 点击 下一页 按钮
					state.pageNumber < state.totalPageCount && (pageNumber = state.pageNumber + 1)
				}
				pageNumber && this.gotoPage(pageNumber)
			})
		})
	}
	gotoPage(pageNumber) {
		let state = this.state
		let evaNumberLi = this.selectorEle('.' + state.pageNumberCName, true)
		let len = evaNumberLi.length
		if (!len || this.isIllegal(pageNumber)) return
		// 清除 active 样式
		this.removeClass(this.selectorEle(`.${state.pCName}.${state.activeCName}`), state.activeCName)
		if (state.activePosition) {
			let rEllipseSign = state.totalPageCount - (state.maxShowBtnCount - state.activePosition) - 1
			// 左边不需要出现省略符号占位
			if (pageNumber <= state.maxShowBtnCount && (pageNumber < rEllipseSign)) {
				if (+evaNumberLi[1].getAttribute(state.dataNumberAttr) > 2) {
					for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
						evaNumberLi[i].innerText = i + 1
						evaNumberLi[i].setAttribute(state.dataNumberAttr, i + 1)
					}
				}
				this.hiddenEllipse('.ellipsis-head')
				this.hiddenEllipse('.ellipsis-tail', false)
				this.addClass(evaNumberLi[pageNumber - 1], state.activeCName)
			}
			// 两边都需要出现省略符号占位
			if (pageNumber > state.maxShowBtnCount && pageNumber < rEllipseSign) {
				// 针对 maxShowBtnCount===1 的特殊处理
				this.hiddenEllipse('.ellipsis-head', pageNumber === 2 && state.maxShowBtnCount === 1)
				this.hiddenEllipse('.ellipsis-tail', false)
				for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
					evaNumberLi[i].innerText = pageNumber + (i - state.activePosition)
					evaNumberLi[i].setAttribute(state.dataNumberAttr, pageNumber + (i - state.activePosition))
				}
				this.addClass(evaNumberLi[state.activePosition], state.activeCName)
			}
			// 右边不需要出现省略符号占位
			if (pageNumber >= rEllipseSign) {
				this.hiddenEllipse('.ellipsis-tail')
				this.hiddenEllipse('.ellipsis-head', false)
				if (+evaNumberLi[len - 2].getAttribute(state.dataNumberAttr) < state.totalPageCount - 1) {
					for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
						evaNumberLi[i].innerText = state.totalPageCount - (state.maxShowBtnCount - i) - 1
						evaNumberLi[i].setAttribute(state.dataNumberAttr, state.totalPageCount - (state.maxShowBtnCount - i) - 1)
					}
				}
				this.addClass(evaNumberLi[(state.maxShowBtnCount + 1) - (state.totalPageCount - pageNumber)], state.activeCName)
			}
		} else {
			// 不需要省略符号占位
			this.addClass(evaNumberLi[pageNumber - 1], state.activeCName)
		}
		state.pageNumber = pageNumber
		state.onPageChange && state.onPageChange(state)
		// 判断 上一页 下一页 是否可使用
		this.switchPrevNextAble()
	}

	switchPrevNextAble() {

		// 请求信息
		let state = this.state
		//console.log(state,'9999','222')


		var middle_con = document.getElementById('middle');
		middle_con.innerHTML = ''
		//console.log(state.pageNumber,'number');
		curpage = state.pageNumber;

		var xhr = null;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var jsonString = xhr.responseText;
					var json2 = JSON.parse(jsonString);
					detail_obj = json2;
					var tianchong = '';
					var dingdan = '';
					order = json2.total; //总订单数
					page = Math.ceil(order / 3); //页码数


					for (let i = 0; i < json2.rows.length; i++) { //3
						var state = '';
						// 每个订单的状态
						switch (json2.rows[i].orderState) {
							case 1:
								state = '待付款';
								break;
							case 2:
								state = '待发货';
								break;
							case 3:
								state = '待收货';
								break;
							case 4:
								state = '待评价';
								break;
							case 5:
								state = '待评价';
								break;
						}
						console.log(json2.rows[i].orderState, state)
						tianchong +=
							`
          <div class = "block">
          <div class="block_top">
                      <div class="pac_kuang"></div>
                      <div class="pac_time">${json2.rows[i].orderDate}</div>
                      <div class="pac_dan">订单号</div>
                      <div class="pac_hao">${json2.rows[i].orderId}</div>
                      <div class="pac_more" index = ${i+1}>订单详细>></div>
          </div>
          <div class="block_con">
          <table>`
					 var arr =  fenge(json2.rows[i].orderDetails[0].goods.goodsImg)
          var arr1 = fenge1(json2.rows[i].orderAddress)

						dingdan = dingdan +
							`
                <tr>
                <td class="dingdan">
                    <div class="iborder">
                    <center><img src="${arr[0]}" width="65px" height="65px" class="viamge"></center>
                    </div>
                    <p class="vname">${json2.rows[i].orderDetails[0].goods.goodsName}</p>
                </td>
                <td class="shuliang">
                    x${json2.rows[i].orderDetails[0].detailNum}
                </td>
                
                <td class="kuaidi" rowspan=${json2.rows[i].orderDetails.length}	>
                    ${arr1[1]}
                </td>
                <td class="zhuangtai" rowspan=${json2.rows[i].orderDetails.length}>
                    <center><p class="Status">${state}</p>
                    <button class="status" id = "Status" >发货</button></center>
                </td>
                </tr>
                `
						for (var j = 1; j < json2.rows[i].orderDetails.length; j++) {
							var arr =  fenge(json2.rows[i].orderDetails[j].goods.goodsImg)
							var dingdan = dingdan +
								`
                <tr>
                <td class="dingdan">
                    <div class="iborder">
                    <center><img src="${arr[0]}" width="65px" height="65px" class="viamge"></center>
                    </div>
                    <p class="vname">${json2.rows[i].orderDetails[j].goods.goodsName}</p>
                </td>
                <td class="shuliang">
                    x${json2.rows[i].orderDetails[j].detailNum}
                </td>
                </tr>
                `
						}
						tianchong = tianchong + dingdan;
						tianchong = tianchong +
							`
               </table>
             </div>
            </div>
            
            `
						console.log(tianchong, '222')

						middle_con.innerHTML = tianchong;
						dingdan = ''
					}

					//---------------------------------发货按钮的显示与否    
					var d = document.getElementsByClassName('zhuangtai')
					for (var t = 0; t < d.length; t++) {
						var btnstate = d[t].children[0].children[0].innerHTML;
						switch (btnstate) {
							case "待发货":
								d[t].children[0].children[1].style.visibility = "visible"
								d[t].children[0].children[1].onclick = function(e) {
									e.path[0].style.visibility = "visible"
									e.path[1].innerHTML = `<p class="Status">待收货</p>`
									ids.push(e.path[7].children[0].children[3].innerHTML)
									console.log(ids, '单个的订单号');
									ids = JSON.stringify(ids)
									console.log(ids, 'IDS')
									//----------ajax发送要改变的数据给后台
									var xhr = null;
									if (window.XMLHttpRequest) {
										xhr = new XMLHttpRequest();
									} else {
										xhr = new ActiveXObject("Microsoft.XMLHTTP");
									}
									console.log(xhr, 'xhr')
									xhr.onreadystatechange = function() {
										if (xhr.readyState == 4) {
											if (xhr.status == 200) {
												var jsonString = xhr.responseText;
												console.log(jsonString);
											}
										}
									}
									xhr.open("POST", "http://120.79.141.139/MTmarket/orderApi/update", true);
									// setRequestHeader必须放在xhr.open后面
									xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
									xhr.send(ids);
									ids = [];



								}

								break;
							default:
								d[t].children[0].children[1].style.visibility = "hidden"
						}
					}
					allselect.addEventListener('click', AllSelect);

					xiangxi(json2.rows.length);
				}
			}
		}
		xhr.open("GET", `http://120.79.141.139/MTmarket/orderApi/2/${state.pageNumber}/3`, true);

		xhr.send(null);





		let prevBtn = this.selectorEle('.' + state.prevCName)
		let nextBtn = this.selectorEle('.' + state.nextCName)
		// 当前页已经是第一页，则禁止 上一页 按钮的可用性
		state.pageNumber > 1 ?
			(this.hasClass(prevBtn, state.disbalePrevCName) && this.removeClass(prevBtn, state.disbalePrevCName)) :
			(!this.hasClass(prevBtn, state.disbalePrevCName) && this.addClass(prevBtn, state.disbalePrevCName))
		// 当前页已经是最后一页，则禁止 下一页 按钮的可用性
		state.pageNumber >= state.totalPageCount ?
			(!this.hasClass(nextBtn, state.disbaleNextCName) && this.addClass(nextBtn, state.disbaleNextCName)) :
			(this.hasClass(nextBtn, state.disbaleNextCName) && this.removeClass(nextBtn, state.disbaleNextCName))
	}

	renderPageDOM() {
		// 渲染页码DOM
		let state = this.state
		let pageContainer = this.selectorEle(state.container)
		if (!pageContainer) return
		let {
			totalPageCount,
			pCName,
			prevCName,
			disbalePrevCName,
			pageNumberCName,
			activeCName,
			dataNumberAttr,
			maxShowBtnCount,
			nextCName,
			disbaleNextCName
		} = state
		let paginationStr =
			`
        <ul class="pagination">
        <li class="${pCName} ${prevCName} ${disbalePrevCName}">上一页</li>
        <li class="${pCName} ${pageNumberCName} ${activeCName}" ${dataNumberAttr}='1'>1</li>
        `
		if (totalPageCount - 2 > maxShowBtnCount) {
			paginationStr += `
          <li class="${pCName} number-ellipsis ellipsis-head" style="display: none;">...</li>`
			for (let i = 2; i < maxShowBtnCount + 2; i++) {
				paginationStr +=
					`<li class="${pCName} ${pageNumberCName} ${i === 1 ? activeCName : ''}" ${dataNumberAttr}='${i}'>${i}</li>`
			}
			paginationStr +=
				`
          <li class="${pCName} number-ellipsis ellipsis-tail">...</li>
          <li class="${pCName} ${pageNumberCName}" ${dataNumberAttr}='${totalPageCount}'>${totalPageCount}</li>
          `
		} else {
			for (let i = 2; i <= totalPageCount; i++) {
				paginationStr += `<li class="${pCName} ${pageNumberCName}" ${dataNumberAttr}='${i}'>${i}</li>`
			}
		}
		paginationStr +=
			`<li class="${pCName} ${nextCName}${totalPageCount === 1 ? ' ' + disbaleNextCName : ''}">下一页</li></ul>`
		pageContainer.innerHTML = paginationStr
		// 切换页码
		this.switchPage()
	}

	isIllegal(pageNumber) {
		let state = this.state
		return (
			state.pageNumber === pageNumber || Math.ceil(pageNumber) !== pageNumber ||
			pageNumber > state.totalPageCount || pageNumber < 1 ||
			typeof pageNumber !== 'number' || pageNumber !== pageNumber
		)
	}

	hiddenEllipse(selector, shouldHidden = true) {
		this.selectorEle(selector).style.display = shouldHidden ? 'none' : ''
	}

	selectorEle(selector, all = false) {
		return all ? document.querySelectorAll(selector) : document.querySelector(selector)
	}

	hasClass(eleObj, className) {
		return eleObj.classList.contains(className);
	}

	addClass(eleObj, className) {
		eleObj.classList.add(className);
	}

	removeClass(eleObj, className) {
		if (this.hasClass(eleObj, className)) {
			eleObj.classList.remove(className);
		}
	}
}

const slp = new SimplePagination(4)
slp.init({
	container: '.box',
	maxShowBtnCount: 3,
	onPageChange: state => {
		console.log('pagination change:', state.pageNumber)
	}
})


function AllSelect() {
	if (flag == 0) {
		var block = document.getElementsByClassName('block');
		for (var j = 0; j < block.length; j++) {

			var pac_kuang = block[j].children[0].children[0];

			var btnstate = block[j].children[1].children[0].children[0].children[0].children[3].children[0].children[0].innerHTML;
			switch (btnstate) {
				case "待发货":

					pac_kuang.style.backgroundImage = "url('../pic/勾选.png')"
					ids.push(block[j].children[0].children[3].innerHTML)
					batch_change.push(block[j].children[0].children[3].innerHTML)

					break;
				default:
			}
		}
		flag = 1;

	} else if (flag == 1) {
		var block = document.getElementsByClassName('block');
		for (var j = 0; j < block.length; j++) {
			var pac_kuang = block[j].children[0].children[0];
			var btnstate = block[j].children[1].children[0].children[0].children[0].children[3].children[0].children[0].innerHTML;
			switch (btnstate) {
				case "待发货":
					pac_kuang.style.backgroundImage = ''
					break;
				default:
			}
		}
		flag = 0;
	}



}



big_num.onclick = function() {

	var _midle = document.getElementById('middle');
	for (var i = 0; i < _midle.children.length; i++) {

		for (var j = 0; j < batch_change.length; j++) {
			if (batch_change[j] == _midle.children[i].children[0].children[3].innerHTML) {
				_midle.children[i].children[1].children[0].children[0].children[0].children[3].children[0].children[0].innerHTML =
					"待收货"
				_midle.children[i].children[1].children[0].children[0].children[0].children[3].children[0].children[1].style.visibility =
					"hidden"
			}
		}
	}

	ids = JSON.stringify(ids)
	console.log(ids, 'IDS')
	//----------ajax发送要改变的数据给后台
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	console.log(xhr, 'xhr')
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var jsonString = xhr.responseText;
				console.log(jsonString);
			}
		}
	}
	xhr.open("POST", "http://120.79.141.139/MTmarket/orderApi/update", true);
	// setRequestHeader必须放在xhr.open后面
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	xhr.send(ids);
	ids = [];

}


function xiangxi(canshu) {
	var pac_more = document.getElementsByClassName("pac_more");
	for (let i = 0; i < canshu; i++) {
		pac_more[i].addEventListener('click', function() {

			index = this.getAttribute("index");
			window.open("../html-student/detail-yes.html?index=" + index + "&curpage=" + curpage);
			//window.location.href = "../html/detail.html?index="+index+"&curpage="+curpage
			// console.log(curpage_1)

		}, false)
	}
}

function fenge(str) {
	let arr = [];
	arr = str.split(",");
	return arr;
}

function fenge1(str) {
	let arr = [];
	arr = str.split("/");
	return arr;
}
