const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const sockets = [];

const broadCast = message => {
  sockets.forEach(socket => {
    socket.emit('receiveMessageTchat', message);
  });
};

io.on('connection', socket => {
  console.log('New tchatter is coming !');
  sockets.push(socket);

  socket.on('sendMessageTchat', message => {
    console.log('test server', message);
    broadCast(message);
    //socket.emit('receiveMessageTchat', message);
  });
});

//const tchatMessage = cb => {

//

server.listen(5000, () => console.log('Server started'));
