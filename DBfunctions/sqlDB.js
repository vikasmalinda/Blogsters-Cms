var db = require('../db.js');
var config = require('../config');
var jwt = require('../DBfunctions/token.js');


var funcs = {};

// funcs.getApply = function(ftitle,callback) {
// 	var qry = `SELECT articles.articleid,articles.title,articles.subtitle,articles.description,articles.created_on,
// 	users.name AS username,categories.name AS categoryname
// 	FROM articles INNER JOIN users ON articles.userid=users.userid
// 	INNER JOIN categories ON articles.categoryid=categories.categoryid
// 	ORDER BY articles.articleid;
// 	WHERE articles.title LIKE ?`;

// 	db.get().query(qry,[ftitle],function (err, result) {
// 		return callback(err, result);
// 	});

// 	return true;
// }

funcs.getAllArticles = function(callback) {
	var qry = `SELECT articles.articleid,articles.title,articles.userid,articles.subtitle,articles.description,articles.created_on,
	users.name AS username,categories.name AS categoryname
	FROM articles INNER JOIN users ON articles.userid=users.userid
	INNER JOIN categories ON articles.categoryid=categories.categoryid ORDER BY articles.articleid;`;

	db.get().query(qry,function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.getmyblogs = function(userid,callback) {
	var qry = `SELECT articles.articleid,articles.title,articles.subtitle,
	articles.description,articles.created_on,
	articles.userid,
	users.name AS username,categories.name AS categoryname
	FROM articles INNER JOIN users ON articles.userid=users.userid
	INNER JOIN categories ON articles.categoryid=categories.categoryid 
	WHERE articles.userid = ?
	ORDER BY articles.articleid
	;`;

	db.get().query(qry,[userid],function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.getOneArticle = function(articleid,callback) {
	var qry = `SELECT articles.articleid,articles.title,articles.subtitle,
	articles.description,articles.created_on,
	articles.updated_on,users.name AS username,categories.name AS categoryname
	FROM articles INNER JOIN users ON articles.userid=users.userid
	INNER JOIN categories ON articles.categoryid=categories.categoryid 
	WHERE articles.articleid=?;`;

	db.get().query(qry,[articleid],function (err, result) {
		return callback(err, result);
	});

	return true;
}


funcs.GetCategoryID = function(category,callback) {
	var qry = `SELECT categoryid FROM categories WHERE name = ?`
	db.get().query(qry, [category], function (err, result) {
		return callback(err, result);
	});

	return true;
}


funcs.searchemail = function(email,callback) {
	var qry = `SELECT users.name,users.email,articles.title,articles.subtitle,articles.description,
	articles.articleid FROM articles INNER JOIN users ON (users.userid = articles.userid) 
	WHERE users.email=?`;
	db.get().query(qry, [email], function (err, result) {
		return callback(err, result);
	});

	return true;
}



funcs.AddArticle = function(title,subtitle,categoryid,userid,description,callback) {
	var qry = 'INSERT INTO articles (title,subtitle,categoryid,userid,description) VALUES(?,?,?,?,?)';

	db.get().query(qry, [title,subtitle,categoryid,userid,description], function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.savechange = function(articleid,title,cat,intro,description,callback) {
	var qry = `UPDATE articles
			   SET title=?,categoryid=?,subtitle=?,description=?
			   WHERE articleid=?`;

	db.get().query(qry, [title,cat,intro,description,articleid], function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.deletearticle = function(articleid,callback) {
	var qry = `DELETE FROM articles
			   WHERE articleid=?`;

	db.get().query(qry, [articleid], function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.getList = function(callback) {
	var qry = `SELECT * FROM categories`;

	db.get().query(qry, function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.getAllCategory = function(category,callback) {
	var qry = `SELECT articles.articleid,articles.title,articles.subtitle,articles.description,articles.created_on,
	users.name AS username,categories.name AS categoryname
	FROM articles INNER JOIN users ON articles.userid=users.userid
	INNER JOIN categories ON articles.categoryid=categories.categoryid 
	WHERE categories.name=?;`;

	db.get().query(qry,[category],function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.getmycatblogs = function(category,userid,callback) {
	var qry = `SELECT articles.articleid,articles.title,articles.subtitle,
	articles.description,articles.created_on,
	articles.userid,users.name AS username,categories.name AS categoryname
	FROM articles INNER JOIN users ON articles.userid=users.userid
	INNER JOIN categories ON articles.categoryid=categories.categoryid 
	WHERE (categories.name=? AND articles.userid = ?)`;

	db.get().query(qry,[category,userid],function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.findUserByEmail = function(email, callback) {
	var qry = 'SELECT * FROM users WHERE email = ?';

	db.get().query(qry, [email], function (err, rows) {
		return callback(err, rows);
	});
}


funcs.insertNewUser = function(name, email, password, callback) {
	var qry = 'INSERT INTO users (name, email, password,role) VALUES (?, ?, ?,?)';

	db.get().query(qry, [name, email,password,"2"], function (err, result) {
		return callback(err, result);
	});
}


funcs.findUserByUserid = function(userid, callback) {
	var qry = 'SELECT name,role FROM users WHERE userid = ?';

	db.get().query(qry, [userid], function (err, rows) {
		return callback(err, rows);
	});
}


module.exports = funcs;