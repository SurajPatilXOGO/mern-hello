import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import TaskManagementPage from './pages/TaskManagementPage';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
import AdminTaskManagementPage from './pages/AdminTaskManagementPage';

// Layout Components
import Navbar from './components/Layout/Navbar'; // Adjusted path

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar included here */}
      <div className="container" style={{padding: '1rem'}}> {/* Optional: for basic styling/layout */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tasks" element={<TaskManagementPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUserManagementPage />} />
          <Route path="/admin/tasks" element={<AdminTaskManagementPage />} />
          <Route path="/" element={<UserDashboardPage />} /> {/* Default route to UserDashboard or a HomePage */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
