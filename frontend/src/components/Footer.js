import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center">
            Copyright &copy; HendrixMart by Harshit Khanna
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
