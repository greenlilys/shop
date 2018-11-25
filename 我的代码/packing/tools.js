// 创建ajax请求对象
function creatRequest(){
	var xhr = "";
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		try{
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}catch(e){
			xhr = null;
		}
		
	}

	return xhr;
}
//ajax请求
function ajax(method, url, data, success) {
	var xhr = creatRequest();
	if(xhr == null){
		alert("xhr创建失败");
		return;
	}
	
	if (method == 'get' && data) {
		url += '?' + data;
	}
	
	xhr.open(method,url,true);
	if (method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	xhr.onreadystatechange = function() {
		
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				success && success(xhr.responseText);
			} else {
				alert('出错了,Err：' + xhr.status);
			}
		}
		
	}
}

// 获取元素样式
function getStyle(obj,attr){ 
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];		
}; 	

// 获取元素文本
function getNodeText(obj){
		if(window.ActiveXObject){//ie
			return obj.text;
		}else{
			if(obj.nodeType == 1){//标准
				return obj.textContent;
			}
		}
	}

// 水平匀速运动 target为水平坐标
function animate(obj,target){
	clearInterval(obj.timer);

	var speed = obj.offsetLeft < target ? 5 : -5;

	obj.timer = setInterval(function(){
		var result = target - obj.offsetLeft;	

		if(Math.abs(result)>=5){
			obj.style.left = obj.offsetLeft + speed + "px";

		}else{
			clearInterval(obj.timer);
			obj.style.left = target + "px";
		}

	},30)
}

//查找某元素的下一个兄弟元素 参数为node.nextSibling
function getNextElement(node){
	if(node.nodeType == 1){
		return node;
	}

	if(node.nextSibling){
		return getNextElement(node.nextSibling);
	}

	return null;
}

// 格式化日期年-月-日 时：分：秒
function getFormatDate() {
	var date = new Date();
	var sep1 = "-";
	var sep2 = ":";
	var sep3 = " / ";

	var month = date.getMonth() + 1;
	var strDate = date.getDate();                 
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var second = date.getSeconds();

	month = month  <= 9 ? '0' + month : month;
	strDate = strDate <= 9 ? '0' + strDate : strDate;
	hour = hour <= 9 ? '0' + hour : hour;
	minutes = minutes <= 9 ? '0' + minutes : minutes;
	second = second <= 9 ? '0' + second : second;

	var currentdate = date.getFullYear() + sep1 + month + sep1 + strDate + ' ' +  hour + sep2 +minutes+ sep2 + second;
	return currentdate;
}

// 验证手机号码
function testPhoneNumber(phoneNumber) {
	var num = phoneNumber.toString().trim();
	var reg = /^1[3|4|5|8]\d{9}$/;        
	if (num) {
		if (reg.test(num)) {
			alert("号码输入有效");
			return true;
		} else {
			alert("号码输入有误");
			return false;
		}
	} else {
		alert("输入不能为空");        
		return false;
	}
}

// 发送验证码倒计时，接口调用成功后调用，依赖jquery
function sendtimeover(sendcount, sendbtnclick) {
	var btn = $(sendbtnclick);        
	var resend = setInterval(function() {
		sendcount--;
		if (sendcount > 0) {
			btn.val(sendcount + "s 后重新获取");                
			btn.attr('disabled', true).removeClass('active');
		} else {
			clearInterval(resend);
			btn.val("获取验证码").removeAttr('disabled').addClass('active');
		}
	}, 1000);

}

//删除左右两端的空格 
function trim(str){ 
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
} 

//删除左边的空格
function ltrim(str){  
	return str.replace(/(^\s*)/g,""); 
} 

//删除右边的空格
function rtrim(str){  
	return str.replace(/(\s*$)/g,""); 
}

// 格式化url参数为对象
function GetRequest() {
	var url = location.href;   
	var request = {};
	if (url && url.indexOf("?") != -1) {        
		var arrs = url.split("?")[1].split("&");
		for (var i = 0,len = arrs.length; i < len; i++) {
			request[arrs[i].split("=")[0]] = (arrs[i].split("=")[1]);
		}
	}
	return request;
}

