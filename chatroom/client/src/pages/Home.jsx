// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const joinChat = () => {
    if (username.trim()) {
      sessionStorage.setItem('username', username);
      navigate('/chat');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Welcome to ChatRoom 🚀</h1>
        <p className="text-sm text-center text-gray-500 mb-6">Enter your display name to join the chat</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={joinChat}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Enter Chat
        </button>
      </div>
    </div>
  );
};

export default Home;
