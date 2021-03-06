import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) history.push("/shipping");

  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push(`/signin`);
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push(`/placeOrder`);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Razorpay (Debit, Credit, UPI)"
              id="Razorpay"
              name="paymentMethod"
              value="Razorpay"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Upi (Coming soon...)"
              id="Upi"
              name="paymentMethod"
              value="Upi"
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue to Payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
