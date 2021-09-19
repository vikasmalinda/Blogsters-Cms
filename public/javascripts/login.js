function submitLoginForm() {
	var email = $("#email1").val();
	var password = $("#password1").val();
	console.log(email);
	if (email == "" || password == "") {
		alert("Please fill out the required fields!");
		return;
	}

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"email": email,"password": password}),
		url: "http://localhost:3000/apis/login",
		success: function(response) {
			console.log(response);
			if(response.status == 'success') {
				console.log("login success");
				createCookie("token", response.data.token);
				var rol = response.data.role;
				if(rol==2){
					window.location = "http://localhost:3000";
				}
				else{
					window.location = "http://localhost:3000/admin-all-articles";
				}
				//window.location = "http://localhost:3000";
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