import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import './OpportunityForm.css';

function OpportunityForm() {
  const navigate = useNavigate();
  const { opportunityId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);      

  
  useEffect(() => {

    if (opportunityId) {
      setIsLoading(true);
      async function fetchOpportunity() {
        try {
          
          const response = await axios.get(`http://127.0.0.1:8000/api/opportunities/${opportunityId}/`);

          setFormData(response.data);
          setError(null);
        } catch (err) {
          console.error("Error fetching opportunity:", err);
          setError("Could not load opportunity data."); 
        } finally {
            setIsLoading(false);
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
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (opportunityId) {

        response = await axios.put(`http://127.0.0.1:8000/api/opportunities/${opportunityId}/`, formData);
      } else {

        response = await axios.post('http://127.0.0.1:8000/api/opportunities/', formData);
      }

      
      if (response.status === 200 || response.status === 201) {
          navigate(`/opportunities/${response.data.id}`); 
      } else {
          setError("An unexpected error occurred.");
      }

    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to save opportunity. Please check your input.");
    } finally {
        setIsLoading(false);
    }
  }

  if (isLoading && opportunityId) {
      return <p>Loading opportunity data...</p>;
  }

  return (
    <div className="form-container">
      <h1>{opportunityId ? "Edit Opportunity" : "Add an Opportunity"}</h1>
      
      {error && <p className="error-message">{error}</p>} 

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
          <label htmlFor="date">Date</label>
          <input value={formData.date} onChange={handleChange} type="date" id="date" name="date" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea value={formData.description} onChange={handleChange} id="description" name="description" required />
        </div>
        <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default OpportunityForm;