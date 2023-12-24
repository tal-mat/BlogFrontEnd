import React from "react";
import {createBrowserRouter} from "react-router-dom";

import App from './App';
import Home from "./pages/HomePage";
import Posts from "./pages/Postspage";
import PostPage from "./pages/Postpage";
import About from "./pages/AboutPage";
import Admin from "./pages/AdminPage";
import Contact from "./pages/ContactPage";
import Subscribe from "./pages/SubscribePage";
import Login from "./pages/LoginPage";
import PostsByCategory from "./pages/PostsByCategoryPage";
import EditPost from "./pages/EditPostPage";
import PostsByTitlePage from "./pages/PostsByTitlePage";


// Creates the route object
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <>
                        <Home />
                        <Posts />
                    </>
                ),
            },
            {
                path: "/posts",
                element: <Posts />,
            },
            {
                path: "/posts/:id",
                element: <PostPage />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/admin",
                element: <Admin/>,
            },
            {
                path: "edit/:id",
                element: <EditPost />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: "/subscribe",
                element: <Subscribe />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/filterbytitle",
                element: <PostsByTitlePage />,
            },
            {
                path: "/category/:category",
                element: <PostsByCategory />,
            },
        ],
    },
]);