import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    empId: '',
    name: '',
    email: '',
    dept: '',
    position: '',
    joiningDate: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false); // To toggle success modal visibility
  const [isError, setIsError] = useState(false); // To handle error state

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the environment variable for the API URL
      const apiUrl = `${process.env.REACT_APP_API_URL_USER}/api/employees/add`;
      console.log("Api gateway url : "+process.env.REACT_APP_API_URL_USER);
      const response = await axios.post(apiUrl, employee);

      // Success: Show the success message
      setSuccessMessage(true);
      setIsError(false); // Reset error state in case of success
      setErrorMessage('');
    } catch (error) {
      // Error handling
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data); // Error message from the backend (duplicate ID or email)
        } else {
          setErrorMessage('Error adding employee: ' + (error.response.data || 'Unknown error!'));
        }
      } else {
        setErrorMessage('Network error. Please try again later.');
      }
      setSuccessMessage(false); // Hide success message if there's an error
      setIsError(true); // Set error state to true when there's an error
    }
  };

  // Function to handle the "Ok" button click to dismiss the modal and navigate
  const handleModalClose = () => {
    setSuccessMessage(false); // Close the modal
    navigate('/admin-dashboard'); // Navigate to the admin dashboard after clicking "Ok"
  };

  // Function to handle the "Close" button click for error modal
  const handleErrorClose = () => {
    setIsError(false); // Close the error modal
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} className="add-employee-card p-4 border shadow-sm">
            <h2 className="text-center mb-4">Add Employee</h2>

            {/* Employee Form */}
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Form.Group controlId="formEmpId" className="mb-3">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  type="text"
                  name="empId"
                  value={employee.empId}
                  onChange={handleChange}
                  required
                  autoComplete="new-username"
                />
              </Form.Group>

              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={employee.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group controlId="formDept" className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="dept"
                  value={employee.dept}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group controlId="formPosition" className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={employee.position}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group controlId="formJoiningDate" className="mb-3">
                <Form.Label>Joining Date</Form.Label>
                <Form.Control
                  type="date"
                  name="joiningDate"
                  value={employee.joiningDate}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Button variant="primary" type="submit" block={true}>
                Add Employee
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Success Modal */}
      <Modal show={successMessage} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Employee added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={isError} onHide={handleErrorClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleErrorClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default AddEmployee;