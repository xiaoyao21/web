function Ajax(object) {
	xhr = new XMLHttpRequest();
	
	// var message = getParmer(object.data);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {	
			var status = xhr.status;
			
			if (status >= 200 && status < 300) {
				
				// object.success(xhr.responseText, xhr.responseXML);
				object.success(xhr.responseText);
			} else {
				object.fail(xhr.status);
			}
		}
	};

	 if (object.type == 'get') {
		xhr.open("get", object.url , object.async);
		xhr.send(null);
	} else if (object.type == 'post') {
		xhr.open("post", object.url, object.async);
		xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		xhr.send(object.data);
	}
}
