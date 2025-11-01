import { authRequest } from '../../utils/auth';
import '../SkillList/SkillList.css'; 

function ProfileSkillManager({ profile, setProfileData }) {

  
  async function associateSkill(skillId) {
    try {
      
      await authRequest({
        method: 'patch',
        url: `http://127.0.0.1:8000/api/profile/associate-skill/${skillId}/`
      });


       const updatedProfile = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/profile/` });
       setProfileData(updatedProfile.data);

    } catch (error) {
      console.error("Error associating skill:", error);
    }
  }

  
  async function desociateSkill(skillId) {
    try {
      
      await authRequest({
        method: 'post',
        url: `http://127.0.0.1:8000/api/profile/desociate-skill/${skillId}/`
      });

       const updatedProfile = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/profile/` });
       setProfileData(updatedProfile.data);

    } catch (error) {
      console.error("Error desociating skill:", error);
    }
  }

  if (!profile || !profile.skills_profile_has || !profile.skills_profile_does_not_have) {
    return <p>Loading skills.</p>;
  }

  return (
    <div className="skills-management">
      <div className="skills-column">
        <h3>My Skills:</h3>
        {profile.skills_profile_has.length > 0 ? (
          <ul>
            {profile.skills_profile_has.map(skill => (
              <li key={skill.id}>
                {skill.name}
                <button onClick={() => desociateSkill(skill.id)} className="skill-btn remove">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no skills added.</p>
        )}
      </div>

      <div className="skills-column">
        <h3>Available Skills to Add:</h3>
        {profile.skills_profile_does_not_have.length > 0 ? (
          <ul>
            {profile.skills_profile_does_not_have.map(skill => (
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

export default ProfileSkillManager;