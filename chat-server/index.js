const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = 3000;

io.on('connection', (socket) => {
  console.log('connection connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('connection disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
