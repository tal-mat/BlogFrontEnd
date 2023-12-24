import React from 'react';
import PostForm from '../components/Admin';

const AdminPage = () => {
    // Renders the PostForm component and passes down the onPostSubmit function.
    return (
        <div>
            {/* Display a form to add a new post */}
            <PostForm />
        </div>
    );
};

export default AdminPage;