// components/MessageList.jsx
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4 p-4 bg-white rounded shadow">
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <span className="font-semibold text-blue-600">{msg.username}</span>{' '}
          <span className="text-sm text-gray-400">[{msg.time}]</span>
          <div className="ml-2 text-gray-800">{msg.text}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
