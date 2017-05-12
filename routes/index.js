var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/login', (req, res, next) => {
	var sql = 'select t.pwd from org t where t.id = ?';
	var uname = req.body.uname,pwd = req.body.pwd;
	db.query(sql,[uname],(err,result)=>{
		if(err) return next(err,req,res);
		if(!result || result.length <= 0){
			res.error('不存在的用户');
			return res.redirect('back');
		}
		if(result[0].pwd !== pwd){
			res.error('用户密码错误');
			return res.redirect('back');
		}

		req.session.loginer = uname;
		if(uname == 'system'){
			res.redirect('/system/');
		} else {
			res.redirect('/ticket/');
		}
	});
});

module.exports = router;
