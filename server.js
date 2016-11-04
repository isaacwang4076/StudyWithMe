const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

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
    pushUser(new User(req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.school, req.body.tag));
    res.sendFile(__dirname + '/home.html')
});

app.post('/login', function(req, res) {
	var user = checkLogin(req.body.email, req.body.password, function(user) {
		if (user != null) {
			res.sendFile(__dirname + '/home.html');
			res.send({me: user});
		} else {
			// incorrect login info
		}
	});
	//if (user != null) {
		//res.sendFile(__dirname + '/home.html');
		//res.send({me: user});
	//}
});


app.listen(PORT, function() {
    console.log('Server is running');
});

function User(first_name, last_name, email, password, school, tag) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.school = school;
}

function pushUser(first_name, last_name, email, password, school, tag) {
    // add user to database
}

function checkLogin(email, password, onReceive) {
	// grab user from database here, store in var user
	var user;
	onReceive(user);
}
