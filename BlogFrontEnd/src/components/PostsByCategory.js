import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { PostCard, PostList } from '../components/Posts';
import { PostsContext } from "../providers/posts-providers";
import '../styles/Posts.css';
import '../styles/PostByCategory.css';



export default function PostsByCategory() {
    // Creates the div container with posts filtered to PostLists by specific category
    const { category } = useParams();

    function TitleCategory() {
        return (
            <section className="title-category-section">
                <div className="title-category-container">
                    {/*Replace underscores with spaces for the category title*/}
                    <h1 className="title-category-class">{category.replace(/_/g, ' ')}</h1>
                    <p>A description of the respective category goes right here. Be as expressive as possible, but in brief.</p>
                </div>
            </section>
        );
    }

    return (
        <div className="postsPage-cards-container">
            <TitleCategory />
            <PostList category={category} />
        </div>
    );
}