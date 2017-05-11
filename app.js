var express = require('express');
var db = require('./lib/db.js');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var messages = require('./lib/messages');
var ticket = require('./routes/ticket');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('rootDir', __dirname);

app.set('title','蓝九天药业连锁有限公司');
app.cache = function(k,v){
	this[k] = v;
};
console.log('init app.......................');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.query());


//use session
app.use(session({
	secret: '888',
	name: 'ljt',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
	cookie: {maxAge: 1800000 },  //session和相应的cookie失效过期,单位毫秒
	resave: false,
	saveUninitialized: true,
}));
//use session msg
app.use(messages);

app.use('/', routes);
app.use(function(req,res,next){
	var session = req.session;
	var loginer = session.loginer;
	if(!loginer){
		res.redirect('/');
		return;
	}
	//go on router
	next();
});

app.use(function(req,res,next){
	var vers;
	if(!req.app.cache.vers){
		var sql_ver_sel = "select * from version t where t.del='0'  limit 20 ";
		db.query(sql_ver_sel,(err,result)=>{
			if(err) return next(err,req,res,next);
console.log('from db');
			vers = result;
			if(!vers || vers.length<=0){
				return res.end('<h1>暂时没有活动，无需选择座位</h1>');
			}
			req.app.cache.vers = vers;
			res.locals.vers = vers;

			next();
		});

	}else{
		vers = req.app.cache.vers;
		res.locals.vers = vers;
		next();
	}
});
app.use('/ticket', ticket);

app.use(()=>{
	db.getConnection((err,connection)=>{
		connection.release();
	})
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;

