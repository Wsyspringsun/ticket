var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var InfoDb = require('../lib/info.js');
var db = require('../lib/db.js');
require('date-utils');

var infoDb = new InfoDb(db);

router.get('/', function(req, res, next) {
	//infoDb.read(function(err, rows, sql) {
	//res.json(rows);
	//});
	res.render('info');
});

/*create*/
router.post('/', function(req, res, next) {
	var info = {};
	info.title = req.body.title;
	info.createDate = now;
	info.content = req.body.content;
	var offdays = new Number(req.body.offdays);
	if(isNaN(offdays)){
		offdays = 15;
	}	
	info.createDate = now;
	var now = new Date();
	var overdate = now.add({
		days: offdays
	});

	info.createDate = now;
	info.overDate = overdate;

	infoDb.create(info, function(err, sql) {
		var json = {};
		if (err) {
			json.result = false;
			json.data = err+'\nsql:'+sql;
		} else {
			json.result = true;
			json.data = info;
		}
		res.json(json);
	});
});
/*read*/
router.get('/read', function(req, res, next) {
	infoDb.read(function(err, rows, sql) {
		var json = {};
		if (err) {
			json.result = false;
			console.log(err+'\nsql:'+sql);
			json.data = 'system read err;';
		} else {
			json.result = true;
			json.data = rows;
		}

		res.json(json);
	});
});

/*update*/
router.post('/:id', function(req, res, next) {
	/*   var id = req.params.id;
    var rootDir = req.app.get('rootDir');
    var dataPath = path.join(rootDir,'/data/blogs/'+id+'.json');
    fs.readFile(dataPath,'utf8',function(err,data){
        if(err) throw err;
        res.json(data);
    });*/
});
/*delete*/
router.get('/:id', function(req, res, next) {});
/*search*/

module.exports = router;

