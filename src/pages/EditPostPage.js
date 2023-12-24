import React, { useContext } from 'react';
import { AuthContext } from '../providers/auth-provider';
import { useParams } from 'react-router-dom';
import EditPost from '../components/EditPost';

export default function EditPostPage() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();

    if (!user) {
        return <p>You must sign in first!</p>;
    }

    return (
        <div>
            {/* Pass the postId to EditPostForm */}
            <EditPost postId={id} />
            {/* Render other components or admin-related content */}
        </div>
    );
}
