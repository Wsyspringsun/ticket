var uuid = require('node-uuid');

function MemberDb(db) {
	this.db = db;
}
MemberDb.prototype = {
	constructor: MemberDb,
	create: function(model, cb) {
		var db = this.db;
		var id = uuid.v1();
		
		model.id = id;

		var sql = 'insert into member values(?,?,?,?); ';
		var values = [model.id, model.username, model.password,model.createDate];

		var q = db.query(sql, values, function(err) {
			cb(err, q.sql);
		});
	},
	read: function(cb) {
		var db = this.db;
		var sql = 'select * from member order by createDate desc;';
		
		var q = db.query(sql, function(err, rows) {
			cb(err, rows, q.sql);
		});
	},
	update: function(model,cb) {
		var db = this.db;
		var sql = 'update member set password=? where id=?;';
		var values = [model.password,model.id];

		var q = db.query(sql,values, function(err,result) {
			cb(err,result, q.sql);
		});
	},
	del: function(id,cb) {
		var db = this.db;
		var sql = 'delete from member where id=?;';
		var values = [id];

		var q = db.query(sql,values,function(err,result) {
			cb(err, result,q.sql);
		});
	},
	readBy: function(req,cb) {
		var db = this.db;
		var sql = 'select * from member where 1=1 ';
		var values = [];

		if(req.username){
			sql += " and username = ?";
			values.push(req.username);
		}
		
		var q = db.query(sql,values, function(err, rows) {
			cb(err, rows, q.sql);
		});
	},

}
module.exports = MemberDb;

