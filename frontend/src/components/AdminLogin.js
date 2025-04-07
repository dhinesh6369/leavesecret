import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {    
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL_USER}/api/admin/login`, {
        username,
        password,
      });
      console.log("Api gateway url : "+process.env.REACT_APP_API_URL_USER);

      if (response.status === 200) {
        alert('Login successful!');
        navigate('/admin-dashboard');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card style={{ width: '25rem' }} className="shadow">
          <Card.Body>
            <Card.Title className="text-center mb-4">Admin Login</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}

            <input type="text" style={{ display: 'none' }} autoComplete="username" />
            <input type="password" style={{ display: 'none' }} autoComplete="current-password" />

            <Form onSubmit={handleSubmit} autoComplete="off">
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="off"
                  name="admin-user"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  name="admin-pass"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <FooterComponent />
    </>
  );
};

export default AdminLogin;