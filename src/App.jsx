import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router';


import OpportunityIndex from './components/OpportunityIndex/OpportunityIndex';
import OpportunityDetail from './components/OpportunityDetail/OpportunityDetail';

function App() {

  
  async function makeRequest() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  
  async function makeRequest() {
      const response = await axios.get('http://127.0.0.1:8000/api/home/');
      console.log("GET Test:", response.data);
  }

  return (
    <Router>
      <Routes> 
        <Route path='/opportunities' element={<OpportunityIndex />} />
        <Route path='/opportunities/:opportunityId' element={<OpportunityDetail />} />
        
      </Routes>
    </Router>
  );
}
export default App;
