import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  // console.log("guitars .... ", guitars);

  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    async function fetchGuitars() {
      const { data } = await axios.get("/api/products");
      setGuitars(data);
    }

    fetchGuitars();
  }, []);

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
