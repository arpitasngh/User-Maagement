import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>User Management</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create User</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
