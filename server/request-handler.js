var fs = require('fs');
var utils = require('./utils');

var objectId = 1;
// var messages = [];
var messages = [ {username: 'Joker123', text: 'this is a test', roomname: 'Lobby', objectId : objectId },];

var actions = {
  'GET': function(request, response){
    utils.sendResponse(response, {results: messages});
  },
  'POST': function(request, response){
    utils.collectData(request, function(message) {
      messages.push(message);
      message.objectId = ++objectId;
      utils.sendResponse(response, {objectId: objectId}, 201);
    });
  },
  'OPTIONS': function(request, response){
    utils.sendResponse(response, "Hello world!");
  }
};

var requestHandler = function(request, response) {
  var action = actions[request.method];
  if(action){
    action(request, response);
  }
  else {
    utils.sendResponse(response, "Not found", 404);
  }
};

exports.requestHandler = requestHandler;


