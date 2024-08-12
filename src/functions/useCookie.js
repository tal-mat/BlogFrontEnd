import { useState} from "react";
import Cookies from 'js-cookie';

// Custom hook to manage a cookie value
const useCookie = (cookieName) => {
    // Retrieve initial value from the cookie (if it exists)
    const initialValue = Cookies.get(cookieName) || '';

    // State to hold the current cookie value
    const [cookieValue, setCookieValue] = useState(initialValue);

    // Function to update the cookie value
    const updateCookieValue = (newValue) =>
    {
        // Update the cookie value in the browser
        Cookies.set(cookieName, newValue);

        // Update the state with the new cookie value
        setCookieValue(newValue);
    }

    // Function to remove the cookie
    const removeCookie = () => {
        // Remove the cookie from the browser
        Cookies.remove(cookieName);

        // Update the state to reflect the removal
        setCookieValue('');
    }

    return [cookieValue, updateCookieValue, removeCookie];
};

export default useCookie;