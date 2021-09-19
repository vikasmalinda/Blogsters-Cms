function submitRegisterForm() {
	var name = $("#name").val();
	var email = $("#email").val();
	var password = $("#password").val();

	if (name == "" || email == "" || password == "") {
		alert("Please fill out the required fields!");
		return;
	}

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"name": name, "email": email, "password": password}),
		url: "http://localhost:3000/apis/register",
		success: function(response) {
			if(response.status == 'success') {
				alert("User Registered!");
				LoginUser(email,password);
			}
			else {
				alert(response.message || "Error!");
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}

function LoginUser(email,password) {
	// var email = $("#email1").val();
	// var password = $("#password1").val();

	// if (email == "" || password == "") {
	// 	alert("Please fill out the required fields!");
	// 	return;
	// }

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"email": email, "password": password}),
		url: "http://localhost:3000/apis/login",
		success: function(response) {
			console.log(response);
			if(response.status == 'success') {
				console.log("login success");
				createCookie("token", response.data.token);
				if(response.data.role==2)
				{
					window.location = "http://localhost:3000";
				}
				else{
					window.location = "http://localhost:3000/admin-all-articles";
				}
			}
			else {
				alert(response.message || "Error!");
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
			console.log("login error");
		}
	});
}


