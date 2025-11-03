import { useEffect, useState } from 'react';
import { authRequest } from '../../utils/auth';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

import './OpportunityDetail.css'; 
import ApplicationForm from '../ApplicationForm/ApplicationForm'; 
import '../ApplicationForm/ApplicationForm.css'; 

function OpportunityDetail({ user }) {
  const { opportunityId } = useParams();
  const [opportunity, setOpportunity] = useState({});
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();



  async function getSingleOpportunity() {
  try {
    const response = await axios.get(
        `http://127.0.0.1:8000/api/opportunities/${opportunityId}/`
    );
    console.log(response.data);
    setOpportunity(response.data);
  } catch (error) {
    console.log(error);
    setErrors(error.message);
  }
}

  useEffect(() => {
    getSingleOpportunity();
  }, [opportunityId]);
  
  function handleApplicationSubmit(newApplication) {
    setOpportunity(prevOpportunity => ({
      ...prevOpportunity,

      applications: [...(prevOpportunity.applications || []), newApplication] 
    }));
  }


  async function handleDelete() {
    
    if (!window.confirm("Are you sure you want to delete this opportunity?")) {
      return; 
    }

    try {
      await authRequest({
        method: 'delete',
        url: `http://127.0.0.1:8000/api/opportunities/${opportunityId}/`
      });

      navigate('/opportunities');
    } catch (error) {
      console.error("Error deleting opportunity:", error);
      setErrors("Failed to delete the opportunity.");
    }
  }

  if (errors) {
    return <h3>{errors}</h3>;
  }

  return (
    <div className="opportunity-detail-container">
      
      <h1>{opportunity.title}</h1>
      <div className="opportunity-info">
        <p><strong>Date:</strong> {opportunity.date}</p>
        <p><strong>Location:</strong> {opportunity.location}</p>
      </div>

      <p className="opportunity-description">{opportunity.description}</p>
      

       <div className="skills-section">
        <h3>Required Skills:</h3>
        <p>{opportunity.skills_list || 'No specific skills required.'}</p>
      </div>


        {user && !user.is_staff && (
          
          <div className="applications-section">
            
            
            <h3>Your Submitted Applications:</h3>
            {
              opportunity.applications && opportunity.applications.length > 0
                ?
                opportunity.applications.map(app => (
                  <div key={app.id} className="application-item">
                    <p><strong>Status:</strong> {app.status}</p>
                    <p><strong>Applied At:</strong> {new Date(app.applied_at).toLocaleDateString()}</p>
                  </div>
                ))
                :
                <p>No applications submitted yet.</p>
            }


            <ApplicationForm 
             opportunityId={opportunityId} 
             onApplicationSubmit={handleApplicationSubmit}
            />
          </div>
        )}
       
    {user && user.is_staff && (

        <div className="admin-actions">
         
          <Link to={`/opportunities/${opportunity.id}/edit`} className="edit-link"> 
            Edit {opportunity.title}
          </Link>
          

          <button onClick={handleDelete} className="delete-button">
            Delete Opportunity
          </button>
        </div>
      )}
    
    </div>
  );
}

export default OpportunityDetail;