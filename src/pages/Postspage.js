import React from 'react';
import { PostList } from '../components/Posts';
import { Link } from 'react-router-dom';


import '../styles/Posts.css';

export default function Posts() {

    // A function to get into the top of the search by title page when click on the search btn
    const handleSearchBtn = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // The posts are shown up like the figma, seperated to categories
    return (
        <div className="postsPage-cards-container">
            <Link to="/filterbytitle" className="searchBtn" onClick={handleSearchBtn}>
                <span>🔍Filter by title</span>
            </Link>
            <PostList category="Daily_Digest" />
            <PostList category="Design_Tools" />
            <PostList category="Tutorials" />
        </div>
    );
}
