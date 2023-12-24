import React, { createContext, useEffect, useState } from "react";

// Context creation for Posts
export const PostsContext = createContext(null);

export function PostsProvider({ children }) {
    let [posts, setPosts] = useState([]);

    // Gets random details to the posts in addition to when given in the fetch
    function getRandomCategoryForPost() {
        const categories = ['Daily_Digest', 'Design_Tools', 'Tutorials'];
        const randomIndex = Math.floor(Math.random() * categories.length);
        return categories[randomIndex];
    }

    function getRandomDate() {
        const startDate = new Date('2023-01-01');
        const currentDate = new Date();
        const randomMilliseconds = Math.floor(Math.random() * (currentDate - startDate + 1));
        const randomDate = new Date(startDate.getTime() + randomMilliseconds);
        return randomDate;
    }

    const fetchPosts = () => {
        // Using local storage for the posts from the fetch
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

        // If the local storage is empty, then do fetch to the details for the posts
        if (storedPosts.length > 0) {
            setPosts(storedPosts);
        } else {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(json => {
                    const postsWithCategories = json.map(post => {
                        const randomDate = getRandomDate();
                        const formatter = new Intl.DateTimeFormat('en', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        });
                        const formattedDate = formatter.format(randomDate);

                        return {
                            id: post.id,
                            title: post.title,
                            description: post.body,
                            date: formattedDate,
                            category: getRandomCategoryForPost(),
                            imageUrl: `https://picsum.photos/id/${post.id}/250/300`,
                        };
                    });

                    setPosts(postsWithCategories);

                    // Save fetched posts to local storage
                    localStorage.setItem("posts", JSON.stringify(postsWithCategories));
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        // Save posts to local storage whenever posts are updated
        localStorage.setItem("posts", JSON.stringify(posts));
    }, [posts]);

    const addPost = (post) => {
        setPosts(prevPosts => {
            const updatedPosts = [...prevPosts, post];
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
            return updatedPosts;
        });
    };

    const removePost = (post) => {
        setPosts(prevPosts => {
            const updatedPosts = prevPosts.filter(item => item.id !== post.id);
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
            return updatedPosts;
        });
    };

    const clearPost = () => {
        setPosts([]);
    };

    const updatePost = (updatedPost) => {
        removePost(updatedPost);
        addPost(updatedPost);
    };

    const filterPostsByCategory = (category) => {
        return posts.filter(post => post.category === category);
    };

    const getAmountOfFilterPostsByCategory = (category) => {
        return posts.filter(post => post.category === category).length;
    };

    const setNewPostId = () => parseInt(posts.length + 1, 10);

    const getLastThreePostsByCategory = category => {
        const sortedPosts = posts
            .filter(post => post.category === category)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        return sortedPosts.slice(0, 3);
    };

    const getPostById = currentPostId => {
        return posts.find(post => post.id === currentPostId);
    }

    const getPostByTitle = title => {
        return posts.filter(post => post.title.includes(title));
    }

    const value = {
        posts,
        fetchPosts,
        addPost,
        removePost,
        clearPost,
        filterPostsByCategory,
        getLastThreePostsByCategory,
        getAmountOfFilterPostsByCategory,
        setNewPostId,
        getPostById,
        getPostByTitle,
        updatePost
    };

    return (
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
    );
}

export default PostsProvider;
