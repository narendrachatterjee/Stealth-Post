import React, { useState, useEffect } from 'react';
import { makeUnauthenticatedPostRequest, makeUnauthenticatedGetRequest } from '../utils/serverHelper';
import Navbar from '../components/navbar';
import userImage from '../assets/user.png';
import io from 'socket.io-client';

const Home = () => {
    const [content, secretMessage] = useState("");
    const email = localStorage.getItem('Email');
    const [data, setData] = useState([]);

    // Connect to WebSocket server
    const socket = io('https://stealthpost.netlify.app'); // Change the URL based on your server setup

    const fetchData = async () => {
        try {
            const response = await makeUnauthenticatedGetRequest('/message/retrieve');
            setData(response || []); // Provide a default empty array if response is falsy
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();

        // Listen for real-time updates
        socket.on('messageUpdated', () => {
            fetchData();
        });

        return () => {
            // Disconnect the socket when the component unmounts
            socket.disconnect();
        };
    }, [socket]);

    const onPost = async () => {
      try {
          const sender = localStorage.getItem('Email');
          const timestamp = Date.now();
          const response = await makeUnauthenticatedPostRequest(
              '/message/post', {
                  content,
                  sender
              }
          );
          if (response) {
              socket.emit('messageUpdated'); // Notify other clients about the update
              secretMessage(""); // Clear the input field
              setData(prevData => [...prevData, response]); // Update local state with the new message
          }
      } catch (error) {
          console.error(error.response ? error.response.data : error.message);
      }
  };  

    return (
        <div>
            <div>
                <Navbar />
            </div>
          
            <div className="flex h-screen bg-black">
              <div className="w-1/2 bg-gray-900 p-6 max-h-screen overflow-y-scroll scrollbar-thumb-grey-700 default-bottom">
              <h1 className="text-3xl font-bold mb-4 text-white">World's Secrets</h1>
                {data.slice().reverse().map(item => (
                    <div className="bg-white rounded-lg mb-4 p-2" key={item._id}>
                        <div className="flex items-start">
                            <img
                                src={userImage}
                                alt="avatar"
                                className="h-8 w-8 mr-2 rounded-full"
                            />
                            <span className='text-xs font-bold hidden lg:block mt-2'>Anonymous User</span>
                        </div>
                        <p className="text-lg font-medium ml-16">{item.content}</p>
                    </div>
                ))}
              </div>
                <div className="w-1/2 bg-gray-1000 p-6">
                    <h1 className="text-xl font-bold mb-4 text-white">Enter your Secret Message</h1>
                    <div className="flex flex-col overflow-y-auto">
                        <textarea
                            className="w-full h-80 border border-gray-300 p-2 rounded-lg mb-4"
                            placeholder='Enter Your Secret'
                            value={content}
                            onChange={(e) => secretMessage(e.target.value)}
                        ></textarea>
                        <button
                            className="rounded-3xl px-6 py-2 text-3xl font-medium uppercase text-white align-centerself-start"
                            onClick={onPost}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
