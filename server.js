'use strict'
var http = require('http');
var express = require('express');
var PORT = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/static'))
server.listen(PORT, function() {
	console.log("server is listening on port", PORT);
});

module.exports = io
