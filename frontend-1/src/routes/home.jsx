import React, { useState, useEffect } from 'react';
import { makeUnauthenticatedPostRequest } from '../utils/serverHelper';
import { makeUnauthenticatedGetRequest } from '../utils/serverHelper';
import Navbar from '../components/navbar';

const Home = () => {
    const [content, secretMessage] = useState("");
    const email = localStorage.getItem('Email');
    const [data, setData] = useState([]);
    useEffect(() => {
        // Fetch data from the server
        const fetchData = async () => {
            try {
                // Fetch data from the server
                const response = await makeUnauthenticatedGetRequest('/message/retrieve')
                // Process the response or set it to state
                setData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[]);

    const onPost = async () => {
        try {
          
          const sender = localStorage.getItem('Email');
          console.log(sender);
          const timestamp = Date.now();
          const response = await makeUnauthenticatedPostRequest(
            '/message/post', { 
              content,
              sender              
          });
          console.log("response"+response);
          if(response){
            alert("Secret Posted");
            window.location.reload();
          }
        } catch (error) {
          console.error(error.response ? error.response.data : error.message);
          // Handle error, e.g., display an error message
        }

      };

      const isEmailInArray = data.some((item) => item.sender === email);
      const placeholderText = isEmailInArray ? 'Further posting is not available as already posted once'  : 'Type your message here...';

    return(
        <div>
            <div>
                <Navbar />
            </div>
            <div className="flex h-screen bg-black">
              <div className="w-1/2 bg-gray-900 p-6 overflow-y-auto scrollbar-thumb-grey-700 default-bottom">
                <h1 className="text-3xl font-bold mb-4 text-white">Messages</h1>
                <div>
                  {data.map(item => (
                    <div  className="bg-white rounded-lg mb-4 p-2"
                      key={item._id}> 
                      <p className="text-lg font-medium">{item.content}</p><br />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/2 bg-gray-1000 p-6">
                <h1 className="text-xl font-bold mb-4 text-white">Enter your Secret Message</h1>
                <div className="flex flex-col">
                  <textarea
                    className="w-full h-80 border border-gray-300 p-2 rounded-lg mb-4"
                    disabled={isEmailInArray}
                    placeholder={placeholderText}
                    value={content}
                    onChange={(e) => secretMessage(e.target.value)}
                  ></textarea>
                  <button
                    className="rounded-3xl px-6 py-2 text-3xl font-medium uppercase text-white align-centerself-start"
                    disabled={isEmailInArray}
                    onClick={onPost}
                    
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
        </div>
    );
}
export default Home;