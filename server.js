const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

//Setup firebase
var firebase = require("firebase");
firebase.initializeApp({
serviceAccount: "DankMemes-78bc86ab2774.json",
databaseURL: "https://dankmemes-515d7.firebaseio.com"
});
var database = firebase.database();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));
//app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    console.log("yo");
    //console.log(req.body.first_name); 
    //res.render('welcome');
    res.sendFile(__dirname + '/welcome.html');
});

app.post('/sign_up', function(req, res) {
    console.log("hello");
    pushUser(req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.school, req.body.tag);
    res.sendFile(__dirname + '/home.html')
});


app.listen(PORT, function() {
    console.log('Server is running');
});

function testDatabase() {
  database.ref("test").set({
dank: "yes",
number: "69"
});
}

/* Add user to database */
function pushUser(first_name, last_name, email, password, school, tag) {
  var usersRef = database.ref("Users");
  //id encoding
  var userID = encodeURIComponent(email).replace(/\./g, '%2E');
  usersRef.child(userID).set({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    school: school,
    tag: tag
  });
}
pushUser("Eric", "Zhang", "erz007@ucsd.edu", "secure password", "UCSD",
    "SwagDemon69");

/* Check email and password login. callback(bool success, string error) */
function verifyUser(email, password, callback) {
  //id encoding
  var userID = encodeURIComponent(email).replace(/\./g, '%2E');
  console.log("attempting: " + userID);

  //check user database
  var userRef = database.ref("Users").child(userID);
  userRef.on("value",
    function success(snapshot) {
      console.log("LOGIN ATTEMPT");
      var user = snapshot.val();

      /* User doesn't exist */
      if (user == null) {
        callback(false, "LOGIN FAILED: User name doesn't exist");
      }
      else {
        /* LOGIN SUCCESSFUL */
        if (user.password == password) {
          callback(true, null);
        }
        /* Wrong password */
        else {
          callback(false, "LOGIN FAILED: Wrong password");
        }

      }
    },
    /* Technical error */
    function error(errorObject) {
      callback(false, errorObject.code);
    }
  );
}

verifyUser("erz007@ucsd.edu", "secure password", function(successBool, error){
    if (successBool) {
      console.log("SUCCESS");
    }
    else {
      console.log("FAILED");
      console.log("REASON: " + error);
    }
});
