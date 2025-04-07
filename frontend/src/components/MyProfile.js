import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import './MyProfile.css';
import EmployeeHolidays from './EmployeeHolidays'; 

const MyProfile = () => {
  const [employeeDetails, setEmployeeDetails] = useState(null);

  useEffect(() => {
    const empId = localStorage.getItem('empId'); 

    if (!empId) {
      console.warn('Employee is not logged in.');
      return;
    }

    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_USER}/api/employees/employee-details/${empId}`);
        console.log("Api gateway url : "+process.env.REACT_APP_API_URL_USER);
        if (response.status === 200 && response.data) {
          setEmployeeDetails(response.data);
        } else {
          console.warn('No employee data found for this empId');
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, []);

  return (
    <>
      <NavbarComponent isAuthenticated={true} isAdmin={false} />
      <Container className="my-5">
        <h2 className="text-center mb-4">My Profile</h2>
        {employeeDetails ? (
          <Card className="profile-card">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Employee ID:</strong> {employeeDetails.empId}</p>
                  <p><strong>Name:</strong> {employeeDetails.name}</p>
                  <p><strong>Email:</strong> {employeeDetails.email}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Department:</strong> {employeeDetails.dept}</p>
                  <p><strong>Position:</strong> {employeeDetails.position}</p>
                  <p><strong>Joining Date:</strong> {employeeDetails.joiningDate}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <p className="text-center">Loading employee details...</p>
        )}
      </Container>
      <FooterComponent />
    </>
  );
};

export default MyProfile;