import React from 'react';
import {PostForm} from '../components/AddNewPost';
import Admin from "../functions/Admin";


const AddNewPostPage = () => {
    return (
        <div>
            <Admin component={PostForm} />
        </div>
    );
};

export default AddNewPostPage;