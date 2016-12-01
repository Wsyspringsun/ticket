var uuid = require('node-uuid');

function InfoDb(db) {

	this.db = db;
}
InfoDb.prototype = {
	constructor: InfoDb,
	create: function(info, cb) {
		var db = this.db;
		var id = uuid.v1();
		
		info.id = id;

		var sql = 'insert into info values(?,?,?,?,?); ';
		var values = [info.id, info.title, info.content,info.createDate,info.overDate];

		var q = db.query(sql, values, function(err) {
			cb(err, q.sql);
		});
	},
	read: function(cb) {
		var db = this.db;
		var sql = 'select * from info;';
		
		var q = db.query(sql, function(err, rows) {
			cb(err, rows, q.sql);
		});
	},
	update: function(info,cb) {
		var db = this.db;
		var sql = 'update info set title=?,content=?,overdate=? where id=?;';
		var values = [info.title,info.content,info.overDate,info.id];

		var q = db.query(sql,values, function(err,result) {
			cb(err,result, q.sql);
		});
	},
	del: function(id,cb) {
		var db = this.db;
		var sql = 'delete from info where id=?;';
		var values = [id];

		var q = db.query(sql,values,function(err,result) {
			cb(err, result,q.sql);
		});
	}

}
module.exports = InfoDb;

