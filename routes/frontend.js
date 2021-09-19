var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/myblogs', function(req, res, next) {
  res.render('myblogs');
});

router.get('/add-blog', function(req, res, next) {
  res.render('add-blog');
});
router.get('/view-one-blog', function(req, res, next) {
  res.render('view-one-blog');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});
//may add comments also...

router.get('/admin-all-articles', function(req, res, next) {
  res.render('admin-all');
});

router.get('/admin-one-article', function(req, res, next) {
  res.render('admin-one');
});

router.get('/newindex', function(req, res, next) {
  res.render('newindex');
});


module.exports = router;
