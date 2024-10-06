import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm'; // Ensure the path is correct

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    refreshUsers(); // Fetch users when component loads
  }, []);

  const refreshUsers = () => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users.');
        setLoading(false);
      });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => {
          console.log('User deleted:', response);
          // Remove user from state
          setUsers(users.filter(user => user.id !== userId));
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          setError('Failed to delete user.');
        });
    }
  };

  const closeEditForm = () => {
    setSelectedUser(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h1>User List</h1>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <UserForm
        selectedUser={selectedUser}
        isEditing={isEditing}
        setIsEditing={closeEditForm}
        refreshUsers={refreshUsers}
      />
    </div>
  );
};

export default UserList;
