import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router';
import './OpportunityDetail.css'; 

function OpportunityDetail() {
  const { opportunityId } = useParams();
  const [opportunity, setOpportunity] = useState({});
  const [errors, setErrors] = useState(null);

  async function getSingleOpportunity() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/opportunities/${opportunityId}/`);
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
        <h3>Skills Required:</h3>
        
        <div className="skills-list">
          {
            opportunity.skills && opportunity.skills.length > 0
              ?
              opportunity.skills.map(skill => {
                return <span key={skill.id} className="skill-tag">{skill.name}</span>;
              })
              :
              <p>No specific skills listed.</p>
}
        </div>
      </div>

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
          <Link to={`/opportunities/${opportunity.id}/edit`} className="edit-link"> Edit {opportunity.title}</Link>
    </div>
  );
}

export default OpportunityDetail;