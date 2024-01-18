import React, { useState, useEffect} from 'react';

const Navbar = () =>{

    const [userName, setUserName] = useState('');

    const removeCookie = (cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      };

    const logout = async () => {
        try {
            localStorage.removeItem('Email');
            localStorage.removeItem('User');
            removeCookie('Token');
            window.location.reload();

            // Handle other cases where the response or data is not as expected
        } catch (error) {
          console.error(error.response ? error.response.data : error.message);
          // Handle error, e.g., display an error message
        }
    };

    useEffect(() => {
        // Retrieve user name from local storage
        const storedUserName = localStorage.getItem('User');
    
        // Set the user name in the state
        setUserName(storedUserName); // Use an empty string as a default if it's not present in local storage
      }, []);

   return (
    <nav className="bg-black p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white">Stealth Post</div>
        <div className="flex items-center">
          <span className="text-white mr-2">{userName} </span>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>
    </div>
  </nav>
)}
export default Navbar;

