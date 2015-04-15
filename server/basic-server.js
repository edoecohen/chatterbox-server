/* Import node's http module: */
var http = require("http");
var connect = require('connect');
var serveStatic = require('serve-static');
var utils = require('./utils');
var urlParser = require('url');

var port = 3000;

var ip = "127.0.0.1";

var routes = {
  '/classes/messages' : require('./request-handler.js').requestHandler
};

var server = http.createServer(function(request, response){
  console.log("Serving request type " + request.method + " for url " + request.url);
  var parts = urlParser.parse(request.url);
  console.log(parts);
  var route = routes[parts.pathname];
  if(route) {
    route(request,response);
  }
  else {
    utils.sendResponse(response, "Not Found", 404);
  }
});



console.log("Listening on http://" + ip + ":" + port);

// client listening
connect().use(serveStatic("./client")).listen(4000);

// server listening
server.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

