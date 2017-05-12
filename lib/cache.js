var express = require('express');
var res = express.response;
res.msg = function(type,msg){
	type = type || 'info';
	var sess = this.req.session;
	sess.msgs = sess.msgs || [];
	sess.msgs.push({
		type : type,
		data : msg
	});
}
res.error = function(msg){
	return this.msg('error',msg);
}


module.exports = function(req,res,next){
	req.session.view = req.session.view || {};
	res.locals.msgs = req.session.msgs || [];
	res.locals.rmMsgs = function(){
		req.session.msgs = [];
	}
	next();
};
