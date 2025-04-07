import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const NavbarComponent = ({ isAuthenticated, isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Leave Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {location.pathname === '/' && (
              <>
                <Nav.Link href="/admin-login">Admin Login</Nav.Link>
                <Nav.Link href="/user-login">User Login</Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link href={isAdmin ? "/admin-dashboard" : "/employee-dashboard"}>Dashboard</Nav.Link>
                {!isAdmin && <Nav.Link href="/my-profile">My Profile</Nav.Link>}
                <Nav.Link href={isAdmin ? "/admin-holidays" : "/holidays"}>Holidays</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;