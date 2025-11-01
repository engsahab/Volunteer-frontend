import { useEffect, useState } from 'react';
import { authRequest } from '../../utils/auth';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import './OpportunityDetail.css'; 
import SkillList from '../SkillList/SkillList';
import ApplicationForm from '../ApplicationForm/ApplicationForm'; 
import '../ApplicationForm/ApplicationForm.css'; 

function OpportunityDetail({ user }) {
  const { opportunityId } = useParams();
  const [opportunity, setOpportunity] = useState({});
  const [errors, setErrors] = useState(null);

  async function getSingleOpportunity() {
  try {

    const response = await authRequest({
        method: 'get',
        url: `http://127.0.0.1:8000/api/opportunities/${opportunityId}/`
    });
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
      

      <SkillList 
        opportunity={opportunity} 
        setOpportunity={setOpportunity} 
        user={user}
      />

      <div className="applications-section">
        <h3>Applications Received:</h3>
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
      </div>
      
           {user && !user.is_staff && (
           <ApplicationForm 
           opportunityId={opportunityId} 
           onApplicationSubmit={handleApplicationSubmit}
                                                         />
          )}    
     {user && user.is_staff && (
        <Link to={`/opportunities/${opportunity.id}/edit`} className="edit-link"> Edit {opportunity.title}</Link>
      )}
    
    </div>
  );
}

export default OpportunityDetail;