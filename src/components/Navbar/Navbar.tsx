import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';

export default function NavbarComponent () {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = searchTerm.trim();
    if (term) {
      navigate({ pathname: '/plant', search: `?search=${encodeURIComponent(term)}` });
    }
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        {/* Usa NavLink para evitar recarga completa y controlar 'active' en la home */}

        <Navbar.Brand as={NavLink} to="/" end>
          <img src="logo.png" alt="Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              {/* Nav.Link + as={NavLink}: aplica automáticamente la clase 'active' */}
            <Nav.Link as={NavLink} className="nav-link" to="/discover">
              Discover
            </Nav.Link>

            <Nav.Link as={NavLink} className="nav-link" to="/my-plants">
              My plants
            </Nav.Link>

            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search plants..."
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
            <Nav.Link as={Link} to="/login" className="nav-link">
              <i className="bi bi-person" style={{ fontSize: '1.5rem', color: 'white' }}></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};