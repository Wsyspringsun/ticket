var du = require('date-utils');
exports.test = function(test) {
	test.ok(true, 'never happen');
	test.done();
}
exports.testDateUtils = function(test) {
	var now = new Date();
	var nextday = now.add({
		days: 1
	});
	console.log(nextday.toFormat('YYYY-MM-DD'));
	test.done();
}

