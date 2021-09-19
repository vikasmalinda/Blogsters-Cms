

function ShowOneArticle(article){
  $("#ld").show();
  var a = document.getElementById('blog-id');
  var  json = JSON.stringify(article[0].created_on);
  var parse = JSON.parse(json);
  var t = new Date(parse);
  var t1 = t.toString();
  var time = t1.substr(0,24);
  a.innerHTML = `<div class="blog" id="blg-id">
          <h1 class="title">`+article[0].title+`</h1>
            <hr style="border:solid black 0.5px;">
            <span class="cat"><h5><i class="fas fa-folder fd"></i>`+article[0].categoryname+`</h5></sapn>
              <span><h6>created by - `+article[0].username+`</h6></span>
              <span><h6>created on : `+time+`</h6><span>
              <br>
            <p class="description">
              `+article[0].description+`
            </p>
            </div>`; 
  $("#ld").hide(); 
}


function getOneArticle() {
  console.log('inside getOneArticle');
  var link = window.location.href;
  link = link.replace("http://localhost:3000/view-one-blog?","");
  console.log(link);

  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({"articleid":link}),
    url: "http://localhost:3000/apis/getOneArticle",
    success: function(response) {
      if(response.status == "success") {
        console.log("success");
        console.log(response.article);
        ShowOneArticle(response.article);
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

// window.onload=getOneArticle();

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
    getOneArticle();
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
