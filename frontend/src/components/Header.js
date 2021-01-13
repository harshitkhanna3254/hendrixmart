import React from "react";

import { LinkContainer } from "react-router-bootstrap";

import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="navheading">HendrixMart</Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link className="navlink">
                <i className="fa fa-cart-plus pr-1" aria-hidden="true"></i>Cart
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="signin">
              <Nav.Link className="navlink">
                <i className="fa fa-user pr-1" aria-hidden="true"></i>
                SignIn
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
