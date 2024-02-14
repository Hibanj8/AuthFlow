import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const UserCard = ({ user, onSeeMoreClick }) => (
  <div className="w-1/3 p-2">
    <div className="w-full h-72 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-between hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow relative">
      <img
        src={user.gender === 'male' ? 'src/images/man_user.png' : 'src/images/women_user.png'}
        alt={user.gender === 'male' ? 'male_user' : 'female_user'}
        className="w-28 h-28 rounded-2xl bg-blue-300 mb-2 object-cover"
      />
      <div className="flex flex-col items-start gap-3">
        <p className="font-extrabold">{`${user.username}`}</p>
        <p className="">{`ID: ${user._id}`}</p>
        <button onClick={() => onSeeMoreClick(user)} className="bg-sky-700 font-extrabold p-2 px-4 rounded-md hover:bg-sky-500 transition-colors">
          See more
        </button>
      </div>
      <div className="flex items-center gap-2 mt-2">
      </div>
    </div>
  </div>
);

const UserDetailsCard = ({ user, onClose, onDelete }) => (
  <div className="w-60 h-85 bg-gray-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 shadow-2xl shadow-sky-400 transition-shadow">
    <img
      src={user.gender === 'male' ? 'src/images/man_user.png' : 'src/images/women_user.png'}
      alt={user.gender === 'male' ? 'male_user' : 'female_user'}
      className="w-37 h-37 rounded-2xl bg-blue-300 mb-2 object-cover"
    />
    <div className="">
      <p className="font-extrabold">{`${user.username}`}</p>
      <p className="">{`Email: ${user.email}`}</p>
      <p className="">{`Role: ${user.roles.name}`}</p>
      <br />
      {/* Delete button */}
      <button onClick={() => onDelete(user._id)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 m-1">
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* Edit button */}
      <button onClick={() => handleUpdate(user._id)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 m-1">
          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
        </svg>
      </button>
      <br />
      <button
        className="mt-4 bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(); 
  const token = cookies['access_token'];  // Utilisez cookies au lieu de useCookies

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/getUsers',{
        headers: {
            Authorization: `Bearer ${token}`
          }
      });
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/user/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
      });
      // Re-fetch data after deletion if needed
      fetchData();
      handleCloseClick()
      console.log(userId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
      console.log(values);
      console.log(id);
      await axios.put(`http://localhost:8000/user/${id}`, values,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeeMoreClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className="flex h-screen bg-gray-800">
      <div className="w-1/2 flex flex-col overflow-y-auto">
        <div className="h-screen-80 overflow-y-auto p-4 flex flex-wrap">
          {users.map((user) => (
            <UserCard key={user._id} user={user} onSeeMoreClick={handleSeeMoreClick} />
          ))}
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-white">
        {selectedUser ? (
          <UserDetailsCard user={selectedUser} onClose={handleCloseClick} onDelete={handleDelete} />
        ) : (
          <img src="src/images/adminPage.jpg" alt="Image" className="w-full h-full object-cover" />
        )}
      </div>
    </div>
  );
};

export default UserTable;
