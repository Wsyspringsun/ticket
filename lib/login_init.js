var express = require('express');
var res = express.response;
var session_init = function(req,res,next){
	var session = req.session;
	var loginer = session.loginer;
	var navs = res.locals.navs = [];
	if(!loginer){
		return res.redirect('/');
	}
	if('system' === loginer){
		navs.concat([{
			href:'/ticket/',
			title:'管理'
		}]);
	}else{
		navs.concat([{
			href:'/ticket/',
			title:'首页'
		},{
			href:'/ticket/list',
			title:'我的'
		}]);
	}

	//go on router
	next();
}
module.exports = session_init ;
