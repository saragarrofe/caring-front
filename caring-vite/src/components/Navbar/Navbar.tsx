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
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="/">
          <img src="logo.png" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} className="nav-link" to="/discovrt">Discover</Nav.Link>
            <Nav.Link as={Link} className="nav-link" to="/plants">My plants</Nav.Link>
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
              <i className="bi bi-person" style={{ fontSize: '1.5rem', color: 'white'}}></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default NavbarComponent;
