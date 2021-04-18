import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

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
            {userInfo ? (
              <NavDropdown
                className="navlink"
                title={userInfo.name}
                id="username"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="signin">
                <Nav.Link className="navlink">
                  <i className="fa fa-user pr-1" aria-hidden="true"></i>
                  Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
