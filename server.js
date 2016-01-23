var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

// start webserver on port 8080
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);
// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

// array of all lines drawn
var postit_history = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {
  console.log(postit_history);
   // first send the history to the new client
   for (var i in postit_history) {
     console.log("coucou")
    socket.emit('create_postit', {
                                    postit: postit_history[i] } );
   }

   // add handler for message type "draw_line".
   socket.on('create_postit', function (data) {
      // add received line to history
      console.log(data);
      postit_history.push(data.postit);
      // send line to all clients
      io.emit('create_postit', { postit: data.postit });
   });
});
