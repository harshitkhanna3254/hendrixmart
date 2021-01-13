import React from "react";
import { Col, Row } from "react-bootstrap";
import { guitars } from "../guitars";
import Product from "../components/Product";

const HomeScreen = () => {
  console.log("guitars .... ", guitars);
  return (
    <>
      <Row>
        {guitars.map((guitar) => (
          <Col key={guitar._id} sm={12} md={6} lg={4} xl={3}>
            <Product guitar={guitar} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
