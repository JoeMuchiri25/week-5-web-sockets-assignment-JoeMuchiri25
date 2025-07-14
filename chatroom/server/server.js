// server/server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Helper function to format messages
function formatMessage(username, text) {
  return {
    username,
    text,
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  };
}

// In-memory storage for users
let users = new Map();

// Socket.io events
io.on('connection', (socket) => {
  console.log(`✅ Connected: ${socket.id}`);

  socket.on('join', (username) => {
    socket.username = username;
    users.set(socket.id, username);

    socket.broadcast.emit('userJoined', `${username} joined the chat`);
    io.emit('updateUsers', Array.from(users.values()));
  });

  socket.on('sendMessage', (text) => {
    const msg = formatMessage(socket.username, text);
    io.emit('receiveMessage', msg);
  });

  socket.on('typing', () => {
    socket.broadcast.emit('showTyping', socket.username);
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('hideTyping');
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);

    socket.broadcast.emit('userLeft', `${username} left the chat`);
    io.emit('updateUsers', Array.from(users.values()));
    console.log(`❌ Disconnected: ${socket.id}`);
  });
});

// Optional test route
app.get('/', (req, res) => {
  res.send('🟢 Server is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
