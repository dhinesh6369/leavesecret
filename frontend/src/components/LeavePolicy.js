import React from "react";
import { Container, Card } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const LeavePolicy = () => {
  return (
    <>
      <NavbarComponent isAuthenticated={true} isAdmin={false} />
      <Container className="my-4">
        <Card className="policy-card p-4">
          <h2 className="text-center mb-4">Company Leave Policies</h2>
          
          <h4>1️⃣ Sick Leave</h4>
          <p>Employees are entitled to **5 days of paid sick leave** per year. A medical certificate is required if the leave exceeds 2 days.</p>

          <h4>2️⃣ Annual Leave</h4>
          <p>Employees can take **15 days of annual leave** per year. Leave should be requested at least **7 days in advance**.</p>

          <h4>3️⃣ Personal Leave</h4>
          <p>Up to **3 days** of personal leave can be taken for emergencies or personal matters.</p>

          <h4>4️⃣ Maternity & Paternity Leave</h4>
          <p>Female employees are entitled to **3 months of maternity leave**, and male employees can take **7 days of paternity leave**.</p>

          <h4>5️⃣ Unpaid Leave</h4>
          <p>If all paid leave is used, employees can request unpaid leave with manager approval.</p>

          <h4>📌 Note:</h4>
          <p>All leave requests are subject to manager approval and company policies.</p>
        </Card>
      </Container>
      <FooterComponent />
    </>
  );
};

export default LeavePolicy;
