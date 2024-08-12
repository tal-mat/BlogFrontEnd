
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, } from "react-router-dom";
import { router } from "./routes";

// Global State Management Objects
import { PostsProvider } from "./providers/posts-providers";
import { AuthProvider } from "./providers/auth-provider";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <AuthProvider>
            <PostsProvider>
                <RouterProvider router={router} />
            </PostsProvider>
    </AuthProvider>
  </React.StrictMode>
);


