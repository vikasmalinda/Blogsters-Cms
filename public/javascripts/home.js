var userid;
function showCategory(articles){
	$("#ld").show();
	$("#blg-id").hide();
	$("#blg-id1").show();
	var e=document.getElementById('blg-id1');
	e.innerHTML = "";
	if(articles.length==0) {
		e.innerHTML = `<div style="color:white; text-align:center;"><h2>No Blogs available!</h2><div>`;
		$("#ld").hide();
		return;
	}
	for(var i=0;i<articles.length;i++){
		
		var link='view-one-blog?'+articles[i].articleid;

		e.innerHTML+=`<div class="blog-area">
            <div class="blog">
              <h2 style="margin-bottom: 20px; font-size: 40px;">`+articles[i].title+`</h2><hr style="border:solid black 0.5px;">
              <p style="font-size: 20px;">`
              +articles[i].subtitle+`  
              </p>

              <a href="`+link+`">View Full Article</a>
            </div>
          </div>`;
	}
	$("#ld").hide();	
}

function showallarticles(articles){
	$("#ld").show();
	var e=document.getElementById('blg-id');
	if(articles.length==0){
    e.innerHTML =  `<div style="color:white; text-align:center;"><h2>No Blogs available!</h2><div>`;
    $("#ld").hide();
    return;
  }
	for(var i=0;i<articles.length;i++){
		
		var link;
		if(articles[i].userid!=userid){ link='view-one-blog?'+articles[i].articleid; }
		else {
			link='admin-one-article?'+articles[i].articleid;
		}

		e.innerHTML+=`<div class="blog-area">
            <div class="blog">
              <h2 style="margin-bottom: 20px; font-size: 40px;">`+articles[i].title+`</h2><hr style="border:solid black 0.5px;">
              <p style="font-size: 20px;">`
              +articles[i].subtitle+`  
              </p>

              <a href="`+link+`">View Full Article</a>
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
				console.log("success");
				//articles = response.articles;
				//console.log(articles);
				showallarticles(response.articles);
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
				showCategory(response.articles);
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

function ShowUserName(data) {
	if(data.role==2) $('#cmsnv').hide();
	$('#login-id').hide();
	$('#signup-id').hide();
    $('#b-id').hide();
    $('#logout-id').show();
    $('#username').show();
    var val = document.getElementById('username');
    val.innerHTML=`<h2>`+data.name+`</h2>`;
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



