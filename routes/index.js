var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'WeiXin' });
  res.redirect('/info/');
});

module.exports = router;
