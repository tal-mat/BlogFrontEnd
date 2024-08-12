import React from "react";
import {createBrowserRouter} from "react-router-dom";

import App from './App';
import Home from "./pages/HomePage";
import Posts from "./pages/Postspage";
import PostPage from "./pages/Postpage";
import About from "./pages/AboutPage";
import AdminControlPanelPage from "./pages/AdminControlPanelPage";
import Contact from "./pages/ContactPage";
import Subscribe from "./pages/SubscribePage";
import Login from "./pages/LoginPage";
import SignIn from "./pages/SignInPage";
import PostsByCategory from "./pages/PostsByCategoryPage";
import EditPost from "./pages/EditPostPage";
import PostsByTitlePage from "./pages/PostsByTitlePage";
import SearchPostsPage from "./pages/SearchPostsPage";
import UserManagementPage from "./pages/UserManagementPage";
import ResetPassword from "./pages/ResetPasswordPage";
import AddNewPostPage from "./pages/AddNewPostPage";
import EditUserPage from "./pages/EditUserPage";
import UsersProvider from "./providers/users-provider";
import AdminLayout from "./functions/AdminLayout";


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
            // {
            //     path: "/admin",
            //     element: <AdminControlPanelPage/>,
            // },
            // {
            //     path: "/admin/AddNewPost",
            //     element: <AddNewPostPage/>,
            // },
            // {
            //     path: "/admin/UserManagement",
            //     element: <UserManagementPage/>,
            // },
            // {
            //     path: "/admin/EditUser/:id",
            //     element: <EditUserPage/>,
            // },
            {
                path: '/admin',
                element: (
                    <UsersProvider>
                        <AdminLayout />
                    </UsersProvider>
                ),
                children: [
                    { path: '', element: <AdminControlPanelPage/> }, // Matches /admin
                    { path: "/admin/AddNewPost", element: <AddNewPostPage/> },
                    { path: "/admin/UserManagement", element: <UserManagementPage/> },
                    { path: "/admin/EditUser/:userId", element: <EditUserPage/> },
                ],
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
                path: "/resetPassword",
                element: <ResetPassword />,
            },
            {
                path: "/SignIn",
                element: <SignIn />,
            },
            {
                path: "/filterbytitle",
                element: <PostsByTitlePage />,
            },
            {
                path: "/searchposts",
                element: <SearchPostsPage />,
            },
            {
                path: "/category/:category",
                element: <PostsByCategory />,
            },
        ],
    },
]);