var du = require('date-utils');
var db = require('../lib/db.js');
var array = require('array');
var val = 'hell'
function t1(){
	console.log('t1'+val);
}
function initOrg(){
var data = [
[
    "市区文昌街总店",
    "001"
],
[
    "市区新市西街店",
    "002"
],
[
    "市区广场店",
    "003"
],
[
    "市区东大街店",
    "007"
],
[
    "市区白云社区店",
    "008"
],
[
    "市区四季花城店",
    "006"
],
[
    "市区银联苑店",
    "004"
],
[
    "市区新市东街店",
    "035"
],
[
    "市区开发区店",
    "005"
],
[
    "市区竹园小区店",
    "033"
],
[
    "市区晋韩路店",
    "036"
],
[
    "市区太行北路店",
    "037"
],
[
    "市区建设北路店",
    "038"
],
[
    "市区观巷店",
    "040"
],
[
    "市区泽州路店",
    "039"
],
[
    "市区红星西街店",
    "042"
],
[
    "城区北石店药店",
    "010"
],
[
    "城区东王台店",
    "043"
],
[
    "城区晓庄店",
    "046"
],
[
    "城区火车站店",
    "049"
],
[
    "城区西安街店",
    "050"
],
[
    "泽州高都店",
    "024"
],
[
    "泽州孟匠店",
    "029"
],
[
    "泽州南村店",
    "031"
],
[
    "泽州县晋普山店",
    "026"
],
[
    "泽州川底店",
    "028"
],
[
    "泽州成庄店",
    "027"
],
[
    "泽州下村店",
    "047"
],
[
    "泽州周村店",
    "041"
],
[
    "泽州大阳店",
    "045"
],
[
    "沁水新建西街店",
    "013"
],
[
    "沁城煤矿店",
    "044"
],
[
    "沁水东安社区店",
    "048"
],
[
    "沁水端氏店",
    "015"
],
[
    "沁水嘉峰店",
    "014"
],
[
    "沁水中村店",
    "021"
],
[
    "沁水郑庄店",
    "022"
],
[
    "陵川附城北街店",
    "012"
],
[
    "陵川城南店",
    "032"
],
[
    "陵川康复路店",
    "016"
],
[
    "陵川礼仪店",
    "019"
],
[
    "阳城新建南路店",
    "018"
],
[
    "阳城北留店",
    "017"
],
[
    "高平河西店",
    "011"
],
[
    "高平马村店",
    "034"
],
[
    "三家店药房",
    "025"
],
[
    "城区寺河嘉苑店",
    "052"
],
[
    "巴公龙岗路药房",
    "030"
],
[
    "山西蓝九天药业连锁有限公司",
    "000"
],
[
    "新建东街药房",
    "051"
],
[
    "巴公药房",
    "009"
],
[
    "西河底药房",
    "020"
],
[
    "晋回路药房",
    "023"
]
];

	var sql_ins = "insert into org( `name`, `id`)values ?";
	//var sql_ins = "insert into org( `name`, `id`)values (?,?)";
	var ret = db.query(sql_ins, [data], function (error, results, fields) {
		if (error) throw error;
		console.log('output: ',results);
		test.done();
	});
	console.log(ret.sql);
}
exports.test = function(test) {
	test.ok(true, 'never happen');
	//t1();
	//initOrg();
var sql_cnt = 'select count(1) cnt from ticket ';
db.query(sql_cnt,(err,result,field)=>{
	console.log(result);
	console.log(result[0].cnt);
	console.log(field);
	test.done();
});

	//test.done();
	return;

	var mdl =  { owner: '1', ver: '1', sels: '' };
	var strSeats = mdl.sels;
	if(!strSeats || ''==strSeats){
		console.log('没有选任何座位');
		return ;
	}

	var sql_ins = "insert into ticket( `seat_id`, `owner_id`, `ver`)values ?";
	var sql_sel = "select * from ticket t where t.ver=? and t.owner_id=? and t.seat_id in (?) ";
	db.beginTransaction(function(err) {
		if (err) { throw err; }

		var values = [];
		var strSeats = ['1','2','3'];
		strSeats.forEach(function(seat_id){
			values[values.length] = [seat_id,'1','1'];
		});
		//values = ['1','1','1'];
		console.log('input :',values);
		db.query(sql_ins, [values], function (error, results, fields) {
			if (error) throw error;
			console.log('output: ',results);

			db.rollback((error) => {
				if (error) throw error;

				var selRet = db.query(sql_sel,['1','1',['1','2']],function(error,results){
					console.log('result: ',results);
					test.done();
				});
				console.log('selRet:',selRet.sql);
			});

		});


	});
	
}
exports.testDateUtils = function(test) {
	var now = new Date();
	var nextday = now.add({
		days: 1
	});
	console.log(nextday.toFormat('YYYY-MM-DD'));
	test.done();
}

function arrHandle(){
	var arr1 = [11,12,13,14,15];
	var arr2 = [1,2,11,13,4,5];

//union
var unionArr = [].concat(arr1);
arr2.forEach(function(item){
	if(unionArr.indexOf(item) >= 0){
	}else{
		unionArr[unionArr.length] = item;
	}
});
console.log('union:',unionArr);
//intersection
var interSectionArr = [];
arr2.forEach(function(item){
	if(arr1.indexOf(item) >= 0){
		interSectionArr.push(item);
	}
});
console.log('intersection:',interSectionArr);
//subtract
var resultArr = array(arr1);
var arr = resultArr.reject(function(item){
	return arr2.indexOf(item) >= 0;
});
var arrAll = arr1.concat(arr2);
arrAll = array(arrAll);
console.log('all:',arrAll.unique().toArray());

console.log('sub:',arr.toArray());
console.log('arr1:',arr1);
console.log('arr2:',arr2);


}
