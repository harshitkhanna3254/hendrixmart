import React, { useEffect } from "react";
import { Button, Col, Image, ListGroup, Row, Card } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductDetails,
  listProductDetails,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  var { loading, guitar, error } = useSelector((state) => state.productDetails);
  console.log(guitar);
  // console.log(history.location.state.data);
  // const guitar = {};
  useEffect(() => {
    if (!history.location.state) {
      console.log("inside dispatch");
      dispatch(listProductDetails(id));
    } else {
      console.log("in else block");
      dispatch(listProductDetails(id));
    }
    // console.log(history);
    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, history.location.state, id]);

  console.log("After useEffect");

  return (
    <>
      <Link
        to={{
          pathname: "/",
        }}
      >
        <Button className="my-3">Go Back</Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={guitar.image} alt={guitar.name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3 className="h3size">{guitar.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={guitar.rating} numReviews={guitar.numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={3}>
                    <span className="font-weight-bold">Color:</span>
                  </Col>
                  <Col md={9}>
                    <strong>{guitar.color}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <span className="font-weight-bold">Description:</span>{" "}
                  {guitar.description}
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>&#8377;{guitar.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      {guitar.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button disabled={guitar.countInStock === 0} block>
                    Add to Cart
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

export default ProductScreen;
