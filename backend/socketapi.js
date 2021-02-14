// const { socketRequireAuth } = require('../utils/auth');
const io = require('socket.io')();

const socketapi = {
  io: io
};

io.on('connection', (socket) => {
  console.log('socket connected');
});

module.exports = socketapi;
