var articles;
// function Apply(){
// 	var ftitle = document.getElementById('blog-title').value;
// 	console.log(ftitle);
// 	var c = document.getElementById("blog-category");
//   	var fcat = c.options[c.selectedIndex].value;
//   	var t = document.getElementById("blog-time");
//   	var ftime = t.options[t.selectedIndex].value;
//   	getApply(ftitle);
// }

// function getApply(ftitle) {
// 	console.log('insideapply');
	
// 	$.ajax({
// 		type: "POST",
// 		contentType: "application/json",
// 		data: JSON.stringify({"ftitle":ftitle}),
// 		url: "http://localhost:3000/apis/getApply",
// 		success: function(response) {
// 			if(response.status == "success") {
// 				// console.log(response.status);
// 				// console.log(response.items);
// 				//console.log("success");
// 				articles = response.articles;
// 				console.log('getApplysuccess');
// 				showallarticles();
// 			}
// 			else {
// 				console.log(response);
// 			}
// 		},
// 		error: function(xhr, status, err) {
// 			console.log("......")
// 			console.log(err.toString());
// 		}
// 	});
// }

function Search() {
	var val = document.getElementById("email-id").value;
	console.log(val);
	searchemail(val);
}

function Apply(){
	var c = document.getElementById("blog-category");
	var fcat = c.options[c.selectedIndex].value;
	console.log(fcat);
	getCategory(fcat);
}

function getCategory(mycategory) {
	console.log('insideCategoryApiCall');
	
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"category": mycategory}),
		url: "http://localhost:3000/apis/getAllCategory",
		success: function(response) {
			if(response.status == "success") {
				// console.log(response.status);
				// console.log(response.items);
				console.log("success");
				console.log(response.articles);
				showCategory(response.articles,mycategory);
			}
			else {
				console.log(response);
			}
		},
		error: function(xhr, status, err) {
			console.log("......")
			console.log(err.toString());
		}
	});
}


function searchemail(email) {
	console.log('inside searchemail');
	
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"email":email}),
		url: "http://localhost:3000/apis/searchemail",
		success: function(response) {
			if(response.status == "success") {
				// console.log(response.status);
				// console.log(response.items);
				//console.log("success");
				//articles = response.articles;
				console.log(response.article);
				showemailarticles(response.article);
			}
			else {
				console.log(response);
			}
		},
		error: function(xhr, status, err) {
			console.log("......")
			console.log(err.toString());
		}
	});
}

function showCategory(articles,category){
	console.log(articles);
	$('#user').hide();
	$("#ld").show();
	$('#category').show();
	$('#blg-id').show();
	var cat = document.getElementById('category');
	cat.innerHTML = "";
	cat.innerHTML = `<h1 class="heading text-msg" style="color:white;" >`+category+`</h1>
	<hr style="border:2px solid white;">`;
	var e=document.getElementById('blg-id');
	e.innerHTML = "";
	if(articles.length == 0) {
		e.innerHTML= `<h3 class="text-msg" style="color:white; text-align:center; ">No Blogs to Show!</h3>`;
	}
	for(var i=0;i<articles.length;i++){
		
		var link='admin-one-article?'+articles[i].articleid;

		e.innerHTML+=`<div class="blog-area">
            <div class="blog">
              <h2 style="margin-bottom: 20px; font-size: 40px;">`+articles[i].title+`</h2>
              <hr style="border:solid grey 0.4px;">
              <p style="font-size: 20px;">`
              +articles[i].subtitle+`  
              </p>

              <div class="row">
						<div class="col">
						<center><button type="button" onclick="window.location='http://localhost:3000/`+link+`'" class="btn btn-outline-primary" style="border-radius:18px; width:80px;">Open</button><center></div>
						<div class="col">
						<center><button type="button" onclick="Delete(`+articles[i].articleid+`)" class="btn btn-outline-danger" style="border-radius:18px; width:80px;">Delete</button></center></div>

				</div>
            </div>
          </div>`;
	}
	$("#ld").hide();
}


