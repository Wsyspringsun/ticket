var express = require('express');
var path = require('path');
var fs = require('fs');
var Canvas = require('canvas');
var router = express.Router();
var db = require('../lib/db.js');
var array = require('array');
var PAGE_SIZE = 10;

var sql_ins = "insert into ticket( `seat_id`, `owner_id`, `ver`)values ?";
var sql_sel = "select t.*,a.title from ticket t,version a where t.ver = a.id and a.del='0' and t.ver=? and t.owner_id=? order by a.id desc limit ?,?;  ";
var sql_cnt_sel = "select count(1) cnt from ticket t,version a where t.ver = a.id and a.del='0' and t.ver=? and t.owner_id=?;";
var sql_print_sel = "select t.*,a.title from ticket t,version a where t.ver = a.id and a.del='0' and t.ver=? and t.owner_id=? and t.seat_id in (?) ";
var sql_valid_sel = "select seat_id from ticket t where t.ver=? and t.seat_id in (?) ";
var sql_disable_sel = "select seat_id from ticket t where t.ver=? ";

var printFmt = JSON.parse(fs.readFileSync(path.join(__dirname,'print.json'), 'utf8'));
var fam = printFmt.fam1;
var lines = printFmt.lines;

function getOffset(w,pSize,cnt){
	return (w-pSize*cnt)/2-10;
}
function getFont(size,fam){
	return size+'px '+fam+'';
}
function getLine(i){
	return lines[i]*printFmt.lineH;
}
function doPrint(req,res,result){
	var canvas = new Canvas(printFmt.w,printFmt.h , 'pdf');
	var ctx = canvas.getContext('2d');
	result.forEach((ticket,i)=>{
		//标题
		ctx.font = getFont(printFmt.font1,fam) ;
		ctx.fillText(req.app.get('title').substring(0,6), getOffset(printFmt.w,printFmt.font1,6), getLine(0));
		ctx.fillText(req.app.get('title').substring(6), getOffset(printFmt.w,printFmt.font1,8), getLine(1));

		//座位
		ctx.font = getFont(printFmt.font2,fam) ;
		var seat_id = ticket.seat_id;
		var spl = seat_id.indexOf('区');
		ctx.fillText(seat_id.substring(0,spl+1), getOffset(printFmt.w,printFmt.font2,spl+1), getLine(2));
		ctx.fillText(seat_id.substring(spl+1), getOffset(printFmt.w,printFmt.font2,(seat_id.length-spl-2)), getLine(3));

		//日期
		ctx.fillText(ticket.title.split(' ')[0], getOffset(printFmt.w,printFmt.font2,6), getLine(4));
		ctx.fillText(ticket.title.split(' ')[1], getOffset(printFmt.w,printFmt.font2,3), getLine(5));

		
		//尾部
		ctx.font = getFont(printFmt.font3,fam) ;
		ctx.fillText('凭票入场', getOffset(printFmt.w,printFmt.font3,4), getLine(6));
		ctx.fillText('盖章有效', getOffset(printFmt.w,printFmt.font3,4), getLine(7));
		ctx.fillText('咨询电话:0356-6993562', getOffset(printFmt.w,printFmt.font3,11), getLine(8));
		ctx.moveTo(0,printFmt.h-5);
		ctx.lineTo(printFmt.w,printFmt.h-5);
		ctx.stroke();

		ctx.addPage();
	});
	res.end(canvas.toBuffer());
}
/* GET home page. */
router.get('/', (req, res, next) => {
	var vers = res.locals.vers;
	var verid ;
	if(req.query.ver){
		verid = req.query.ver;
	}else{
		verid = vers[0].id;
	}
	//search disable tickets
	db.query(sql_disable_sel,[verid],(err,result)=>{
		if(err) return next(err,req,res,next);
		var disableTickets = result;
		
		res.render('ticket/index',{
			verid : verid,
			disables : disableTickets.map((item)=>{
				return '\''+item.seat_id + '\'';
			}) 
		});
	});
});

