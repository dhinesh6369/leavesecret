import React, { useState } from "react";
import { Container, Form, Button, Modal, Dropdown, Table } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import "./EmployeeHolidays.css";

const EmployeeHolidays = () => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([]); // Stores leave history
  const [showHistoryModal, setShowHistoryModal] = useState(false); // Modal for leave history

  // Get employee ID from localStorage
  const empId = localStorage.getItem("empId");

  // Handle Leave Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!leaveType || !startDate || !endDate || !description) {
      setShowAlert(true);
      return;
    }

    const leaveRequest = {
      leaveType,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      description,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_LEAVE}/api/leave/apply?empId=${empId}`,
        leaveRequest,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Api gateway url : "+process.env.REACT_APP_API_URL_USER);


      setResponseMessage(response.data);
      setShowModal(true);

      setLeaveType("");
      setStartDate(null);
      setEndDate(null);
      setDescription("");
    } catch (error) {
      setResponseMessage(
        error.response?.data || "Failed to apply for leave. Please try again!"
      );
      setShowModal(true);
    }
  };

  // Handle Fetching Leave History
  const fetchLeaveHistory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_LEAVE}/api/leave/history/${empId}`);
      console.log("Api gateway url : "+process.env.REACT_APP_API_URL_USER);
      setLeaveHistory(response.data);
      setShowHistoryModal(true);
    } catch (error) {
      setResponseMessage(
        error.response?.data || "Failed to fetch leave history."
      );
      setShowModal(true);
    }
  };

  return (
    <>
      <NavbarComponent isAuthenticated={true} isAdmin={false} />
      <Container className="my-5">
        <h2 className="text-center mb-5 elegant-title">Request a Leave</h2>
        <Form onSubmit={handleSubmit} className="leave-form elegant-form">
          {/* Employee ID - Read-Only */}
          <Form.Group className="mb-4">
            <Form.Label className="form-label">Employee ID</Form.Label>
            <Form.Control
              type="text"
              value={empId || "Loading..."}
              readOnly
              className="elegant-input"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="form-label">Leave Type</Form.Label>
            <Dropdown onSelect={(eventKey) => setLeaveType(eventKey)}>
              <Dropdown.Toggle variant="outline-primary" className="short-dropdown">
                {leaveType || "Select Leave Type"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Sick Leave">Sick Leave</Dropdown.Item>
                <Dropdown.Item eventKey="Annual Leave">Annual Leave</Dropdown.Item>
                <Dropdown.Item eventKey="Personal Leave">Personal Leave</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          {/* Start Date Picker */}
          <Form.Group className="mb-4">
            <Form.Label className="form-label">Start Date</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control elegant-input"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
            />
          </Form.Group>

          {/* End Date Picker */}
          <Form.Group className="mb-4">
            <Form.Label className="form-label">End Date</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="form-control elegant-input"
              dateFormat="yyyy-MM-dd"
              minDate={startDate || new Date()}
            />
          </Form.Group>

          {/* Leave Description */}
          <Form.Group className="mb-4">
            <Form.Label className="form-label">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief reason for your leave request"
              className="elegant-textarea"
            />
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit" className="submit-btn short-btn">
              Submit Request
            </Button>
            <Button variant="info" onClick={fetchLeaveHistory}>
              View Leave History
            </Button>
          </div>
        </Form>

        {/* Leave History Modal */}
        <Modal show={showHistoryModal} onHide={() => setShowHistoryModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Leave History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {leaveHistory.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave, index) => (
                    <tr key={index}>
                      <td>{leave.leaveType}</td>
                      <td>{leave.startDate}</td>
                      <td>{leave.endDate}</td>
                      <td>{leave.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No leave history found.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowHistoryModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Response Modal (Success/Failure Message) */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Leave Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{responseMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <FooterComponent />
    </>
  );
};

export default EmployeeHolidays;