import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/Posts.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// Global State Management Objects
import { PostsContext } from "../providers/posts-providers";
import { AuthContext } from "../providers/auth-provider";

export function PostCard({ singlePost }) {
    const { removePost } = useContext(PostsContext);
    const authContext = useContext(AuthContext);
    const user = authContext?.user;

    const handleRemovePost = (event) => {
        // Prevent the default behavior of th button click so after the click we stay at the same page
        event.preventDefault();
        removePost(singlePost);
    };

    return (
        <section className="section-posts">
            <div className="post-container">
                <div className="post-details-container">
                    <span className="deleteBtn-date-container">
                        <span className="post-date">{singlePost.date}</span>
                        {user && user.userName && (
                            <React.Fragment>
                                <button className="deleteBtn" onClick={handleRemovePost}>
                                    <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "rgb(128, 128, 128)" }} />
                                </button>
                                <Link to={`edit/${singlePost.id}`} className="editBtn">
                                    <FontAwesomeIcon icon={faPencilAlt} size="sm" style={{ color: "rgb(128, 128, 128)" }} />
                                </Link>
                            </React.Fragment>
                        )}
                    </span>
                    <h3 className="post-title">{singlePost.title}</h3>
                    <p className="post-description">{singlePost.description}</p>
                </div>
                <div className="post-photo-container">
                    <img
                        className="post-photo"
                        src={singlePost.imageUrl}
                        alt="Post"
                    />
                </div>
            </div>
        </section>
    );
}

export function PostList({ category }) {
    // A component called PostList that will display a list of PostCard components by category.


    const { filterPostsByCategory, getLastThreePostsByCategory, getAmountOfFilterPostsByCategory } = useContext(PostsContext);
    const location = useLocation();

    // Scroll to the top of the page when "View All" is clicked
    const handleViewAllClick = () => {
        window.scrollTo(0, 0);
    };

    // If the current page is home, then show the last three updated posts by date for the category
    // as the design of the figma. If not, returns all the posts of the category
    const posts = (location.pathname === '/') || (location.pathname === '/posts') ? getLastThreePostsByCategory(category) : filterPostsByCategory(category);

    return (
        <div className="post-cards-container">
            {/* First Row */}
            <div className="first-row">
                <div className="post-cards-details-container">
                    {/*Replace underscores with spaces for the category title*/}
                    <h2 className="post-cards-title">{category.replace(/_/g, ' ')}</h2>
                    <h4 className="post-cards-amount">Posts: {getAmountOfFilterPostsByCategory(category)}</h4>
                </div>
                {/* Check if it's not PostsByCategoryPage before rendering the "Show All" button */}
                {location.pathname !== `/category/${category}` && (
                    <button className="ViewAllBtn">
                        <Link to={`/category/${category}`} className="ViewAllLink" onClick={handleViewAllClick}>
                            View all
                        </Link>
                    </button>
                )}
            </div>

            {/* Second Row */}
            <div className="second-row">
                {/* The map is used to loop over the posts array, and returns a PostCard component with props for each post */}
                {posts.map((post, index) => (
                    <Link key={index} to={`/posts/${post.id}`}>
                        <PostCard singlePost={post} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
