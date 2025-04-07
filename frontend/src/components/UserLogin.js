import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';

const UserLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL_USER}/api/employees/login`, { name, password });
      console.log("Api gateway url : "+process.env.REACT_APP_API_URL_USER);
      if (response.status === 200) {
        alert('Login successful!');
        const employee = response.data;

        localStorage.setItem('empId', employee.empId);
        localStorage.setItem('name', employee.name);
        localStorage.setItem('dept', employee.dept);

        navigate('/employee-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card style={{ width: '25rem' }} className="shadow">
          <Card.Body>
            <Card.Title className="text-center mb-4">User Login</Card.Title>

            {error && <Alert variant="danger">{error}</Alert>} {/* Show error message */}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
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

export default UserLogin;