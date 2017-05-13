var express = require('express');
var res = express.response;
var session_init = function(req,res,next){
	var session = req.session;
	var loginer = session.loginer;
	if(!loginer){
		return res.redirect('/');
	}
	
	//go on router
	next();
}
module.exports = session_init ;
