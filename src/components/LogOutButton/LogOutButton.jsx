import { useNavigate } from 'react-router-dom';

import { clearTokens } from '../../utils/auth'; 
import './LogOutButton.css';

function LogOutButton({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    clearTokens(); 

    setUser(null);
    navigate('/login');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Log Out
    </button>
  );
}

export default LogOutButton;