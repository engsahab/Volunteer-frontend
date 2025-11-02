import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import './OpportunityIndex.css';

function OpportunityIndex({ user }) { 
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchSubmit(event) {
    event.preventDefault();
    console.log("Searching opportunities for:", searchTerm); 
  }

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

  const filteredOpportunities = opportunities.filter(opportunity => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lowerCaseTitle = opportunity.title.toLowerCase();
    const lowerCaseLocation = opportunity.location.toLowerCase();
    
    return lowerCaseTitle.includes(lowerCaseSearchTerm) || 
           lowerCaseLocation.includes(lowerCaseSearchTerm);
  });
  
  return (
    <div className="index-container">
   <div className="welcome-hero">
      <h1>Find Your Next Opportunity to Make an Impact</h1>
      <p>Welcome to our Volunteer Hub. Explore meaningful roles, find an opportunity that interests you, and apply today to make a difference in our community.</p>
       </div>
      <h1>All Opportunities</h1>
      <div className="index-search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search by title, location..."
            className="index-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="index-search-button">
            Search
          </button>
        </form>
      </div>
      <div className="opportunities-list">
      {
          filteredOpportunities.length 
            ?
            filteredOpportunities.map((opportunity) => { 
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
            <h2>No opportunities found matching "{searchTerm}"</h2>
        }
      </div>
    </div>
  );
}
export default OpportunityIndex;
