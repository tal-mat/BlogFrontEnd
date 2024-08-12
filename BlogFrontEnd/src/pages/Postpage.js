import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';

const PostPage = () => {
    const { id } = useParams();
    // Renders the Post component with the post ID.
    return (
        <div>
            {/* Display a post based on the route parameter */}
            <Post postId={id} />
        </div>
    );
};

export default PostPage;