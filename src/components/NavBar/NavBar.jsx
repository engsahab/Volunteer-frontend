import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import LogOutButton from '../LogOutButton/LogOutButton';


function NavBar({ user, setUser }) {
return (
    <nav className="navbar-container">
     
      <Link className="nav-link" to="/opportunities">
        All Opportunities
      </Link>


      {user ? (
        <>
          
          {user.is_staff && (
            <>
              <Link className="nav-link" to="/opportunities/new">
                Add Opportunity
              </Link>
              <Link className="nav-link" to="/admin/dashboard">
                Admin Dashboard
              </Link>
            </>
          )}
          

          <div className="user-actions"> 

         <Link className="nav-link" to="/contact">
          Contact Us
         </Link>

            {user && !user.is_staff && (
              <Link className="nav-link" to="/profile">
                My Profile
             </Link>
            )}
            

            <LogOutButton setUser={setUser} /> 
          </div> 
        </>
      ) : (
        <>
         
          <div className="auth-links">
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
            <Link className="nav-link" to="/contact">
            Contact Us
           </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;