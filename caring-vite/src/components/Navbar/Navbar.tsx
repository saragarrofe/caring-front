import React from 'react';
import './Navbar.css';  
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';


const NavbarComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(searchTerm) {
      navigate(`/plant?search=${searchTerm}`);
    }
  };

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

export default NavbarComponent;
