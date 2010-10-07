function SessionWebSocket(cb) {
	var xhr = new XMLHttpRequest()
	//use https and go over the same port as the server
	xhr.open("GET","/")

	//set our header to get the token
	xhr.setRequestHeader("x-access-request-token","simple")
	xhr.onreadystatechange = function xhrverify() {
		if(xhr.readyState === 4) {
			var tmp
			if(tmp = JSON.parse(xhr.responseText)["x-access-token"]) {
				var socket = new io.Socket();
				cb(socket)
				socket.connect()
				//get the first part as the secret
				socket.send(tmp.split(";")[0])
			}
		}
	}

	//send out the request
	xhr.send()
}