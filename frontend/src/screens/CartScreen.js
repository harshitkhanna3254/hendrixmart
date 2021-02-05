import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const CartScreen = () => {
  const history = useHistory();
  const { id, qty } = useParams();

  console.log(id, qty);

  return <div>Cart</div>;
};

export default CartScreen;
