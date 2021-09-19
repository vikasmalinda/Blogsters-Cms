var categoryList;
var articleid;
var rolecondition;
function ShowOneArticle(article){
  $("#ld").show();
  var a = document.getElementById('blog-id');
  var  json = JSON.stringify(article[0].created_on);
  var parse = JSON.parse(json);
  var t = new Date(parse);
  var t1 = t.toString();
  var time = t1.substr(0,24);
  if(rolecondition==1){
    a.innerHTML = `<div class="blog" id="blg-id">
            <h1 class="title" ><span id="blog-title" contentEditable="false">`+article[0].title+`</span> <i title="Edit" id="edit-title" onclick="editme('blog-title')" class="fas fa-pencil-alt edit-icons"></i></h1>
              <hr style="border:solid black 0.5px;">
                <h5><i class="fas fa-folder fd"></i>
                  <select width="100px" id="blog-category" style="border-radius: 10px;">
                    `+loadlist(categoryList,article[0].categoryname)+`
                  </select></h5>
                <span><h6>created by - `+article[0].username+`</h6></span>
                <span><h6>created on : `+time+`</h6><span>
                <br>
                <div><b>Introduction : </b><i title="Edit" onclick="editme('blog-intro')" class="fas fa-pencil-alt edit-icons"></i></div>
                <p class="description" id="blog-intro">
                  `+article[0].subtitle+`
                </p>
                <br>
                <div><b>Description : </b><i title="Edit" onclick="editme('blog-des')" class="fas fa-pencil-alt edit-icons"></i></div>
                <p class="description" id="blog-des">
                  `+article[0].description+`
                </p>

                <div class="row" style="margin: 20px;">
                  <div class="col-lg-4 offset-lg-8" >
                  <button type="button" onclick="save()" class="btn btn-outline-success" style="border-radius:18px;">Save Changes</button>
                  <button type="button" onclick="window.location='http://localhost:3000/admin-all-articles'" class="btn btn-outline-info" style="border-radius:18px;">Go Back</button>
                  <button type="button" onclick="Delete()"class="btn btn-outline-danger" style="border-radius:18px;">Delete</button>
                  </div>
                 </div> 
              </div>`; 
    $("#ld").hide(); 
  }
  else{
    a.innerHTML = `<div class="blog" id="blg-id">
            <h1 class="title" ><span id="blog-title" contentEditable="false">`+article[0].title+`</span> <i title="Edit" id="edit-title" onclick="editme('blog-title')" class="fas fa-pencil-alt edit-icons"></i></h1>
              <hr style="border:solid black 0.5px;">
                <h5><i class="fas fa-folder fd"></i>
                  <select width="100px" id="blog-category" style="border-radius: 10px;">
                    `+loadlist(categoryList,article[0].categoryname)+`
                  </select></h5>
                <span><h6>created by - `+article[0].username+`</h6></span>
                <span><h6>created on : `+time+`</h6><span>
                <br>
                <div><b>Introduction : </b><i title="Edit" onclick="editme('blog-intro')" class="fas fa-pencil-alt edit-icons"></i></div>
                <p class="description" id="blog-intro">
                  `+article[0].subtitle+`
                </p>
                <br>
                <div><b>Description : </b><i title="Edit" onclick="editme('blog-des')" class="fas fa-pencil-alt edit-icons"></i></div>
                <p class="description" id="blog-des">
                  `+article[0].description+`
                </p>

                <div class="row" style="margin: 20px;">
                  <div class="col-lg-4 offset-lg-8" >
                  <button type="button" onclick="save()" class="btn btn-outline-success" style="border-radius:18px;">Save Changes</button>
                  <button type="button" onclick="window.location='http://localhost:3000'" class="btn btn-outline-info" style="border-radius:18px;">Go Back</button>
                  <button type="button" onclick="Delete()"class="btn btn-outline-danger" style="border-radius:18px;">Delete</button>
                  </div>
                 </div> 
              </div>`; 
    $("#ld").hide();   
  }
}

function loadlist(categoryList,selectedName){
  var s;
  for(var i=0;i<categoryList.length;i++){
    if(categoryList[i].name==selectedName) s+=`<option value="`+categoryList[i].categoryid+`" selected>`+categoryList[i].name+`</option>`;

    else s+=`<option value="`+categoryList[i].categoryid+`">`+categoryList[i].name+`</option>`;
  }
  //console.log(s);
  return s;
}

function editme(id){
  var e=document.getElementById(id);
  e.contentEditable="true";
  e.focus();
}

function Delete(){
  var t=confirm("This article will be Deleted...");
  if(t){
    $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({"articleid":articleid}),
      url: "http://localhost:3000/apis/delete",
      success: function(response) {
        if(response.status == "success") {
         // console.log("Deleted");
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

function save(){
  var description=document.getElementById('blog-des').innerHTML;
  description=description.trim();
  var intro=document.getElementById('blog-intro').innerHTML;
  intro=intro.trim();
  var e = document.getElementById("blog-category");
  var cat = e.options[e.selectedIndex].value;
  console.log(cat);
  var title=document.getElementById('blog-title').innerHTML;
  savechanges(articleid,title,cat,intro,description);
}

function savechanges(id,title,cat,intro,description){
    $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({"articleid":id,"title":title,"categoryid":cat,"subtitle":intro,"description":description}),
    url: "http://localhost:3000/apis/save",
    success: function(response) {
      if(response.status == "success") {
        //console.log("UPDATED");
        alert('Changes made Successfully');
        getOneArticle();
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
function getOneArticle() {
  //console.log('inside getOneArticle');
  var link = window.location.href;
  articleid = link.replace("http://localhost:3000/admin-one-article?","");
  //console.log(link);

  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({"articleid":articleid}),
    url: "http://localhost:3000/apis/getOneArticle",
    success: function(response) {
      if(response.status == "success") {
        //console.log("success");
        //console.log(response.article);
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

function getlist(){
  $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(),
      url: "http://localhost:3000/apis/getlist",
      success: function(response) {
        if(response.status == "success") {
          categoryList= response.list;
          //console.log(categoryList);
          getOneArticle();
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
//window.onload=getlist();
//getallarticles();
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
   // getOneArticle();
   //getallarticles();
   getlist();
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
        rolecondition = response.data.role;
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
