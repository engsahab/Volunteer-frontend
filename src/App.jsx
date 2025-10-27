import React, { useEffect } from 'react';
import axios from 'axios';

function App() {

  
  async function makeRequest() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  
  async function makePostRequest() {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/', {
        messageFromAppJsx: 'Hey, I made a post request! >>'
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // تشغيل الطلبات عند تحميل المكون
  useEffect(() => {
    makeRequest();
    makePostRequest();
  }, []);

  return (
    <div>
      <h1>Welcome to The Volunteer </h1>
    </div>
  );
}

export default App;
