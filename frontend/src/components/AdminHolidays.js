import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import './AdminHolidays.css';

const AdminHolidays = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [dept, setDept] = useState('');

  useEffect(() => {
    const storedDept = localStorage.getItem('dept');
    if (storedDept) {
      setDept(storedDept);
    }

    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_LEAVE}/api/leave/all`);
        console.log("Api gateway url : "+process.env.REACT_APP_API_URL_USER);
        if (response.status === 200) {
          const leaveData = response.data.map((request) => {
            const startDate = new Date(request.startDate);
            const endDate = new Date(request.endDate);
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            return {
              ...request,
              days: diffDays,
              formattedStartDate: startDate.toISOString().split('T')[0],
              formattedEndDate: endDate.toISOString().split('T')[0],
            };
          });
          setLeaveRequests(leaveData);
        }
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL_LEAVE}/api/leave/update-status/${id}?status=Approved`);
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'Approved' } : request
        )
      );
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL_LEAVE}/api/leave/update-status/${id}?status=Rejected`);
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'Rejected' } : request
        )
      );
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  return (
    <>
      <NavbarComponent isAuthenticated={true} isAdmin={true} />
      <Container className="my-5">
        <h2 className="text-center mb-4">Leave Approval Requests</h2>
        {leaveRequests.length === 0 ? (
          <p className="text-center">No leave requests pending.</p>
        ) : (
          <Table striped bordered hover responsive className="leave-table">
            <thead>
              <tr>
                <th>S No</th>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Leave Type</th>
                <th>Department</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>No of Days</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request, index) => (
                <tr key={request.id}>
                  <td>{index + 1}</td>
                  <td>{request.empId}</td>
                  <td>{request.name}</td>
                  <td>{request.leaveType}</td>
                  <td>{dept || request.dept}</td>
                  <td>{request.formattedStartDate}</td>
                  <td>{request.formattedEndDate}</td>
                  <td>{request.days}</td>
                  <td>
                    {request.status === 'Approved' ? (
                      <span className="approved-text">Approved</span>
                    ) : request.status === 'Rejected' ? (
                      <span className="rejected-text">Rejected</span>
                    ) : (
                      <>
                        <button className="approve-btn" onClick={() => handleApprove(request.id)}>
                          Approve
                        </button>
                        <button className="reject-btn" onClick={() => handleReject(request.id)}>
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <FooterComponent />
    </>
  );
};

export default AdminHolidays;