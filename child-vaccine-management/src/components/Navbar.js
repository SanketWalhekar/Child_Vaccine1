import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand-link">
          <h1>Child Vaccine Management</h1>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/bookapp">Book Appointment</Link></li>

        {/* <li><Link to="/book">Book Appointment</Link></li> */}
        <li><Link to="/healthcare">Healthcare</Link></li>
        <li><Link to="/recommendation">Recommendation</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li className="navbar-auth">
              <button onClick={onLogout} className="logout-button">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-auth"><Link to="/login">Login</Link></li>
            <li className="navbar-auth"><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
