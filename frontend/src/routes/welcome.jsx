import React from 'react';

const handleSubmit = () =>{
    
    window.location.href = './login'; 
}

const WelcomeHomepage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">    
    <h1 className="text-4xl font-bold  text-white mb-6">Stealth Post</h1>
    <p className="text-xl text-gray-200">Explore My Project!</p>
    <button className="mt-8 px-6 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
        onClick={handleSubmit}
    >Let's Go</button>
  </div>
);

export default WelcomeHomepage;