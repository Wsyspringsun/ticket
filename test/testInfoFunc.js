var tobi = require("tobi");
var app = require("../bin/www");
var browser = tobi.createBrowser(app);
browser.get('/info/',function(res,$){
	console.log(res);
	res.should.have.status(200);
	app.close();
});
