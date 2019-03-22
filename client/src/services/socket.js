import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

export const registerPseudo = pseudo => socket.emit('registerPseudo', pseudo);

export const emitMessage = (room, message) => {
  socket.emit('sendMessageTchat', message, room);
};

export const getMessage = callback =>
  socket.on('getMessage', (message, roomName) => callback(roomName, message));

export const roomConnection = roomName =>
  socket.emit('roomConnection', roomName);

export const createRoom = roomName => socket.emit('createRoom', roomName);

export const getRooms = callback =>
  socket.on('rooms', rooms => callback(rooms));
