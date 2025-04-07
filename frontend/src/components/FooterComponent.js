import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const FooterComponent = () => {
  return (
    <Navbar bg="primary" variant="dark" fixed="bottom">
      <Container>
        <Navbar.Text className="m-auto text-white">
          © 2025 Leave Management System. All rights reserved.
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default FooterComponent;