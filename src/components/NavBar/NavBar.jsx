import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (

    <nav className="navbar-container">
      <Link className="nav-link" to="/opportunities">
        All Opportunities
      </Link>
      <Link className="nav-link" to="/opportunities/new">
        Add Opportunity
      </Link>
    </nav>
  );
}

export default NavBar;