const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

// Failed login constants
const NOT_A_USER = 1;
const WRONG_PASS = 2;
const TECH_ERROR = 3;

// Setup firebase
var firebase = require("firebase");
firebase.initializeApp({
serviceAccount: "DankMemes-78bc86ab2774.json",
databaseURL: "https://dankmemes-515d7.firebaseio.com"
});
var database = firebase.database();


/* HTTP CODE */


app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    //console.log(req.body.first_name); 
    //res.render('welcome');
    res.sendFile(__dirname + '/welcome.html');
});

app.post('/sign_up', function(req, res) {
    pushUser(req.body.first_name, req.body.last_name, req.body.email,
      req.body.password, req.body.school, req.body.tag, function(user) {
          if (user) {
            console.log("User account successfully created");
            res.sendFile(__dirname + '/home.html')
          }
          else {
            console.log("Couldn't make account");
            res.send("Couldn't make account");
          }
      });
});

app.post('/login', function(req, res) {
  console.log("LOGIN ATTEMPT with following info:");
  console.log(req.body);
	verifyUser(req.body.email, req.body.password, function(user, error) {
		if (user) {
      console.log("SUCCESSFUL LOGIN");
			//res.sendFile(__dirname + '/home.html');
      res.send("GOOD JOB U LOGGED IN");
		} else {
			// incorrect login info
      console.log("LOGIN FAILED");
      res.send("REKT -- BAD LOGIN INFO");

      // send error page/msg

		}
	});
});


app.listen(PORT, function() {
    console.log('Server is running');
});





/*** USER API ***/

function User(first_name, last_name, email, password, school, tag) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.school = school;
    this.tag = tag;
}


/* Add user to database */
function pushUser(first_name, last_name, email, password, school, tag, callback) {
  //if any fields are empty, then don't make
  if (!first_name || !last_name || !email || !password || !school || !tag) {
    callback(null);
  }
  else {
    console.log("PUSHING USER");
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
    callback(new User(first_name, last_name, email, password, school, tag));
  }
}


/* Check email and password login. callback(bool success, string error) */
function verifyUser(email, password, callback) {
  //id encoding
  var userID = encodeURIComponent(email).replace(/\./g, '%2E');

  //check user database
  var userRef = database.ref("Users").child(userID);
  userRef.on("value",
    function success(snapshot) {
      console.log("LOGIN ATTEMPT -- FIREBASE CHECKING");
      var user = snapshot.val();

      /* User doesn't exist */
      if (user == null) {
        callback(null, NOT_A_USER);
      }
      else {
        /* LOGIN SUCCESSFUL */
        if (user.password == password) {

          //create user object from firebase data and return as first param
          var loggedIn = new User(user.first_name, user.last_name, user.email,
            user.password, user.school, user.tag);
          
          callback(loggedIn, null);
        }
        /* Wrong password */
        else {
          callback(null, WRONG_PASS);
        }

      }
    },
    /* Technical error */
    function error(errorObject) {
      callback(null, TECH_ERROR);
    }
  );
}


