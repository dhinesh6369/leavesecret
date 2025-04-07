import React from "react";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const ContactHR = () => {
  return (
    <>
      <NavbarComponent isAuthenticated={true} isAdmin={false} />
      <Container className="my-4">
        <Card className="p-4">
          <h2 className="text-center mb-4">📞 Contact HR Department</h2>
          
          <p className="text-muted text-center">
            Need assistance? Feel free to reach out to our HR team for any leave-related or work-related queries.
          </p>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>HR Manager:</strong> Admin
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> admin@gmail.com
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Phone:</strong> +91 98765 43210
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Office Hours:</strong> Monday - Friday (9 AM - 6 PM)
            </ListGroup.Item>
          </ListGroup>

          <div className="text-center mt-4">
            <Button variant="primary" href="mailto:hr@company.com">
              📩 Send an Email
            </Button>
          </div>
        </Card>
      </Container>
      <FooterComponent />
    </>
  );
};

export default ContactHR;
