import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './OpportunityForm.css'; 

function OpportunityForm() {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
     
      const response = await axios.post('http://127.0.0.1:8000/api/opportunities/', formData);
      console.log(response);

      if (response.status === 201) {
        
        navigate(`/opportunities/${response.data.id}`);
      }
    } catch (error) {
      console.error("Error creating opportunity:", error);
    }
  }

  return (
    <div className="form-container">
      <h1>Add an Opportunity</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input value={formData.title} onChange={handleChange} id="title" name="title" />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input value={formData.location} onChange={handleChange} id="location" name="location" />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input value={formData.date} onChange={handleChange} type="date" id="date" name="date" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea value={formData.description} onChange={handleChange} id="description" name="description" />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default OpportunityForm;