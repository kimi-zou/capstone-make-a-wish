import io from 'socket.io-client';
const socket = io();

export function subscribeToTimer () {
  socket.on('test', (message) => {
    console.log(message);
    socket.emit('message', 'message');
  });
}
