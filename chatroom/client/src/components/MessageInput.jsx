// components/MessageInput.jsx
import React, { useState } from 'react';
import socket from '../socket';

const MessageInput = () => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      socket.emit('sendMessage', text);
      setText('');
      socket.emit('stopTyping');
    }
  };

  const handleTyping = () => {
    socket.emit('typing');
  };

  return (
    <div className="mt-auto flex gap-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleTyping}
        className="flex-1 p-2 border rounded shadow"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
