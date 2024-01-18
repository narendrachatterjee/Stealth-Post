import React, { useState } from 'react';
import { makeUnauthenticatedPostRequest } from '../utils/serverHelper';

const Signup = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");

  const handleSignup = async () => {
    try {
      const response = await makeUnauthenticatedPostRequest(
        '/auth/signup', { 
          Email,Password,firstName,lastName
      });
  
      if (response) {
        alert("User Created");
        window.location.href = './login'; 
        // Handle success, e.g., redirect to a login page
      } else {
        if(response.error){
          console.log(response.error);
        }
        console.error('Response or response.data is undefined.');
        // Handle other cases where the response or data is not as expected
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <input
          className="w-full border p-2 mb-4"
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-6"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFName(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-6"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLName(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-6"
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <p className="text-gray-600 mt-4 text-center">
          Already have an account? <a href="./" className="text-purple-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;