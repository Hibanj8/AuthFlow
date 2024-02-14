import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const users = [
  { id: 1, name: 'Ghoufrane', email: 'email1', password: 'password1', gender: 'female' },
 
];

const Read = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSeeMore = (user) => {
    // Handle the "See more" action if needed
    // For example, you can navigate to a detailed view for the user
    // navigate(`/user/${user.id}`);
    setSelectedUser(user);
  };

  return (
    <div className="flex h-screen bg-gray-800">
      <div className="w-1/2 flex flex-col overflow-y-auto">
        <div className="h-screen-80 overflow-y-auto p-4 flex flex-wrap">
          {users.map((user) => (
            <div
              key={user.id}
              className="w-60 h-80 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow"
            >
              <div className="w-52 h-40 bg-sky-300 rounded-2xl"></div>
              <div className="">
                <p className="font-extrabold">{user.name}</p>
                <p className="">{`Email: ${user.email}`}</p>
                <p className="">{`Password: ${user.password}`}</p>
              </div>
              <button
                className="bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors"
                onClick={() => handleSeeMore(user)}
              >
                See more
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2">
        {selectedUser && (
          <div className="w-60 h-80 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
            <div className="w-52 h-40 bg-sky-300 rounded-2xl"></div>
            <div className="">
              <p className="font-extrabold">{selectedUser.name}</p>
              <p className="">{`Email: ${selectedUser.email}`}</p>
              <p className="">{`Password: ${selectedUser.password}`}</p>
            </div>
            <button
              className="bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors"
              onClick={() => setSelectedUser(null)}
            >
              Go back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Read;
