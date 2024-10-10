// src/components/Navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      {/* añadir imagen */}
      <div className="navbar-brand">
        {/* añadir logo */}
        <img src="logo.png" alt="Caring logo" className="logo" />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/discover" className="nav-link">Discover</Link>
        </li>
        <li>
          <Link to="/plants" className="nav-link">My plants</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
