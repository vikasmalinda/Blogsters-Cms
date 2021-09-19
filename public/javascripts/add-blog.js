// $("#myform").submit(function(e){
//     return false;
// });

var userid;


function Add(){
	var title = document.getElementById("blog-title").value;
	if(title=="") window.alert("Fill title value int the input :)");
	document.getElementById("blog-title").value = "";
	var subtitle = document.getElementById("blog-subtitle").value;
	if(subtitle=="") window.alert("Fill subtitle value int the input :)");
	document.getElementById("blog-subtitle").value = "";
	var category = document.getElementById("blog-category").value;
	console.log(category);
	if(category=="") window.alert("Fill subtitle value int the input :)");
	category.selectedIndex = 0;;
	var description = document.getElementById("blog-description").value;
	if(description=="") window.alert("Fill subtitle value int the input :)");
	document.getElementById("blog-description").value = "";
	AddArticleBackend(title,subtitle,category,userid,description);
}

function AddArticleBackend(title,subtitle,category,userid,description) {
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"title":title,"subtitle":subtitle,"category":category,
			"userid":userid,"description":description}),
		url: "http://localhost:3000/apis/AddArticleBackend",
		success: function(response) {
			if(response.status == "success") {
				console.log("New Element Added");
				alert("New Blog added!");
				window.location.href = "http://localhost:3000/";
			}
			else {
				console.log(response);
			}
		},
		error: function(xhr, status, err) {
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
	//getallarticles();
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
