import React from "react";
import Layout from "./Layout";
import Image from "./components/Image";

import { Container, Row, Col } from "react-bootstrap/";

const Home = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={12} md={6} className="mx-auto">
            <Image />
          </Col>
        </Row>
      </Container>
      <Row />
    </Layout>
  );
};

export default Home;
