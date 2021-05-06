import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const convertToFloat = (priceString) => {
    return parseFloat(priceString.replace(/,/g, ""));
  };

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    success: successPay,
    loading: loadingPay,
    error: errorPay,
  } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      // console.log(clientId);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    addPayPalScript();

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <>
      {loading ? (
        <Loader size="large" />
      ) : error ? (
        <Message variant="danger" header>
          {error}
        </Message>
      ) : (
        <>
          <h1 style={{ display: "inline" }}>Order: </h1>
          <h2 style={{ display: "inline" }}>{order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{" "}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}{" "}
                    {order.shippingAddress.pinCode}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on ${order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment</h2>
                  <Row>
                    <Col md={3}>
                      <p>Method: {order.paymentMethod}</p>
                    </Col>
                    <Col>
                      <p>Coupon: N/A</p>
                    </Col>
                  </Row>

                  {order.isPaid ? (
                    <Message variant="success">
                      Order paid at ${order.paidAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Unpaid</Message>
                  )}
                </ListGroup.Item>

                <ListGroupItem>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item) => (
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
                      <Col>
                        &#8377;{order.itemsPrice.toLocaleString("hi-IN")}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>&#8377;{order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax (1.5%)</Col>
                      <Col>&#8377;{order.taxPrice.toLocaleString("hi-IN")}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>
                        &#8377;{order.totalPrice.toLocaleString("hi-IN")}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>Payment Button</ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
