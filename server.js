//Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
var socketIo = require("socket.io");
var http = require("http");


// Instantiate server
var server = express();

var serverConnect = http.createServer(server);

var io = socketIo(serverConnect); // < Interesting!

//Body Parser configuration
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

// Configure routes
server.get('/',function(req, res) {
  res.setHeader('Content-Type','test/html');
  res.status(200).send('<h1>Bonjour sur mon server</h1>')
})

server.use('/api/', apiRouter);

io.on("connection", (socket) => {
  console.log("New client connected");
});
io.on("addArray", (socket) => {
  console.log("New client connected");
});



//Launch server
server.listen(6000,function(){
  console.log('server en écoute aux 6000 :)');
})
