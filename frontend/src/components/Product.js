import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "./Rating";

const Product = ({ guitar }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link
        to={{
          pathname: `/product/${guitar._id}`,
          state: {
            data: guitar,
          },
        }}
      >
        <Card.Img variant="top" src={guitar.image} />
      </Link>

      <Card.Body>
        <Link
          to={{
            pathname: `/product/${guitar._id}`,
            state: {
              data: guitar,
            },
          }}
        >
          <Card.Title as="div">
            <strong>{guitar.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating rating={guitar.rating} numReviews={guitar.numReviews} />
          </div>
        </Card.Text>

        <Card.Text as="h3" className="rating">
          <span style={{ fontSize: "50%" }}>Price:</span>&#8377;{guitar.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
