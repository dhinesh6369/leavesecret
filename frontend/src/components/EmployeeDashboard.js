import React, { useState, useEffect } from "react";
import { Container, Table, Card, Button, Row, Col } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [employee, setEmployee] = useState({});
  const empId = localStorage.getItem("empId");
  const navigate = useNavigate();

  // Fetch Employee Details
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_USER}/api/employees/employee-details/${empId}`);
        console.log("Api gateway url : "+process.env.REACT_APP_API_URL_USER);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployeeDetails();
  }, [empId]);

  // Fetch Leave History
  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_LEAVE}/api/leave/history/${empId}`);
        console.log("Api gateway url : "+process.env.REACT_APP_API_URL_USER);
        setLeaveHistory(response.data);
      } catch (error) {
        console.error("Error fetching leave history:", error);
      }
    };
    fetchLeaveHistory();
  }, [empId]);

  // Generate Greeting Message
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getRandomQuote = () => {
    const quotes = [
      "The only way to do great work is to love what you do. – Steve Jobs",
      "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
      "Believe you can and you're halfway there. – Theodore Roosevelt",
      "Do what you love, and you'll never work a day in your life. – Confucius",
      "The secret of getting ahead is getting started. – Mark Twain",
      "Opportunities don’t happen, you create them. – Chris Grosser",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <>
      <NavbarComponent isAuthenticated={true} isAdmin={false} />
      <Container className="my-4">
        <Card className="welcome-card text-center mb-4">
          <Card.Body>
            <h2>{getGreeting()}, {employee.name || "Employee"}! 👋</h2>
            <blockquote className="mt-3 text-muted">
              <em>{getRandomQuote()}</em>
            </blockquote>
          </Card.Body>
        </Card>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="action-card" onClick={() => navigate("/holidays")}>
              <Card.Body className="text-center">
                <h5>Apply for Leave</h5>
                <p>Submit a leave request</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="action-card" onClick={() => navigate("/leave-policy")}>
              <Card.Body className="text-center">
                <h5>Leave Policies</h5>
                <p>Check company leave policies</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="action-card" onClick={() => navigate("/contact-hr")}>
              <Card.Body className="text-center">
                <h5>Contact HR</h5>
                <p>Need help? Reach out to HR</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <FooterComponent />
    </>
  );
};

export default EmployeeDashboard;