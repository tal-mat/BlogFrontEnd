import React, { useState, useContext, useEffect } from 'react';
import {useForm} from "react-hook-form";
import '../styles/Admin.css';

// import user icon from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Global State Management Objects
import { PostsContext } from "../providers/posts-providers";
import {AuthContext} from "../providers/auth-provider";

// PostForm function component
export function PostForm({  }) {
    const { addPost, clearPost, setNewPostId } = useContext(PostsContext);

    // import the main functions of {useForm}
    const { register, handleSubmit, formState, reset } = useForm();

    // State to manage the formatted date
    const [formattedDate, setFormattedDate] = useState('');

    // State to manage msg of post was added successfully date
    const [successMessage, setSuccessMessage] = useState('');

    // Update the formattedDate state when the component mounts
    useEffect(() => {
        const currentDate = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        // format the date as the figma (day, month, year)
        const formattedDate = new Date(currentDate).toLocaleString('en-US', options);
        setFormattedDate(formattedDate);
    }, []);

    // Handles the form submission
    const handleNewPostSubmit = (data) => {
        // Extracting values from form elements
        const { title, description, imageFile, category } = data;

        // Process the imageFile and get its URL
        const imageUrl = imageFile.toString();

        // Creating a formatted date
        const currentDate = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(currentDate).toLocaleString('en-US', options);
        setFormattedDate(formattedDate);

        // Creating an object with the extracted values and the formatted date
        const postData = {
            id: setNewPostId(),
            category: category,
            title: title,
            description: description,
            imageUrl: imageUrl,
            date: formattedDate,
        };

        // Calling the addPost function with the post data
        addPost(postData);

        // Set success message and clear the form
        setSuccessMessage('Post added successfully!');
        reset();
    };

    return (
        <div className="admin-form">
            <h2>Add A New Post</h2>
            <form onSubmit={handleSubmit(handleNewPostSubmit)}>
                {/* Displaying the static current date */}
                <p>Current Date: {formattedDate}</p>

                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    {...register('category', { required: true })}
                    defaultValue=""  // Set the default value to an empty string
                >
                    <option value="" disabled>Select a category</option>
                    <option value="Daily_Digest">Daily Digest</option>
                    <option value="Design_Tools">Design Tools</option>
                    <option value="Tutorials">Tutorials</option>
                </select>
                {formState.errors.category && (
                    <span className="text-danger">Please select a category!</span>
                )}

                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    {...register('title')}
                    required
                />
                {formState.errors.title && <span className="text-danger">Error in this field!</span>}


                <label htmlFor="description">Description:</label>
                <textarea
                    type="text"
                    {...register('description')}
                    required
                ></textarea>
                {formState.errors.description && <span className="text-danger">Error in this field!</span>}

                <label htmlFor="imageFile">Choose Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    {...register('imageFile', { required: true })}
                />
                {formState.errors.imageFile && (
                    <span className="text-danger">Please choose an image!</span>
                )}

                <button type="submit">Add Post</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}

            <button className="clearBtn" onClick={() => { setSuccessMessage(''); reset(); clearPost(); }}>
                CLEAR
            </button>
        </div>
    );
}

// Admin function component
export default function Admin() {
    // State to manage the list of posts
    const { user } = useContext(AuthContext);


    // If the user isn't log in, then the page won't be shown up
    if (!user) {
        return <p>You must sign in first!</p>;
    }

    return (
        <div>
            {/* Render the PostForm component and pass the necessary functions as props */}
            <PostForm />
            {/* Render other components or admin-related content */}
        </div>
    );
}
