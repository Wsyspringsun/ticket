var MemberDb = require('../lib/member.js');
var mysql = require('mysql');

var db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'cms'
});

var memberDb = new MemberDb(db);

var member = {
	username: 'superuser',
	password: 'pssword'
};

exports.testCreate = function(test) {
	memberDb.create(member, function(err, sql) {
		test.ok(!err, 'insert err:' + err + ';\nsql:' + sql);
		test.done();
	});
}
exports.testQuery = function(test) {
	memberDb.read(function(err, rows, sql) {
		var r = rows[0];
		test.ok(r.id == member.id, 'read id:' + r.id + 'member id:' + member.id + ';\nsql:' + sql);
		test.done();
	});
}
exports.testReadBy = function(test) {
	memberDb.readBy({username:'superuser'},function(err, rows, sql) {
		test.ok(rows.length == 1, 'readBy username:' + err + ';\nsql:' + sql);
		test.done();
	});
}

exports.testUpdate = function(test) {
	member.password = 'updatepwd';

	memberDb.update(member, function(err, result, sql) {
		test.ok(result.changedRows == 1, 'update changed not 1:\nsql:' + sql);
		test.done();
	});
}
/** 
exports.testDel = function(test) {
	memberDb.del(member.id, function(err, result, sql) {
		test.ok(result.affectedRows == 1, 'del affected not 1:\nsql:' + sql);
		test.done();
	});
}
**/
exports.testEnd = function(test) {
	db.end();
	test.done();
}
