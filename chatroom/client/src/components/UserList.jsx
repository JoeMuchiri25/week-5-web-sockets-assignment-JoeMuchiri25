// components/UserList.jsx
import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="w-48 p-4 border-r bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Online Users</h2>
      <ul className="space-y-1 text-sm text-gray-700">
        {users.map((user, i) => (
          <li key={i} className="hover:text-blue-600">{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
