import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

export const emitMessage = message => {
  socket.emit('sendMessageTchat', message);
};

export const receiveMessage = cb => {
  socket.on('receiveMessageTchat', message => cb(message));
};
