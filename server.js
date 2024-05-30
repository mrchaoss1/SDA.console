const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('site'));

let users = [];

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (username) => {
    users.push({ id: socket.id, username });
    socket.broadcast.emit('newUser', username);
  });

  socket.on('sendMessage', (message) => {
    socket.broadcast.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    users = users.filter((user) => user.id!== socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});