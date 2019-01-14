export default class XMLHttp {
	get(obj, url, tag, param) {
  	  var xhr = cc.loader.getXMLHttpRequest();
  	  xhr.open("GET", url);
  	  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  	  xhr.onreadystatechange = function () {
		  if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
			  obj.callback(xhr.responseText, tag, param)
  			   // var config = eval('(' + xhr.responseText + ')');
//   			   instance.setShare(config, titile, describe)
		   }
  	  }
  	  xhr.send();
	}
	
	post(obj, url, tag, param1, param2) {
    	  var xhr = cc.loader.getXMLHttpRequest();
    	  xhr.open("POST", url);
    	  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	  xhr.onreadystatechange = function () {
			  if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
				  console.log('asjkhdkhsdkhaskjdkj')
				  obj.callback(xhr.responseText, tag, param2)
				  // var config = eval('(' + xhr.responseText + ')');
  //   			   instance.setShare(config, titile, describe)
			  }
		  }
    	  xhr.send(param1);
	}
}