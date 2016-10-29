/*jslint devel: true */
/*global $, jQuery, alert*/

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

