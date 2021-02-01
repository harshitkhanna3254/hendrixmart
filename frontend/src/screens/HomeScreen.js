import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const guitars = [];

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Row>
        {products.map((guitar) => (
          <Col key={guitar._id} sm={12} md={6} lg={4} xl={3}>
            <Product guitar={guitar} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
