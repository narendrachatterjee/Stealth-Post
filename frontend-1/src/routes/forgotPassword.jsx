// src/components/Login.js
import React, { useState } from 'react';
import { makeForgotPasswordRequest } from '../utils/serverHelper';

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");

  const handleForgot = async () => {
    try {
        const response = await makeForgotPasswordRequest(
            '/auth/forgotPassword', { 
            Email
        });
        if(response){
            alert("Password reset link sent to your registered email");
            window.location.href = './'; 
        }

    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      // Handle error, e.g., display an error message
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Forgot Password</h1>
        <div className="mb-6">
          <label htmlFor="email" className="text-sm text-gray-600">Email</label>
          <div className="flex items-center border-2 border-gray-300 rounded-md p-3">
            <input
              id="email"
              className="w-full focus:outline-none"
              type="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className='flex' >
          <div className="flex space-x-2">
            <div className="">
              <a href="./login" className="text-blue-500">Back to Login</a>
            </div>
          </div>
        </div>
        <button
          className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition-all"
          onClick={handleForgot}
        >
          Log In
        </button>
        </div>
      </div>
  );
};

export default ForgotPassword;
