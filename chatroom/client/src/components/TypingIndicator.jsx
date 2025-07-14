// components/TypingIndicator.jsx
import React from 'react';

const TypingIndicator = ({ user }) => {
  if (!user) return null;

  return (
    <div className="mb-2 text-sm italic text-gray-500">
      {user} is typing...
    </div>
  );
};

export default TypingIndicator;
