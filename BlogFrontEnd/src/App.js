import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// function App() {

    // const [currentPage, setCurrentPage] = useState('home');
    // const [posts, setPosts] = useState([]);
    //
    // // Examples posts
    // const samplePosts = [
    //     {
    //         title: '10 Hilarious Cartoons That Depict Real-Life Problems of Programmers',
    //         description: 'Redefined the user acquisition and redesigned the onboarding experience, all within 3 working weeks..',
    //         imageUrl: require('./images/posts/1.JPG'), // Adjust the path
    //         date: 'August 13, 2021',
    //     },
    //     {
    //         title: '10 Hilarious Cartoons That Depict Real-Life Problems of Programmers',
    //         description: 'Redefined the user acquisition and redesigned the onboarding experience, all within 3 working weeks.',
    //         imageUrl: require('./images/posts/2.JPG'), // Adjust the path
    //         date: 'August 13, 2021',
    //
    //     },
    //     {
    //         title: '10 Hilarious Cartoons That Depict Real-Life Problems of Programmers',
    //         description: 'Redefined the user acquisition and redesigned the onboarding experience, all within 3 working weeks..',
    //         imageUrl: require('./images/posts/3.JPG'), // Adjust the path
    //         date: 'August 13, 2021',
    //     },
    // ];
    //
    // useEffect(() => {
    //     // Use setPosts to add the sample posts directly
    //     setPosts(samplePosts);
    // }, []);
    //

  /*  const renderPageByPageName = () => {
        switch (currentPage) {
            // wrapped Home and Posts in a React fragment (denoted by <> and </>),
            // which is a shorthand syntax for a container element that doesn't create an additional DOM node.
            case 'home':
                return (
                    <>
                        <Home />
                        <Posts posts={posts} />
                    </>
                );
            case 'posts':
                return <Posts posts={posts} />;
            case 'about':
                return <About />;
            case 'admin':
                return <Admin onPostSubmit={addPost} onClearList={clearPosts} />;
            case 'contact':
                return <Contact />;
            default:
                return null;
        }
    };*/

export default function App() {
    return (
        <div>
            <Header />
                <Outlet />
            <Footer />
        </div>
    );
};

