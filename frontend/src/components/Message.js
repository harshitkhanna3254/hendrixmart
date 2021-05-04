import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children, header }) => {
  return (
    <Alert variant={variant}>
      {header && <Alert.Heading>Alert!</Alert.Heading>}
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
