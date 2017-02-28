var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var MemberDb = require('../lib/member.js');
var db = require('../lib/db.js');
require('date-utils');

var memberDb = new MemberDb(db);

router.post('/login', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	var json = {};

	memberDb.readBy({'username':username},(err,rows,sql)=>{
		if (err) {
			return next(err,req,res);
		} 
		
		json.ok = false;
		json.err = 1;
		
		if(rows.length <= 0 ) {
			json.data = '用户不存在';
			res.json(json);
			return;
		} 

		var member = rows[0];
		if(member.password != password){
			json.data = '用户名或密码错误';
			res.json(json);
			return;
		}

		json.ok = true;
		json.data = member;

		res.json(json);
	});
});

/*create*/
router.post('/regist', function(req, res, next) {
	var member = {};
	member.username = req.body.username;
	member.password = req.body.password;
	member.createDate = new Date();
	
	memberDb.create(member, function(err, sql) {
		var json = {};

		if (err) {
			console.log(err);
			return next(err,req,res);
		} 

		json.ok = true;
		json.data = member;
		res.json(json);
	});
});
/*update*/
router.post('/:id', function(req, res, next) {
	var id = req.params.id;
	var member = {};
	member.id = id;
	member.password = req.body.password;

	infoDb.update(member, function(err, sql) {
		var json = {};
		if (err) {
			json.ok = false;
			json.data = err+'\nsql:'+sql;
		} else {
			json.ok = true;
			json.data = member;
		}
		res.json(json);
	});

});

module.exports = router;

