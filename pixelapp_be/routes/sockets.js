const { User } = require('../models/user');
const { app } = require('../app');
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  socket.on('iOnline', async (data) => {
    await User.findByIdAndUpdate(
      data.userId,
      { $set: {status: data.status, socketId: data.socketId} }
    );

    const payload = { status, socketId, userId } = data;

    data.sockets.map(item => {
      io.to(item.socketId).emit('connection changed', payload);
    });
  });

  socket.on('iOffline', async (data) => {
    await User.findByIdAndUpdate(
      data.userId,
      { $set: {status: data.status, socketId: data.socketId} }
    );

    const payload = { status, socketId, userId } = data;

    data.sockets.map(item => {
      io.to(item.socketId).emit('connection changed', payload);
    });
  });
});

module.exports = server;
