// Post.js
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostsContext } from "../providers/posts-providers";
import '../styles/Post.css';

function Post() {
    const { id } = useParams();
    const { fetchPosts, getPostById } = useContext(PostsContext);

    useEffect(() => {
        // Fetch posts when the component mounts
        fetchPosts();
    }, []);

    const currentPost = getPostById(Number(id)); // Convert id to number

    if (!currentPost) {
        return <p>Post isn't exist.</p>; // Add a loading state if the post is not available yet
    }

    // Presents the title, category and date of the post
    function Title() {
        return (
            <section className="title-single-post-section">
                <div className="title-single-post-container">
                    <h1 className="single-post-title" data-content={currentPost.title}>
                        {currentPost.title}
                    </h1>
                    <div className="single-post-date-and-category">
                        <span className="single-post-date-span">{currentPost && currentPost.date}</span>
                        •
                        <span className="single-post-category-span">{currentPost && (currentPost.category.replace(/_/g, ' '))}</span>
                    </div>
                </div>
            </section>
        );
    }

    // Presents the details of the post
    function Details() {
        return (
            <div className="single-post-details-container">
                {currentPost?.imageUrl && (
                    <div className="single-post-photo-container">
                        <img src={`https://picsum.photos/id/${currentPost.id}/800/600`} alt='Post Image' />
                    </div>
                )}
                <div className="single-post-body-container">
                    <p>{currentPost.description}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="single-post-container">
            <Title />
            <Details />
        </div>
    );
}

export default Post;
