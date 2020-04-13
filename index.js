var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('client-message', function(msg){
    console.log('message: ' + msg);
    io.emit('client-message', msg);
  });
  socket.on('server-message', function(msg){
    console.log('message: ' + msg);
    io.emit('server-message', msg);
  });
});

http.listen(3000, '192.168.0.101', function(){
  console.log('listening on port 3000');
});