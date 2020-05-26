module.exports = {
	headers: {
		"Authorization": "Basic " + + Buffer.from(username+":"+password).toString("base64"),
		"Accept": "application/json",
	  "Accept-charset": "utf-8",
		"Content-Type": "application/x-www-form-urlencoded"
	}, 
	timeout: 20000
};