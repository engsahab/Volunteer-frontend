import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authRequest } from '../../utils/auth';
import '../ProfilePage/ProfilePage.css';

function AdminProfileView() {
    const { profileId } = useParams();
    const [profileData, setProfileData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchProfile() {
        try {
            const response = await authRequest({
                method: 'get',
               
                url: `http://127.0.0.1:8000/api/admin/profile/${profileId}/` 
            });
            setProfileData(response.data); 
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching admin profile view:", err);
            setError("Could not load volunteer profile.");
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [profileId]); 

    if (isLoading) return <p>Loading volunteer profile.</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!profileData || !profileData.user) return <p>Profile data not available.</p>;

    
    return (
        <div className="profile-container">
            <h1>Volunteer Profile: {profileData.user.username}</h1>
            <div className="profile-info">
                <p><strong>Email:</strong> {profileData.user.email}</p>
                <p><strong>City:</strong> {profileData.city || 'Not specified'}</p>
                <p><strong>Specialization:</strong> {profileData.specialization || 'Not specified'}</p>
                <p><strong>Skills:</strong></p>

                <div className="form-group">
                    <textarea 
                        readOnly
                        value={profileData.skills || 'No skills listed.'}
                    />
                </div>
            </div>

        </div>
    );
}
export default AdminProfileView;