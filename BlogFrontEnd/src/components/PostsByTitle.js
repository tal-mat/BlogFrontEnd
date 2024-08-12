import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/Posts';
import { PostsContext } from '../providers/posts-providers';
import '../styles/Posts.css';
import '../styles/PostByTitle.css';

export default function PostsByTitle() {
    const { posts } = useContext(PostsContext);
    // Takes care in the user title input
    const [query, setQuery] = useState('');

    // The func the handleGets the user title for each change
    const handleUserInput = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className="post-cards-container">
            {/* First Row */}
            <div className="first-row">
                <div className="post-cards-details-container">
                    <h2>Search Posts</h2>
                    {/* User Input for Search */}
                    <input onChange={handleUserInput} placeholder="Search posts by title..." className="input-search"/>
                </div>
            </div>

            {/* Second Row */}
            <div className="second-row">
                {posts
                    .filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
                    .map((post, index) => (
                        <Link key={index} to={`/posts/${post.id}`}>
                            <PostCard singlePost={post} />
                        </Link>
                    ))}
            </div>
        </div>
    );
}
