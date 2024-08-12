import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
    return (
        <div>
            <Outlet /> {/* This will render the matched child admin route */}
        </div>
    );
}

export default AdminLayout;