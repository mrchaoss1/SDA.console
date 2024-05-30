const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

let chatLog = [];

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const newMessage = { user: 'User', content: message };
    chatLog.push(newMessage);

    const messageEvent = { type: 'chatMessage', data: newMessage };
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messageEvent));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.send(JSON.stringify({ type: 'chatLog', data: chatLog }));
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});