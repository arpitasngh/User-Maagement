const handleEdit = (user) => {
    setFormData(user);  // Pre-fill the form with user data
    setIsEditing(true); // To toggle between create and edit
  };
  
  const handleUpdate = () => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${formData.id}`, formData)
      .then(response => {
        console.log('User updated:', response.data);
        // Update UI logic
      })
      .catch(error => console.error('Error updating user:', error));
  };
  