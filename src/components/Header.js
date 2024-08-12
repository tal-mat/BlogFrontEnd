import React, { useContext, useState, useEffect } from "react";
import personallyLogo from '../images/personally-logo.svg';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import '../styles/Header.css';
import { AuthContext } from "../providers/auth-provider";


const Header = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const signIn = authContext?.signIn;
  const signOut = authContext?.signOut;

  const [userGreeting, setUserGreeting] = useState(null);
  const [loginBtnText, setLoginBtnText] = useState("Log In");
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    updateGreetingAndButtonText(user);
    fetchAdminStatus();
  }, [user])


  const updateGreetingAndButtonText = (user) => {
    if (user) {
      setUserGreeting(`Hello ${user.firstName}`);
      setLoginBtnText("Log Out");
    } else {
      setUserGreeting(null);
      setLoginBtnText("Log In");
    }
  };
  const fetchAdminStatus = () => {
    fetch('http://127.0.0.1:4000/admin', {
      method: 'GET',
      credentials: 'include'
    })
        .then(response => {
          if (response.ok) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
            updateGreetingAndButtonText(user);
        })
        .catch(error => {
          console.error('Error fetching admin status:', error);
        });
  };


    const handleLoginClick = () => {
      console.log("handleLoginClick: ", user);
      if (user) {
      // User is already logged in, so log them out
      signOut();
    } else {
      // User is not logged in, initiate the login process
        signIn()
            .then(() => {
              // Handle successful sign-in
              console.log("User signed in successfully");
            })
            .catch((error) => {
              // Handle sign-in error
              console.error("Error signing in:", error);
            });
    }
  };

  return (
      <header>
        <nav className="header-nav">
          <img src={personallyLogo} alt="Personally Logo" className="icon" />
          <span className="userSpanName">{userGreeting}</span>
          <ul className="ul-nav">
            <li className="li-nav">
              <Link to="/" className="link-nav">Home</Link>
            </li>
            <li className="li-nav">
              <Link to="/posts" className="link-nav">Posts</Link>
            </li>
            <li className="li-nav">
              <Link to="/about" className="link-nav">About</Link>
            </li>
            <li className="li-nav">
              <Link to="/contact" className="link-nav">Contact</Link>
            </li>
            {isAdmin && (
                <li className="li-nav">
                  <Link to="/admin" className="link-nav">Admin</Link>
                </li>
            )}
          </ul>
          <HashLink smooth to="#subscribe" className="link-nav">
            <button className="submitBtn" type="button">Subscribe</button>
          </HashLink>
          {/* Conditionally render Login button based on user existence */}
          {user ? (
              <button className="submitBtn" type="button" onClick={handleLoginClick}>
                {loginBtnText}
              </button>
          ) : (
              <Link to="/login" className="link-nav">
                <button className="submitBtn" type="button">
                  {loginBtnText}
                </button>
              </Link>
          )}
        </nav>
      </header>
  );
};

export default Header;
