function createCookie(name, value) {
    console.log("createCookie");
	document.cookie = name + "=" + value + "; path=/";
    //token=dvfdlndgagfmbdfabfg;
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
} 


function deleteCookies() {
    document.cookie = "token=; path=/";
}


function logout() {
	deleteCookies();
    // $('#logout').hide();
    // $('#login').show();
    
	window.location.href = "http://localhost:3000/newindex";
}


function checkLogin() {
    
    var token = getCookie("token");

    if(token == "") {
        logout();
    }
    // $('#login').hide();
    // $('#logout').show();
    return token;
}

function LogOut() {
    logout();
}


