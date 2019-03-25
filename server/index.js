const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let rooms = [];
let users = {};

io.on('connection', socket => {
  socket.on('registerPseudo', pseudo => {
    users = { ...users, [socket.id]: pseudo };
    socket.emit('rooms', rooms);
  });

  socket.on('sendMessageTchat', (message, room) => {
    const messageToSend = { pseudo: users[socket.id], message };

    if (room === 'general') {
      socket.emit('getMessage', messageToSend, room);
      socket.broadcast.emit('getMessage', messageToSend, room);
    } else {
      io.sockets.in(room).emit('getMessage', messageToSend, room);
    }
  });

  socket.on('roomConnection', room => {
    if (rooms.includes(room)) {
      socket.join(room);
      io.sockets.in(room).emit(
        'getMessage',
        {
          message: `${users[socket.id]} join the room`,
        },
        room
      );
    }
  });

  socket.on('createRoom', roomName => {
    if (!rooms.includes(roomName)) {
      rooms = [...rooms, roomName];
      socket.emit('rooms', rooms);
      socket.broadcast.emit('rooms', rooms);
    }
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit(
      'getMessage',
      {
        message: `${
          users[socket.id] ? users[socket.id] : 'Someone'
        } left the chat`,
      },
      'general'
    );

    const { [socket.id]: userToRemove, ...othersUsers } = users;
    users = { ...othersUsers };
  });
});

server.listen(5000, () => console.log('Server started'));
