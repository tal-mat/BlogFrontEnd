import React, { createContext, useEffect, useState, useContext  } from "react";
import { AuthContext } from '../providers/auth-provider';


export const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);


  const fetchPosts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const posts = await response.json();

      if (Array.isArray(posts)) {
        setPosts(posts);
      } else {
        console.error('Received data is not an array of posts:', posts);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);



  const addPost = async (post) => {
    try {
      let newPost = {
        "category": post.category,
        "title": post.title,
        "description": post.description,
        "imageUrl": post.imageUrl,
        "date": post.date,
        "postedBy": user.userId
      };

      const response = await fetch('http://127.0.0.1:4000/posts', {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert("post created");
      fetchPosts();

    } catch (error) {
      console.error('There was a problem adding the post:', error);
    }
  };


  const removePost = async (post) => {
    try {
      // Optimistic UI update
      setPosts(prevPosts => prevPosts.filter(item => item.id !== post.id));

      const response = await fetch(`http://127.0.0.1:4000/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

    } catch (error) {
      console.error('There was a problem removing the post:', error);
      fetchPosts(); // Refetch posts to synchronize with the server
    }
  };

  const clearPost = async () => {
    try {
      setPosts([]);
    } catch (error) {
      console.error('There was a problem clearing posts:', error);
    }
  };

  const updatePost = async  (updatedPost) => {
    try {

      // Optimistic UI update
      setPosts((prevPosts) =>
          prevPosts.map((post) =>
              post.id === updatedPost.id ? { ...post, ...updatedPost } : post
          )
      );

      // Actual PUT request for updating the post
      const response = await fetch(`http://127.0.0.1:4000/posts/${updatedPost.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPost),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      // Revert the optimistic UI update on error
      console.error('There was a problem updating the post:', error);
      fetchPosts(); // Refetch posts to synchronize with the server
    }
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

  const searchPosts = async (from, to, filterText, lastName) => {
    try {
      const url = 'http://127.0.0.1:4000/posts';
      const requestBody = {
        ...(from !== undefined && { from }),
        ...(to !== undefined && { to }),
        ...(filterText !== null && { filterText }),
        ...(lastName !== null && { lastName }),
      };

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };


      const queryParams = new URLSearchParams(requestBody);
      const fullUrl = `${url}?${queryParams.toString()}`;

      console.log('Full Request URL:', fullUrl);

      const response = await fetch(fullUrl, options);

      console.log('Response Status:', response.status);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const foundPosts = await response.json();
      console.log('Found Posts:', foundPosts);

      if (Array.isArray(foundPosts)) {
        return foundPosts;
      } else {
        console.error('Received data is not an array of posts:', foundPosts);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation of searching posts:', error);
    }
  };

  const value = {
    posts,
    setPosts,
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
    updatePost,
    searchPosts
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
}

export default PostsProvider;
