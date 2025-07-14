// socket.js
import { io } from 'socket.io-client';

// Connect to backend server
const socket = io('http://localhost:5000', {
  transports: ['websocket'], // optional: prefer WebSocket over polling
  autoConnect: false         // socket connects manually (you'll call .connect())
});

export default socket;
