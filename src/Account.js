import React from "react";
import Layout from "./Layout";
import SignUp from "./components/SignUp";
import { Container, Row, Col } from "react-bootstrap/";

const Account = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={10} md={5} className="mx-auto">
            <SignUp />
          </Col>
        </Row>
      </Container>
      <Row />
    </Layout>
  );
};

export default Account;
