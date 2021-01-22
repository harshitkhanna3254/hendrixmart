import React from "react";
import { Button, Col, Image, ListGroup, Row, Card } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = () => {
  // const { id } = useParams();
  const history = useHistory();

  const guitar = history.location.state.data;
  console.log(history);

  return (
    <>
      <Link
        to={{
          pathname: "/",
        }}
      >
        <Button className="my-3">Go Back</Button>
      </Link>
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
    </>
  );
};

export default ProductScreen;
