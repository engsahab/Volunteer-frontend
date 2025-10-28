import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import './OpportunityIndex.css';

function OpportunityIndex() {
  const [opportunities, setOpportunities] = useState([]);

  async function getAllOpportunities() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/opportunities/');
      console.log(response.data);
      setOpportunities(response.data);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  }

  useEffect(() => {
    getAllOpportunities();
  }, []);

  return (
    
    <div className="index-container"> 
      
      <h1>All Opportunities</h1>

      <div className="opportunities-list">
        {
          opportunities.length
            ?
            opportunities.map((opportunity) => {
              return (
                <Link to={`/opportunities/${opportunity.id}`} key={opportunity.id}>
                  <div className="opportunity-card">
                    <h2>{opportunity.title}</h2>
                    <p>{opportunity.description.substring(0, 100)}...</p> 
                  </div>
                </Link>
              );
            })
            :
            <h2>No Opportunities Found</h2>
        }
      </div> 
      
    </div> 
  );
}

export default OpportunityIndex;