function showemailarticles(articles){
	console.log(articles);
	$('#category').hide();
	$('#blg-id').hide();
	$("#ld").show();
	$('#user').show();
	var user = document.getElementById('user');
	console.log(articles);
	user.innerHTML = "";
	if(articles.length ==0 ){
		user.innerHTML = `<h2 class="text-msg" style="margin-bottom:5%; color:white;">No Blogs to Show!</h2>`;
		return;
	}
	console.log("username"+articles[0].name);
	user.innerHTML = `<h1 class="heading" style="color:white;">`+articles[0].name+` blogs!</h1>
	<hr style="border:solid white 2px">`;
	$('#blg-id').show();
	var e=document.getElementById('blg-id');
	e.innerHTML = "";
	for(var i=0;i<articles.length;i++){
		
		var link='admin-one-article?'+articles[i].articleid;

		e.innerHTML+=`<div class="blog-area">
            <div class="blog">
              <h2 style="margin-bottom: 20px; font-size: 40px;">`+articles[i].title+`</h2>
              <hr style="border:solid grey 0.4px;">
              <p style="font-size: 20px;">`
              +articles[i].subtitle+`  
              </p>

              <div class="row">
						<div class="col">
						<center><button type="button" onclick="window.location='http://localhost:3000/`+link+`'" class="btn btn-outline-primary" style="border-radius:18px; width:80px;">Open</button><center></div>
						<div class="col">
						<center><button type="button" onclick="Delete(`+articles[i].articleid+`)" class="btn btn-outline-danger" style="border-radius:18px; width:80px;">Delete</button></center></div>

				</div>
            </div>
          </div>`;
	}
	$("#ld").hide();
}


function showallarticles(){
	$('#user').hide();
	$("#ld").show();
	$('#blg-id').show();
	var e=document.getElementById('blg-id');
	e.innerHTML = "";
	for(var i=0;i<articles.length;i++){
		
		var link='admin-one-article?'+articles[i].articleid;

		e.innerHTML+=`<div class="blog-area">
            <div class="blog">
              <h2 style="margin-bottom: 20px; font-size: 40px;">`+articles[i].title+`</h2>
              <hr style="border:solid grey 0.4px;">
              <p style="font-size: 20px;">`
              +articles[i].subtitle+`  
              </p>

              <div class="row">
						<div class="col">
						<center><button type="button" onclick="window.location='http://localhost:3000/`+link+`'" class="btn btn-outline-primary" style="border-radius:18px; width:80px;">Open</button><center></div>
						<div class="col">
						<center><button type="button" onclick="Delete(`+articles[i].articleid+`)" class="btn btn-outline-danger" style="border-radius:18px; width:80px;">Delete</button></center></div>

				</div>
            </div>
          </div>`;
	}
	$("#ld").hide();
}

function getallarticles() {
	console.log('inside');
	
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({}),
		url: "http://localhost:3000/apis/getAll",
		success: function(response) {
			if(response.status == "success") {
				// console.log(response.status);
				// console.log(response.items);
				//console.log("success");
				articles = response.articles;
				//console.log(articles);
				showallarticles();
			}
			else {
				console.log(response);
			}
		},
		error: function(xhr, status, err) {
			console.log("......")
			console.log(err.toString());
		}
	});
}



function Delete(articleid){
  var t=confirm("This article will be Deleted...");
  if(t){
    $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({"articleid":articleid}),
      url: "http://localhost:3000/apis/delete",
      success: function(response) {
        if(response.status == "success") {
          //console.log("Deleted");
          window.location='http://localhost:3000/admin-all-articles';
        }
        else {
          console.log(response);
        }
        },
        error: function(xhr, status, err) {
          console.log("......")
          console.log(err.toString());
        }
      });
  }
}

//window.onload=getallarticles();


function ShowUserName(data) {
  $('#login-id').hide();
  $('#signup-id').hide();
    $('#b-id').hide();
    $('#logout-id').show();
    $('#username').show();
    var val = document.getElementById('username');
    val.innerHTML=`<h2>`+data.name+`</h2>`;
  //getallarticles();
   // getOneArticle();
   getallarticles();
}

$(document).ready(function () {
  welcome();
});

// window.onload = welcome();


function welcome() {
  var token = checkLogin();

  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({"token": token}),
    url: "http://localhost:3000/apis/welcome",
    success: function(response) {
      if(response.status == 'success') {
        console.log("login cred are correct!!");
        console.log(response.data);
        userid = response.data.userid;
        ShowUserName(response.data);
      }
      else {
        logout();
        alert(response.message || "Error!");
        window.location.href = "http://localhost:3000/newindex";
      }
    },
    error: function(xhr, status, err) {
      console.log(err.toString());
    }
  });
}
