import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getTokens, saveTokens, clearTokens, authRequest } from './utils/auth';


import NavBar from './components/NavBar/NavBar';
import OpportunityForm from './components/OpportunityForm/OpportunityForm';
import OpportunityIndex from './components/OpportunityIndex/OpportunityIndex';
import OpportunityDetail from './components/OpportunityDetail/OpportunityDetail';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute/AdminProtectedRoute'; 
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminProfileView from './components/AdminProfileView/AdminProfileView';
import ContactPage from './components/ContactPage/ContactPage';

function App() {

  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const { access: token } = getTokens(); 
    if (token) {
      
      authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/profile/' })
        .then(response => {
          setUser(response.data.user); 
        })
        .catch(error => {
          clearTokens(); 
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false); 
    }
  }, []); 

  if (isLoading) {
    return <p>Loading application.</p>;
  }

  return (
    <Router>
      <NavBar user={user} setUser={setUser} /> 
      
      <Routes>
        <Route path='/' element={<Navigate to='/opportunities' replace />} />


        <Route path='/opportunities' element={<OpportunityIndex user={user} />} />
        <Route path='/opportunities/:opportunityId' element={<OpportunityDetail user={user} />} /> 
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login setUser={setUser} />} />

        <Route path='/contact' element={<ContactPage />} />

        <Route element={<AdminProtectedRoute user={user} />}>
        <Route path='/opportunities/new' element={<OpportunityForm />} />
        <Route path='/opportunities/:opportunityId/edit' element={<OpportunityForm />} />    
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        
        <Route path='/admin/profile/:profileId' element={<AdminProfileView />} />
        </Route>
        
        <Route element={<ProtectedRoute user={user} />}>
        <Route path='/profile' element={<ProfilePage />} />
        </Route>
        
    </Routes>
    </Router>
  );
}

export default App;