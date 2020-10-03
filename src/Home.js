import React from "react";
import Layout from "./Layout";
import Image from "./components/Image";

import { Container, Row, Col } from "react-bootstrap/";

const Home = () => {
  return (
    <Layout pageTitle="Home" customWidth={4}>
      <Container>
        <Row>
          <Col xs={12} className="mx-auto">
            <Image />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
