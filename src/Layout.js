import React, { useState, useContext, useEffect } from "react";
// import PropTypes from "prop-types";
// import { useStaticQuery, graphql, Link } from "gatsby";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useHistory,
} from "react-router-dom";

import { auth, firestore } from "./firebase";
import { UserContext } from "./UserContext";

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
  let history = useHistory();

  const [username, setUsername] = useState(null);
  const [state, setState] = useContext(UserContext);
  console.log(state);
  // const authCheck =
  auth.onAuthStateChanged(function (user) {
    if (user) {
      setUsername(user);
      // console.log("User currently logged in", user);
    } else {
      console.log("Not logged in");
    }
  });

  useEffect(() => {
    if (username?.displayName) {
      setState((state) => ({ user: username.displayName }));
      console.log("effect");
    } else {
      console.log("effect2");
      setState((state) => ({ user: null }));
    }
  }, [username]);

  const handleLogOut = () => {
    auth
      .signOut()
      .then(function () {
        setUsername(null);
        console.log("You were logged out...");
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                  <NavLink
                    to="/upload"
                    className="mr-3"
                    activeClassName="mr-3 font-weight-bold"
                  >
                    Upload
                  </NavLink>
                  {username ? (
                    <Link to="#" onClick={handleLogOut}>
                      Log out {`(${username?.displayName})`}
                    </Link>
                  ) : (
                    <NavLink
                      to="/login"
                      activeClassName="mr-3 font-weight-bold"
                    >
                      Login
                    </NavLink>
                  )}
                </Row>
              </Nav>
            </Navbar.Collapse>
          </Row>
          {/* </Col>
          </Row> */}
        </Container>
      </Navbar>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 22px)",
        }}
      >
        <div style={{ flex: 1 }}>
          <Row className="h-100">
            <Col className="mt-5">{children}</Col>
          </Row>
        </div>

        <Navbar bg="light">
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
