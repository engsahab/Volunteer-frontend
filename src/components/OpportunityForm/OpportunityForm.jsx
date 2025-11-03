import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import './OpportunityForm.css';
import { authRequest } from '../../utils/auth'; 

function OpportunityForm() {
  const navigate = useNavigate();
  const { opportunityId } = useParams(); 

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    specialization: '',
    skills_list:''
  });

  
  useEffect(() => {
    if (opportunityId) {
      async function fetchOpportunity() {
        try {
          const response = await authRequest({ 
            method: 'get',
            url: `http://127.0.0.1:8000/api/opportunities/${opportunityId}/`
          });
          setFormData(response.data); 
        } catch (error) {
          console.error("Error fetching opportunity:", error);
        }
      }
      fetchOpportunity();
    }
  }, [opportunityId]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let response;
      if (opportunityId) {
        
        response = await authRequest({
          method: 'put',
          url: `http://127.0.0.1:8000/api/opportunities/${opportunityId}/`,
          data: formData
        });
      } else {
        
        response = await authRequest({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/opportunities/',
          data: formData
        });
      }

      if (response.status === 200 || response.status === 201) {
          navigate(`/opportunities/${response.data.id}`); 
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="form-container">
     
      <h1>{opportunityId ? "Edit Opportunity" : "Add an Opportunity"}</h1>
      
      <form onSubmit={handleSubmit}>
       
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input value={formData.title} onChange={handleChange} id="title" name="title" required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input value={formData.location} onChange={handleChange} id="location" name="location" required />
        </div>
         <div className="form-group">
          <label htmlFor="specialization">Required Specialization (Optional)</label>
          <input value={formData.specialization || ''} onChange={handleChange} id="specialization" name="specialization" />
        </div>
         <div className="form-group"> <label htmlFor="skills_list">Required Skills (List them separated by comma)</label><textarea 
            value={formData.skills_list || ''} onChange={handleChange} id="skills_list" name="skills_list" placeholder="e.g., Python, Excel, First Aid"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input value={formData.date} onChange={handleChange} type="date" id="date" name="date" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea value={formData.description} onChange={handleChange} id="description" name="description" required />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default OpportunityForm;