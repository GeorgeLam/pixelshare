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
import { Helmet } from "react-helmet";

import { auth, firestore } from "./firebase";
import { UserContext } from "./Context";

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

const Layout = ({ pageTitle, children, customWidth }) => {
  let history = useHistory();

  const [username, setUsername] = useState(null);
  const [state, setState] = useContext(UserContext);
  // console.log(state);
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
      <Helmet
        title={pageTitle ? `Pixelshare | ${pageTitle}` : `Pixelshare`}
        defer={false}
      />
      <Navbar bg="light" expand="md" fixed="top">
        <Container style={{ width: "80%" }}>
          {/* <Row>
            <Col> */}
          <Row>
            <Navbar.Brand href="/">Pixelshare</Navbar.Brand>
          </Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* <Row> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Row>
                <NavLink
                  to="/"
                  exact
                  className="mr-2 mr-md-3"
                  activeClassName="mr-2 mr-md-3 font-weight-bold"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/upload"
                  className="mr-2 mr-md-3"
                  activeClassName="mr-2 mr-md-3 font-weight-bold"
                >
                  Upload
                </NavLink>
                {username && (
                  <NavLink
                    to={`/user/${username?.displayName}`}
                    className="mr-2 mr-md-3"
                    activeClassName="mr-2 mr-md-3 font-weight-bold"
                  >
                    {username?.displayName}
                  </NavLink>
                )}
                {username ? (
                  <Link to="#" onClick={handleLogOut}>
                    Log out
                  </Link>
                ) : (
                  <NavLink to="/login" activeClassName="font-weight-bold">
                    Login
                  </NavLink>
                )}
              </Row>
            </Nav>
          </Navbar.Collapse>
          {/* </Row> */}
          {/* </Col>
          </Row> */}
        </Container>
      </Navbar>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh)",
        }}
      >
        <div style={{ flex: 1 }}>
          <div className="h-100">
            <Col
              xs={12}
              md={11}
              lg={customWidth ? customWidth : 5}
              // xl={7}
              className="mt-5 mx-auto"
            >
              {children}
            </Col>
          </div>
        </div>

        <Navbar className="mt-3" bg="light">
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

export default Layout;
