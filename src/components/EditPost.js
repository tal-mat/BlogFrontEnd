import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PostsContext } from '../providers/posts-providers';
import { AuthContext } from '../providers/auth-provider';
import '../styles/AdminControlPanel.css';

// This func will display a form to edit exiting post
export function EditPostForm({ postId }) {
    // Get the necessary posts funcs from the posts provider
    const { updatePost, getPostById, fetchPosts } = useContext(PostsContext);

    // Get the necessary form funcs of the form hook
    const { register, handleSubmit, formState, setValue, reset } = useForm({
        defaultValues: {
            title: '',
            description: '',
            imageUrl: '',
        },
    });

    const [formattedDate, setFormattedDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch posts when the component mounts
        fetchPosts();
    }, []); // Empty dependency array to fetch data only once when the component mounts

    const currentPost = getPostById(Number(postId));

    useEffect(() => {
        // Update default values when currentPost changes
        if (currentPost) {
            reset({
                title: currentPost.title,
                description: currentPost.description,
                imageUrl: currentPost.imageUrl,
            });

            // Set the category value dynamically
            setValue('category', currentPost.category);
        }
    }, [currentPost, reset, setValue]);

    useEffect(() => {
        // Format the date when posts or postId change
        if (currentPost) {
            const currentDate = new Date();
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            const formattedDate = new Date(currentDate).toLocaleString('en-US', options);
            setFormattedDate(formattedDate);
        }
    }, [postId, getPostById]);


    const handleEditPostSubmit = (data) => {
        // func for taking care when admin clicks "update post"
        const { title, description, imageFile, category } = data;

        // If the admin chose a new photo, use the new imageFile, otherwise, keep the original imageUrl
        const imageUrl = imageFile && imageFile[0]
            ? URL.createObjectURL(imageFile[0])
            : currentPost.imageUrl;

        // set date by the figma format
        const currentDate = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(currentDate).toLocaleString('en-US', options);
        setFormattedDate(formattedDate);

        // keep the original post values for making the editing easier for admin
        const postData = {
            id: postId,
            category: category,
            title: title,
            description: description,
            imageUrl: imageUrl,
            date: formattedDate,
        };

        updatePost(postData);

        setSuccessMessage('Post updated successfully!');
        reset();
    };

    if (!currentPost) {
        return <p>Post isn't exist.</p>;
    }

    // Creating a new post for edit
    return (
        <div className="admin-form">
            <h2>Edit The Post</h2>
            <form onSubmit={handleSubmit(handleEditPostSubmit)}>
                <p>Current Date: {formattedDate}</p>

                {/* Other form fields */}
                <label htmlFor="category">Category</label>
                <select {...register('category')}>
                    {/* Include options based on your application logic */}
                    <option value="Daily_Digest">Daily Digest</option>
                    <option value="Design_Tools">Design Tools</option>
                    <option value="Tutorials">Tutorials</option>
                </select>

                <label htmlFor="title">Title</label>
                <input {...register('title')} />

                <label htmlFor="description">Description</label>
                <textarea {...register('description')} />

                <label htmlFor="imageUrl">Current Image URL:</label>
                <input type="text" value={currentPost?.imageUrl} readOnly />

                <label htmlFor="imageFile">Choose Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    {...register('imageFile')}
                />
                <button type="submit">Update Post</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}

export default function EditPost({ postId }) {
    const { user } = useContext(AuthContext);

    // Convert postId to an integer
    const postIdInt = parseInt(postId, 10);

    if (!user) {
        return <p>You must sign in first!</p>;
    }

    return (
        <div>
            <EditPostForm postId={postIdInt} />
        </div>
    );
}
