import React, { useState } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push(`/placeOrder`);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item variant="info">
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.country}{" "}
                {shippingAddress.pinCode}
              </p>
            </ListGroup.Item>
            <ListGroupItem variant="success">Success</ListGroupItem>
            <ListGroupItem variant="primary">Info</ListGroupItem>
            <ListGroupItem variant="warning">Warning</ListGroupItem>
            <ListGroupItem variant="danger">Danger</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default PlaceOrder;
