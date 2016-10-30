var sys = require("sys");
var http = require("http");
var url = require("url");
var qs = require("querystring");

server = http.createServer(function(request, response) {
    if (request.method == "POST") {
        var body = " ";
        request.on("data", function (data) { 
            body+= data;
        });
        request.on("end", function(){
            var POST = qs.parse(body);
            response.writeHead(200);
            response.write(JSON.stringify(POST));
            response.end();
        });
    }
    
    else if (request.method == "GET") {
        var url_parts = url.parse(request.url, true);
        response.writeHead(200);
        response.write(JSON.stringify(url_parts.query));
        response.end();
    }
});

server.listen(8000);