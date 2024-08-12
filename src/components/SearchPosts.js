import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/Posts';
import { PostsContext } from '../providers/posts-providers';
import '../styles/Posts.css';
import '../styles/SearchPosts.css';

export default function SearchPosts() {
    const { posts, searchPosts, setPosts } = useContext(PostsContext);


    const [formData, setFormData] = useState({
        from: 1,
        to: 5,
        searchText: '',
        lastName: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // Assuming searchPosts returns the local posts for this component
            const result = await searchPosts(formData.from, formData.to, formData.searchText, formData.lastName);

            setPosts(result);
        } catch (error) {
            console.error('There was an error in handling the search result:', error);
        }
    };

    return (
        <div className="post-cards-container">
            <form className="search-form" onSubmit={handleFormSubmit}>
                <label>
                    From:
                    <input
                        type="number"
                        name="from"
                        value={formData.from}
                        onChange={handleInputChange}
                        min={1}
                        max={10}
                    />
                </label>
                <label>
                    To:
                    <input
                        type="number"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        min={1}
                        max={10}
                    />
                </label>
                <label>
                    Text to search:
                    <input
                        type="text"
                        name="searchText"
                        value={formData.searchText}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Last name of author:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Search</button>
            </form>

            <div className="second-row">
                {posts.map((post, index) => (
                    <Link key={index} to={`/posts/${post.id}`}>
                        <PostCard singlePost={post} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
