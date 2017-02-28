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
			json.ok = false;
			json.data = err+'\nsql:'+sql;
		} else {
			json.ok = true;
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
			json.ok = false;
			console.log(err+'\nsql:'+sql);
			json.data = 'system read err;';
		} else {
			json.ok = true;
			json.data = rows;
		}

		res.json(json);
	});
});

/*update*/
router.post('/:id', function(req, res, next) {
	var id = req.params.id;
	var info = {};
	info.id = id;
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
console.log(overdate);
	info.createDate = now;
	info.overDate = overdate;

	infoDb.update(info, function(err, sql) {
		var json = {};
		if (err) {
			json.ok = false;
			json.data = err+'\nsql:'+sql;
		} else {
			json.ok = true;
			json.data = info;
		}
		res.json(json);
	});

});
/*delete*/
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	console.log(id);
	infoDb.del(id, function(err,result, sql) {
		var json = {};
		if (err) {
			json.ok = false;
		}else if(result.affectedRows !== 1){
			json.ok = false;
		}
		json.ok = true;
		res.json(json);
	});

});
/*search*/

module.exports = router;