router.post('/list', (req, res, next) => {
	var ver = req.body.ver;
	if(!ver) {
		return res.render('ticket/list',{tickets:[],verid:ver,paging:{page:0,pages:0}});
	}
	var owner = req.session.loginer;
	db.query(sql_sel,[ver,owner,0,PAGE_SIZE],(err,results,flds)=>{
		if(err)return next(err,req,res,next);
		var tickets = results;
		db.query(sql_cnt_sel,[ver,owner,0,PAGE_SIZE],(err,results,flds)=>{
			if(err)return next(err,req,res,next);
			var cnt = results[0].cnt
			var paging = {
				count:cnt,
				page:1,
				pages:Math.ceil(cnt/PAGE_SIZE),
			};
			req.session.view.list = {
				ver:ver,
				paging:paging
			};
			res.render('ticket/list',{
				tickets:tickets,
				verid:ver,
				paging:paging
			});

		});
	});

});

router.get('/list', (req, res, next) => {
	var page = req.query.page;
	if(!page) {
		return res.render('ticket/list',{tickets:[],verid:ver,paging:{page:0,pages:0}});
	}

	page = parseInt(page);
	var cond = req.session.view.list;
	cond.paging.page = page;
	var ver = cond.ver;
	var owner = req.session.loginer;

	db.query(sql_sel,[ver,owner,page * PAGE_SIZE,PAGE_SIZE],(err,results,flds)=>{
		if(err)return next(err,req,res,next);
		res.render('ticket/list',{tickets:results,verid:ver,paging:cond.paging});
	});

});
router.post('/create', function(req, res, next) {
	var mdl= req.body;
	//存储门店为某个场次选择的座位选票
	mdl.owner = req.session.loginer;
	//获取选择的座位
	var values = [];
	var strSeats = mdl.sels;
	if(!strSeats || ''==strSeats){
		res.error('没有选任何座位');
		return res.redirect('back');
	}
	var seatArr = strSeats.split(',');
	mdl.sels = seatArr;
	seatArr.forEach(function(seat_id){
		values[values.length] = [seat_id,mdl.owner,mdl.ver];
	});
	//判断选择的座位是否可以使用
	db.query(sql_valid_sel,[mdl.ver,seatArr],(err,results,flds)=>{
		if(err)return next(err,req,res,next);
		if(results.length>0){
			//提示某些票已经存在
			var blacks = results.map((item) => {
				return item.seat_id;
			});

			var arr = array(seatArr).reject(function(item){
				return blacks.indexOf(item) >= 0;
			}).toArray();

			res.render('ticket/conflict',{
				ver:mdl.ver,
				owner:mdl.owner,
				seatArr:seatArr,
				blacks:blacks,
				enable:arr
			});

		}else{
			//完成座位选择
			db.query(sql_ins, [values], function (error, results, fields) {
				if (error){
					return next(error,req,res,next);
				}
				

				 db.query(sql_print_sel,[mdl.ver,mdl.owner,mdl.sels],(err,result)=>{
					if(err) return next(err,req,res,next);
					var tickets = result;
					doPrint(req,res,result);
					//res.render('ticket/print', {'tickets':tickets});

					

				});
			});
		}

	});

});


router.post('/print', function(req, res, next) {
	var mdl = req.body;
	if(!mdl.sels){
		res.error('没有选择要打印的票!');
		return res.redirect('back');
	}
	var owner = req.session.loginer;
	var sql = "select t.*,a.title from ticket t,version a where t.ver = a.id and a.del='0' and  t.id in (?) and t.owner_id=? ";
	var ret = db.query(sql,[mdl.sels,owner],(err,result)=>{
		if(err) return next(err,req,res,next);
		var tickets = result;

		doPrint(req,res,result);

	});

});

module.exports = router;
