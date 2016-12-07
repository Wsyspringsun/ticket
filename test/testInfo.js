var InfoDb = require('../lib/info.js');
var mysql = require('mysql');

var db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'cms'
});

infoDb = new InfoDb(db);

exports.testDb = function(test) {
	test.ok(db, 'connect to mysql is error');
	test.ok(infoDb, 'create infoDb err');
	test.done();
}

var info = {
	title: 'ipaji is published',
	content: 'this is a big date, my ipaji is published.Everybody can publish info on my ipaji',
	offdays:'12'
};

exports.testCreate = function(test) {
	infoDb.create(info, function(err, sql) {
		test.ok(!err, 'insert err:' + err + ';\nsql:' + sql);
		test.done();
	});
}
exports.testQuery = function(test) {
	infoDb.read(function(err, rows, sql) {
		var r = rows[0];
		test.ok(r.id == info.id, 'read id:' + r.id + 'info id:' + info.id + ';\nsql:' + sql);
		test.done();
	});
}
exports.testUpdate = function(test) {
	info.title = 'updated title';
	info.content = 'updated content';
	info.overDate = info.overDate;

	infoDb.update(info, function(err, result, sql) {
		test.ok(result.changedRows == 1, 'update changed not 1:\nsql:' + sql);
		test.done();
	});
}
exports.testDel = function(test) {
	infoDb.del(info.id, function(err, result, sql) {
		test.ok(result.affectedRows == 1, 'del affected not 1:\nsql:' + sql);
		test.done();
	});
}

exports.testEnd = function(test) {
	db.end();
	test.done();
}
