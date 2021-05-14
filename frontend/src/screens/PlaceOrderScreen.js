import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
// import { savePaymentMethod } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const convertToFloat = (priceString) => {
    return parseFloat(priceString.replace(/,/g, ""));
  };

  //Calculating prices
  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + convertToFloat(item.price) * item.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice < 500000 ? 0 : 150;
  cart.taxPrice = cart.itemsPrice * 0.015;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success, loading } = orderCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (!userInfo) {
      history.push(`/signin`);
    }

    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      {loading ? (
        <Loader size="large" />
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Address:</strong> {shippingAddress.address},{" "}
                      {shippingAddress.city}, {shippingAddress.country}{" "}
                      {shippingAddress.pinCode}
                    </p>
                  </Col>
                  <Col>
                    <h2>Payment</h2>
                    <Row>
                      <Col>
                        <span>Method: {paymentMethod}</span>
                      </Col>
                      <Col>
                        <span>Coupon: N/A</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroupItem>
                <h2>Order Items</h2>
                {cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item) => (
                      <ListGroup.Item key={item.product} className="py-1">
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            ></Image>
                          </Col>
                          <Col>
                            <Link
                              to={`/product/${item.product}`}
                              className="my-auto"
                            >
                              <strong>{item.name}</strong>
                            </Link>
                          </Col>
                          <Col md={4}>
                            <p>
                              {item.qty} x &#8377;{item.price} = &#8377;
                              {(
                                item.qty * convertToFloat(item.price)
                              ).toLocaleString("hi-IN")}
                            </p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>&#8377;{cart.itemsPrice.toLocaleString("hi-IN")}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>&#8377;{cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax (1.5%)</Col>
                    <Col>&#8377;{cart.taxPrice.toLocaleString("hi-IN")}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>&#8377;{cart.totalPrice.toLocaleString("hi-IN")}</Col>
                  </Row>
                </ListGroup.Item>
                {error && (
                  <ListGroup.Item>
                    <Row>
                      <Message variant="danger">{error}</Message>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn btn-block"
                    disabled={cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PlaceOrder;
