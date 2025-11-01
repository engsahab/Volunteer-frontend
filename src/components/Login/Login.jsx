import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveTokens, getUserFromToken } from '../../utils/auth'; 
import './Login.css';


function Login({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);

      if (response.data.access) {

        const { access, refresh } = response.data;
        saveTokens(access, refresh); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        
        const profileResponse = await axios.get('http://127.0.0.1:8000/api/profile/');
        

        setUser(profileResponse.data.user); 
        
        navigate('/opportunities');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Invalid username or password.');
    }
  };


  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input value={formData.username} onChange={handleChange} id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input value={formData.password} onChange={handleChange} type="password" id="password" name="password" required />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;