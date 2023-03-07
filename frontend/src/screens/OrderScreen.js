import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

const OrderScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const convertToFloat = (priceString) => {
    return parseFloat(priceString.replace(/,/g, ""));
  };

  const [sdkReady, setSdkReady] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(true);
  const [paymentMessage, setPaymentMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  const razorpayOrderHandler = async (e) => {
    const orderDetails = {
      amount: order.totalPrice,
    };

    const { data: razorpayResponse } = await axios.post(
      "/api/razorpay",
      orderDetails
    );

    const options = {
      key: "rzp_test_K6ieIxH2ggaPsz", // Enter the Key ID generated from the Dashboard
      amount: razorpayResponse.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: razorpayResponse.currency,
      name: "Hendrixmart",
      description: `You're buying ${order.orderItems.length} items`,
      image: "/hendrixmartLogo",
      order_id: razorpayResponse.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: razorpaySuccessHandler,
      prefill: {
        name: order.user.name,
        email: order.user.email,
        contact: "9191919191",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const razorpaySuccessHandler = async (paymentResult) => {
    console.log("Result handler :: ", paymentResult);
    const { data } = await axios.get("/api/razorpay/verification", {
      params: {
        orderId: paymentResult.razorpay_order_id,
        paymentId: paymentResult.razorpay_payment_id,
        signature: paymentResult.razorpay_signature,
      },
    });
    const { message, success: razorpaySuccess } = data;
    console.log(message, razorpaySuccess);

    setPaymentSuccess(razorpaySuccess);
    setPaymentMessage(message);

    paymentResult.email_address = order.user.email;
    paymentResult.status = "COMPLETED";

    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = (e) => {
    dispatch(deliverOrder(orderId));
  };

  useEffect(() => {
    if (!userInfo) {
      return history.push(`/signin`);
    }

    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = RAZORPAY_SCRIPT;
      script.async = true;
      script.addEventListener("load", () => {
        setSdkReady(true);
      });
      script.onerror = () => {
        setSdkReady(false);
      };
      document.body.appendChild(script);
    };

    // if (order) {
    //   if (userInfo._id !== order.user._id && !userInfo.isAdmin) {
    //     console.log("Reached here..... sad");
    //     return history.push(`/signin`);
    //   }
    // }

    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.Razorpay) {
        loadRazorpayScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]);

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
                      Delivered on{" "}
                      {new Date(order.deliveredAt).toLocaleString()}
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

                  {!paymentSuccess && (
                    <Message variant="warning">{paymentMessage}</Message>
                  )}
                  {order.isPaid ? (
                    <Message variant="success">
                      Order paid at {new Date(order.paidAt).toLocaleString()}
                    </Message>
                  ) : (
                    <Message variant="danger">
                      Unpaid. On payment, details will be shown here.
                    </Message>
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
                    <ListGroup.Item>
                      {loadingPay && <Loader size="small" />}
                      {!sdkReady ? (
                        <Loader size="small" />
                      ) : (
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={razorpayOrderHandler}
                        >
                          Payment Button
                        </Button>
                      )}
                    </ListGroup.Item>
                  )}
                  {loadingDeliver && <Loader size="small" />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={deliverHandler}
                        >
                          Mark as Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>

              <Card className="mt-4">
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Dummy Card</Col>
                      <Col>4111 1111 1111 1111</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Dummy CVV</Col>
                      <Col>Random 3 digit number</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Dummy Exp Date</Col>
                      <Col>Any future date</Col>
                    </Row>
                  </ListGroup.Item>
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
