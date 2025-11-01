import { useState, useEffect } from 'react';
import './ProfilePage.css';
import { authRequest } from '../../utils/auth';
import ProfileSkillManager from './ProfileSkillManager'; 

function ProfilePage() {
  
  const [profileData, setProfileData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 

  async function fetchProfile() {
    try {
      const response = await authRequest({
          method: 'get',
          url: 'http://127.0.0.1:8000/api/profile/'
      });
      setProfileData(response.data); 
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Could not load profile.");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []); 

  const handleChange = (event) => {
    setProfileData({ 
        ...profileData, 
        [event.target.name]: event.target.value 
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await authRequest({
          method: 'put',
          url: 'http://127.0.0.1:8000/api/profile/',
          data: { 
              city: profileData.city, 
              specialization: profileData.specialization,
              skills: profileData.skills 
          } 
      });
      
      if (response.status === 200) {
        setSuccess("Profile updated successfully!");
        setProfileData(response.data); 
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  
  if (isLoading) {
    return <p>Loading profile.</p>;
  }
  if (error) {
    return <p className="error-message">{error}</p>;
  }
  
  if (!profileData || !profileData.user) { 
    return <p>Could not find profile data.</p>;
  }
  

  return (
    <div className="profile-container">
      <h1>{profileData.user.username}'s Profile</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="profile-info">
          <p><strong>Email:</strong> {profileData.user.email}</p>
          
          <div className="form-group">
            <label htmlFor="city"><strong>City:</strong></label>
            <input 
              type="text" name="city" id="city"
              value={profileData.city || ''} 
              onChange={handleChange}
              placeholder="e.g., Riyadh"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="specialization"><strong>Specialization:</strong></label>
            <input 
              type="text" name="specialization" id="specialization"
              value={profileData.specialization || ''} 
              onChange={handleChange}
              placeholder="e.g., Web Developer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills"><strong>My Skills:</strong></label>
            <textarea 
              name="skills" 
              id="skills"
              value={profileData.skills || ''} 
              onChange={handleChange}
              placeholder="e.g., JavaScript, Python, First Aid..."
            />
          </div>
        </div>
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

       
        <button type="submit" className="submit-btn">Save Changes</button>
      </form>


      <ProfileSkillManager 
        profile={profileData} 
        setProfileData={setProfileData} 
      />
    </div>
  );
}
export default ProfilePage;