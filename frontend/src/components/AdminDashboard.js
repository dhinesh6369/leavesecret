import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [leaveStats, setLeaveStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    leavesApplied: 0,
    leavesApproved: 0,
    leavesPending: 0,
    leavesRejected: 0,
  });

  // Fetching Employee and Leave Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employeeResponse, leaveResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL_USER}/api/employees/stats`),
          axios.get(`${process.env.REACT_APP_API_URL_LEAVE}/api/leave/stats-leave`),
        ]);

        setLeaveStats({
          totalEmployees: employeeResponse.data.totalEmployees,
          totalDepartments: employeeResponse.data.totalDepartments,
          leavesApplied: leaveResponse.data.leavesApplied,
          leavesApproved: leaveResponse.data.leavesApproved,
          leavesPending: leaveResponse.data.leavesPending,
          leavesRejected: leaveResponse.data.leavesRejected,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // Function to handle the Add Employee button click
  const handleAddEmployeeClick = () => {
    navigate('/add-employee');
  };

  // Function to update employee stats after adding employee
  const updateEmployeeStats = async () => {
    try {
      // Fetch updated employee stats
      const response = await axios.get(`${process.env.REACT_APP_API_URL_USER}/api/employees/stats`);
      console.log("Api gateway url : "+process.env.REACT_APP_API_URL_USER);
      setLeaveStats((prevStats) => ({
        ...prevStats,
        totalEmployees: response.data.totalEmployees,
        totalDepartments: response.data.totalDepartments,
      }));
    } catch (error) {
      console.error('Error fetching updated employee stats:', error);
    }
  };

  return (
    <>
      <NavbarComponent isAuthenticated={true} isAdmin={true} />
      <Container className="my-5">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleAddEmployeeClick}>
            Add Employee
          </Button>
        </div>

        <Row>
          <Col md={3}>
            <Card className="mb-4 shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>Total Employees</Card.Title>
                <Card.Text className="display-6">{leaveStats.totalEmployees}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>Total Departments</Card.Title>
                <Card.Text className="display-6">{leaveStats.totalDepartments}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>Leaves Applied</Card.Title>
                <Card.Text className="display-6">{leaveStats.leavesApplied}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>Leaves Approved</Card.Title>
                <Card.Text className="display-6">{leaveStats.leavesApproved}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Card className="mb-4 shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>Leaves Pending</Card.Title>
                <Card.Text className="display-6">{leaveStats.leavesPending}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>Leaves Rejected</Card.Title>
                <Card.Text className="display-6">{leaveStats.leavesRejected}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <FooterComponent />
    </>
  );
};

export default AdminDashboard;