import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../assets/css/header.css';


const Header = () => {
  return (
    <header className="header">
      <div className="header-content" style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 20px',
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo + Navigation */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="header-logo">AT-Forum</div>
          <nav style={{ marginLeft: '2rem', display: 'flex' }}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="project" className="nav-link">Project</Link>
            <Link to="contact" className="nav-link">Contact</Link>
            <Link to="more" className="nav-link">More</Link>
          </nav>
        </div>

        {/* Search + Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <FaSearch style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999',
              fontSize: '0.9rem'
            }} />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
          </div>
          <button className="signup-btn">Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
