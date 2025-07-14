// components/ChatWindow.jsx
import React, { useEffect, useState } from 'react';
import socket from '../socket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import UserList from './UserList';

const ChatWindow = () => {
  const username = sessionStorage.getItem('username');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.emit('join', username);

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('updateUsers', (list) => {
      setUsers(list);
    });

    socket.on('showTyping', (user) => {
      setTypingUser(user);
    });

    socket.on('hideTyping', () => {
      setTypingUser(null);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('updateUsers');
      socket.off('showTyping');
      socket.off('hideTyping');
      socket.disconnect();
    };
  }, [username]);

  return (
    <div className="flex h-screen bg-gray-100">
      <UserList users={users} />
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Welcome, {username} 👋</h2>
        <MessageList messages={messages} />
        <TypingIndicator user={typingUser} />
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatWindow;
