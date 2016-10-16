/*jslint devel: true */
/*global $, jQuery, alert*/

function enterMainPage() {
    "use strict";
    window.location = "/main.html";
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
    enterMainPage();
}

