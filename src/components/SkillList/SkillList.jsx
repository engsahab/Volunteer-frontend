import axios from 'axios';
import './SkillList.css';


function SkillList({ opportunity, setOpportunity }) {


  async function associateSkill(skillId) {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/opportunities/${opportunity.id}/associate-skill/${skillId}/`);

       const updatedOppResponse = await axios.get(`http://127.0.0.1:8000/api/opportunities/${opportunity.id}/`);
       setOpportunity(updatedOppResponse.data);

    } catch (error) {
      console.error("Error associating skill:", error);
    }
  }


  async function desociateSkill(skillId) {
    try {

      const response = await axios.post(`http://127.0.0.1:8000/api/opportunities/${opportunity.id}/desociate-skill/${skillId}/`);


       const updatedOppResponse = await axios.get(`http://127.0.0.1:8000/api/opportunities/${opportunity.id}/`);
       setOpportunity(updatedOppResponse.data);

    } catch (error) {
      console.error("Error desociating skill:", error);
    }
  }


  if (!opportunity || !opportunity.skills_opportunity_has || !opportunity.skills_opportunity_does_not_have) {
    return <p>Loading skills...</p>;
  }

  return (
    <div className="skills-management">
     
      <div className="skills-column">
        <h3>Skills {opportunity.title} Requires:</h3>
        {opportunity.skills_opportunity_has.length > 0 ? (
          <ul>
            {opportunity.skills_opportunity_has.map(skill => (
              <li key={skill.id}>
                {skill.name}
                <button onClick={() => desociateSkill(skill.id)} className="skill-btn remove">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No skills required yet.</p>
        )}
      </div>

      
      <div className="skills-column">
        <h3>Available Skills:</h3>
        {opportunity.skills_opportunity_does_not_have.length > 0 ? (
          <ul>
            {opportunity.skills_opportunity_does_not_have.map(skill => (
              <li key={skill.id}>
                {skill.name}
                <button onClick={() => associateSkill(skill.id)} className="skill-btn add">
                  Add
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No other skills available.</p>
        )}
      </div>
    </div>
  );
}

export default SkillList;