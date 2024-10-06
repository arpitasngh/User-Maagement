import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ refreshUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

    axios.post('https://jsonplaceholder.typicode.com/users', formData)
      .then(response => {
        console.log('User created:', response.data);
        setSuccess('User created successfully!');
        setFormData({ name: '', email: '', phone: '' });
        refreshUsers(); // Refresh the user list after creation
      })
      .catch(error => {
        console.error('Error creating user:', error);
        setError('Failed to create user.');
      });
  };

  return (
    <div>
      <h2>Create User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
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
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
