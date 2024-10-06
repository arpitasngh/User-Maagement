import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ selectedUser, isEditing, setIsEditing, refreshUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone
      });
    } else {
      setFormData({ name: '', email: '', phone: '' });
    }
  }, [isEditing, selectedUser]);

  const validateForm = () => {
    if (formData.name.length < 3) {
      setError('Name must be at least 3 characters long.');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (formData.phone.length < 10) {
      setError('Phone number must be at least 10 digits long.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isEditing) {
      // Update existing user
      axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, formData)
        .then(response => {
          console.log('User updated:', response.data);
          setIsEditing(false);
          refreshUsers(); // Call to refresh the list after update
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      // Create a new user
      axios.post('https://jsonplaceholder.typicode.com/users', formData)
        .then(response => {
          console.log('User created:', response.data);
          setFormData({ name: '', email: '', phone: '' });
          refreshUsers(); // Call to refresh the list after creation
        })
        .catch(error => console.error('Error creating user:', error));
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit User' : 'Create User'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Phone: </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Update User' : 'Create User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
