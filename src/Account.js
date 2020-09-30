import React, { useState } from "react";
import Layout from "./Layout";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Container, Row, Col } from "react-bootstrap/";
import { auth, firestore } from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

const Account = () => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log("User currently logged in", user);
    } else {
      console.log("Not logged in");
    }
  });

  const [method, setMethod] = useState(true);

  return (
    <Layout customWidth={10}>
      <Container>
        <Row>
          <Col xs={12} md={8} lg={5} className="mx-auto">
            {method ? <SignIn /> : <SignUp />}
            <p className="text-center">
              Click{" "}
              <Link
                to="#"
                onClick={() => {
                  setMethod(!method);
                }}
              >
                here
              </Link>{" "}
              to {method ? "sign up" : "sign in"}
            </p>
          </Col>
        </Row>
      </Container>
      <Row />
    </Layout>
  );
};

export default Account;
