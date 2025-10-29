import { useState } from 'react';
import axios from 'axios';
import './ApplicationForm.css'; 


function ApplicationForm({ opportunityId, onApplicationSubmit }) {

  
  const [status, setStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = { status: status }; 
      const response = await axios.post(
        `http://127.0.0.1:8000/api/opportunities/${opportunityId}/applications/`, 
        formData
      );

      if (response.status === 201) {
        onApplicationSubmit(response.data);
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      setError("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <h4>Apply Now!</h4>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="submit-btn-small" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

export default ApplicationForm;