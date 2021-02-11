import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5001');

// export function subscribeToTimer (cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 5000);
// }

export function subscribeToTimer (cb) {
  socket.on('test', (message) => { console.log(message); });
}
