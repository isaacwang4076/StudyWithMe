$(document.ready(function() {
	$("#login_button").click(function() {
		alert("yooooo");
		$.post('/login', 
		{email: "dank", password: "memes"},
		function(data, status) {
			alert("Hell yeah");
		});
	});
});

