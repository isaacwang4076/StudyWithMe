/*jslint devel: true */
/*global $, jQuery, alert*/

"use strict";

function enterWelcomePage() {
    "use strict";
    window.location = "/welcome.html";
}

function enterLoginPage() {
    "use strict";
    window.location = "/login.html";
}

function enterSignUpPage() {
    "use strict";
    window.location = "/sign_up.html";
}

function enterAboutPage() {
    "use strict";
    window.location = "/about.html";
}

function logIn() {
    "use strict";
    var data = $('#form').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    console.log(data['email']);
    //var formData = new FormData(document.querySelector('form'))
    enterWelcomePage();
}

function User(first_name, last_name, email, password, school, tag) {
    "use strict";
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.school = school;
	  this.tag = tag;
}

//basically does what form's action does + callback
function logInAttempt() {
  var xhttp = new XMLHttpRequest();
  console.log("LOG IN FRONT END CALLED");
  document.getElementById("test2").innerHTML = "LOGIN ATTEMPT!!!!!!!!";

  //construct login attempt data
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var data = JSON.stringify({email: email, password: password});
  console.log(data);

  //callback after data is sent from server response
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("LOGIN RESPONSE FROM SERVER");
      document.getElementById("test").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "/login", true);
  //add login attempt data and send request
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(data);
}
