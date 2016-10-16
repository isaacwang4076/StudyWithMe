var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Hello http');
});
server.listen(8000);

