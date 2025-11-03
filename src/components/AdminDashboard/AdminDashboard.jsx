import { useState, useEffect } from 'react';
import { authRequest } from '../../utils/auth';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; 

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    async function fetchAllApplications() {
      try {
        const response = await authRequest({
          method: 'get',
          url: 'http://127.0.0.1:8000/api/admin/applications/'
        });
        setApplications(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load applications.");
        setIsLoading(false);
      }
    }
    fetchAllApplications();
  }, []);

 
  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      
      const response = await authRequest({
        method: 'put',
        url: `http://127.0.0.1:8000/api/applications/${appId}/`,
        data: { status: newStatus }
      });

      setApplications(prevApps => 
        prevApps.map(app => 
          app.id === appId ? response.data : app
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  if (isLoading) return <p>Loading dashboard.</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - All Applications</h1>

      <table className="applications-table">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Opportunity</th>
            <th>Status</th>
            <th>Applied On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map(app => (
              <tr key={app.id}>
               
               <td>
                  {app.profile && app.profile.user ? (
                    <Link to={`/admin/profile/${app.profile.id}`} className="applicant-link">
                      {app.profile.user.username}
                    </Link>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{app.opportunity ? app.opportunity.title : 'N/A'}</td>
                <td>

                  <span className={`status-badge status-${app.status}`}>
                    {app.status}
                  </span>
                </td>
                <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                <td>

                  {app.status === 'pending' && (
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleUpdateStatus(app.id, 'accepted')}
                        className="btn-accept"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(app.id, 'rejected')}
                        className="btn-reject"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No applications found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;