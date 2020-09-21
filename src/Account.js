import React from "react";
import Layout from "./Layout";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Container, Row, Col } from "react-bootstrap/";
import { auth, firestore } from "./firebase";

const Account = () => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log("User currently logged in", user);
    } else {
      console.log("Not logged in");
    }
  });

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={10} md={5} className="mx-auto">
            <SignUp />
            <SignIn />
          </Col>
        </Row>
      </Container>
      <Row />
    </Layout>
  );
};

export default Account;
