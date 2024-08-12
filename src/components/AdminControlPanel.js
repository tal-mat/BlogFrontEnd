import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminControlPanel.css';

export function AdminControlPanel() {
    return (
        <div className="admin-control-panel">
            <h2>Admin Control Panel</h2>
            <ul>
                <li>
                    <Link to="/admin/AddNewPost">Create New Post</Link>
                </li>
                <li>
                    <Link to="/admin/UserManagement">User Management</Link>
                </li>
            </ul>
        </div>
    );
}
