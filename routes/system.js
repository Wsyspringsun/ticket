var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');

var sql = "select b.id,b.name,c.title, count(1) cnt from ticket  a, org b,version c where a.ver = c.id and a.owner_id=b.id group by a.ver,a.owner_id";
var sql_seat = "select t.seat_id from ticket t where t.ver=? ";

router.post('/refreshcache', (req, res, next) => {
	//刷新缓存
	delete req.app.cache.vers;
	res.json('ok');
});

router.post('/seatlist', (req, res, next) => {
	var ver = req.body.ver;
	//座位数组
	db.query(sql_seat,[ver],(err,results)=>{
		if(err) return next(err,req,res,next);
		var seatStr = results.map((item)=>{
			return item.seat_id;
		}).join('\r\n');
		res.end(seatStr);
	});
});

router.get('/', (req, res, next) => {
	res.render('system/index');
});

//店铺选取座位统计
module.exports = router;
