import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; 

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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

      const response = await axios.post('http://127.0.0.1:8000/api/signup/', formData);

      if (response.status === 201) {

        navigate('/login');
      }
    } catch (err) {
      console.error('Signup Error:', err.response.data);
      setError(err.response.data.error || 'Failed to create account.');
    }
  };

  return (
    <div className="form-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input value={formData.username} onChange={handleChange} id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input value={formData.email} onChange={handleChange} type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input value={formData.password} onChange={handleChange} type="password" id="password" name="password" required />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;