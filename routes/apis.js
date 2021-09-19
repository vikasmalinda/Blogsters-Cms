var express = require('express');
var router = express.Router();
var db = require('../DBfunctions/sqlDB.js');
var jwt = require('../DBfunctions/token.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// router.post('/getApply', function(req, res, next) {

// 	console.log('get all filtered Blogs');
// 	var ft = req.body.ftitle;
// 	var ftitle = ft; 

// 	db.getApply(ftitle,function (err, result) {
// 		if (err) {
// 			console.log(err);
// 			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
// 		}
// 		// NO RESULT NEEDED IN UPDATE QUERY

// 		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "articles": result });
// 	});
// });

router.post('/searchemail', function(req, res, next) {

	var email = req.body.email;
	db.searchemail(email,function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		console.log("search email api");
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "article": result });
	});
});


router.post('/getAll', function(req, res, next) {

	console.log('get all Blogs');

	db.getAllArticles(function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		// NO RESULT NEEDED IN UPDATE QUERY

		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "articles": result });
	});
});

router.post('/myblogs', function(req, res, next) {

	console.log('get my Blogs');
	var userid = req.body.userid;

	db.getmyblogs(userid,function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		// NO RESULT NEEDED IN UPDATE QUERY

		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "articles": result });
	});
});

router.post('/getOneArticle', function(req, res, next) {

	console.log('get one blog');

	var articleid = req.body.articleid;
	db.getOneArticle(articleid,function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "article": result });
	});
});

router.post('/save', function(req, res, next) {

	console.log('save changes');

	var articleid = req.body.articleid;
	var title=req.body.title;
	var cat=req.body.categoryid;
	var intro=req.body.subtitle;
	var des=req.body.description;
	db.savechange(articleid,title,cat,intro,des,function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "article": result });
	});
});

router.post('/delete', function(req, res, next) {

	var articleid = req.body.articleid;
	db.deletearticle(articleid,function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "article": result });
	});
});

router.post('/AddArticleBackend', function(req, res, next) {

	console.log('get one blog');
	var categoryid;
	var title = req.body.title;
	var subtitle = req.body.subtitle;
	var category = req.body.category;
	var userid = req.body.userid;
	var description = req.body.description;
	if(!description || !title||!subtitle||!category||!userid)
		return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });
	db.GetCategoryID(category,function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		// var c =  res.json({ "status": "success", "message": "Items Received!", "code": 200 ,"cid": result});
		// categoryid = result[0].categoryid;
		//

		categoryid = result[0].categoryid;

		db.AddArticle(title,subtitle,categoryid,userid,description,function (err, result) {
			if (err) {
				console.log(err);
				return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
			}
			return res.json({ "status": "success", "message": "Items Received!", "code": 200 });
		});
	});
	
});

router.post('/getlist', function(req, res, next) {
	
	db.getList(function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "list": result });
	});
});


router.post('/getAllCategory', function(req, res, next) {

	console.log('get category Blogs');

	var cat = req.body.category;

	db.getAllCategory(cat,function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		// NO RESULT NEEDED IN UPDATE QUERY

		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "articles": result });
	});
});


router.post('/mycatblogs', function(req, res, next) {

	console.log('get my category Blogs');

	var cat = req.body.category;
	var userid = req.body.userid;

	db.getmycatblogs(cat,userid,function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		// NO RESULT NEEDED IN UPDATE QUERY

		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "articles": result });
	});
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	if(email == "")
		return res.json({ "status": "failed", "message": "Please enter a valid email address!"});
	if(password == "")
		return res.json({ "status": "failed", "message": "Please enter password!"});

	db.findUserByEmail(email, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }
	    //console.log("inside login api");
	    if(rows.length == 0)
    		return res.json({ "status": "failed", "message": "Unregistered Email!" });
    	console.log(rows.length);
    	console.log(rows[0].password);
		if(rows[0].password != password)
			return res.json({ "status": "failed", "message": "Invalid Password!" });
		//console.log("token data");
		var data = {
			"email" : email,
			"name": rows[0].name,
			"token": jwt.createToken(rows[0].userid),
			"role" : rows[0].role
		};
		console.log(data);
		return res.json({ "status": "success", "message": "success", "data": data });
	});
});


router.post('/welcome', function(req, res, next) {
	var token = req.body.token;
	
	jwt.getUseridFromToken(token, function (err, result) {
		if(err) {
			return res.json({ "status": "failed", "message": "Invalid User... Please Login!", "code": "401" });
		}

		var userid = result;

		db.findUserByUserid(userid, function (err, rows) {
		    if (err) {
		    	console.log(err);
		    	return res.json({ "status": "failed", "message": "Invalid User... Please Login!", "code": "402" });
		    }
		    console.log("rows length"+" = "+rows.length);
		    if(rows.length == 0)
	    		return res.json({ "status": "failed", "message": "Invalid User... Please Login!", "code": "403" });		    

		    var data = {};
		    data.name = rows[0].name;
		    data.userid = userid;
		    data.role = rows[0].role;

			return res.json({ "status": "success", "message": "ok", "code": "200", "data": data });
		});
	});
});

router.post('/register', function(req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	if(name == "")
		return res.json({ "status": "failed", "message": "Please enter your name!"});
	if(email == "")
		return res.json({ "status": "failed", "message": "Please enter a valid email address!"});
	if(password == "")
		return res.json({ "status": "failed", "message": "Please enter password!"});

	db.findUserByEmail(email, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }

	    if(rows.length != 0)
    		return res.json({ "status": "failed", "message": "Email already registered!" });

    	db.insertNewUser(name, email, password, function (err, result) {
    		if (err) {
		    	console.log(err);
		    	return res.json({ "status": "failed", "message": "Error!" });
		    }
		    
			return res.json({ "status": "success", "message": "Registration Successful!" });
    	});
	});
});


module.exports = router;
