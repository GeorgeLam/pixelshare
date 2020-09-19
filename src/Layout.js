import React from "react";
// import PropTypes from "prop-types";
// import { useStaticQuery, graphql, Link } from "gatsby";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

// import { Helmet } from "react-helmet";

// import Header from "./header";
import LayoutStyles from "./layout.module.css";
// import "../styles/blog.module.css"
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap/";

const Layout = ({ children }) => {
  return (
    <>
      {/* <Helmet title="Better Latte Coffee" defer={false} /> */}
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          {/* <Row>
            <Col> */}
          <Row>
            <Navbar.Brand href="/">Pixelshare</Navbar.Brand>
          </Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Row>
            <Navbar.Collapse id="basic-navbar-nav">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
              </Form>
            </Navbar.Collapse>
          </Row>
          <Row>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Row>
                  <NavLink
                    to="/"
                    exact
                    className="mr-3"
                    activeClassName="mr-3 font-weight-bold"
                  >
                    Home
                  </NavLink>
                  <NavLink to="/upload" activeClassName="mr-3 font-weight-bold">
                    Upload
                  </NavLink>
                </Row>
              </Nav>
            </Navbar.Collapse>
          </Row>
          {/* </Col>
          </Row> */}
        </Container>
      </Navbar>

      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ flex: 1 }}>
          <Row>
            <Col className="mt-5">{children}</Col>
          </Row>
        </div>

        <Navbar bg="light" expand="lg">
          <Container>
            <Row className="mx-auto">
              <Col>
                <a href="https://georgelam.dev">George Lam</a> - 2020
              </Col>
            </Row>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Layout;
