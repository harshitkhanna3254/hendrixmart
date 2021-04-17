import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ size }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      className={`round-spinner-${size}`}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
