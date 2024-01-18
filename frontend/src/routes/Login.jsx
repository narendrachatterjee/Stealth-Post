// src/components/Login.js
import React, { useState } from 'react';
import { makeUnauthenticatedPostRequest } from '../utils/serverHelper';
import { useCookies } from "react-cookie"

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);

  const handleLogin = async () => {
    try {
      const response = await makeUnauthenticatedPostRequest(
        '/auth/login', { 
          Email,Password
      });
      if (response) {
        const token = response.Token;
        const email = response.Email;
        const firstName = response.firstName;
        const lastName = response.lastName;
        const date = new Date();
        date.setDate(date.getDate()+1);
        setCookie("Token",token,{path:"/" , expires: date });
        localStorage.setItem('Email',email);
        localStorage.setItem('User',firstName+" "+lastName);
        alert("Logged In Successfull");
        window.location.href = './home'; 
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

  const googleAuth = () => {
    window.location.href = 'http://localhost:8080/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
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
        <div className="mb-6">
          <label htmlFor="password" className="text-sm text-gray-600">Password</label>
          <div className="flex items-center border-2 border-gray-300 rounded-md p-3">
            <input
              id="password"
              className="w-full focus:outline-none"
              type="password"
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className='flex' >
          <div className="flex space-x-2">
        
            <div className="">
              <a href="./forgotPassword" className="text-blue-500">Forgot Password?</a>
            </div>
          </div>
        </div>
        <button
          className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition-all"
          onClick={handleLogin}
        >
          Log In
        </button>
        
        <p className="text-gray-600 mt-4 text-center">
          Don't have an account? <a href="./signup" className="text-purple-500">Create an Account</a>
        </p>
        <div className="flex items-center justify-center">
          <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            onClick={googleAuth}
          >
              <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
              <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
