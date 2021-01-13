import React from "react";
import { useParams, useHistory } from "react-router-dom";

const ProductScreen = () => {
  const { id } = useParams();
  const history = useHistory();
  console.log(history);
  return <div>Product Screen {id}</div>;
};

export default ProductScreen;
