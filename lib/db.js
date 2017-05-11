var mysql = require('mysql');

/**
var db = mysql.createConnection({
	host: '192.168.3.12',
	user: 'root',
	password: 'lanjiutian1',
	database: 'cms'
});
**/

var db  = mysql.createPool({
  connectionLimit : 10,
  host            : '192.168.3.12',
  user            : 'root',
  password        : 'lanjiutian1',
  database        : 'cms'
});

module.exports = db;
