import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from '../../store/slices/authSlice'; // Adjust path as necessary

const Navbar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearCredentials());
        // Optionally redirect or show a message
    };

    return (
        <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-around' }}>
            <Link to="/">Home (App Logo)</Link>
            <div>
                {userInfo ? (
                    <>
                        <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
                        <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
                        <Link to="/tasks" style={{ marginRight: '10px' }}>Tasks</Link>
                        {userInfo.role === 'Admin' && (
                            <>
                                <Link to="/admin/dashboard" style={{ marginRight: '10px' }}>Admin Dashboard</Link>
                                <Link to="/admin/users" style={{ marginRight: '10px' }}>Manage Users</Link>
                                <Link to="/admin/tasks" style={{ marginRight: '10px' }}>Manage Tasks</Link>
                            </>
                        )}
                        <button onClick={handleLogout}>Logout ({userInfo.username})</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
