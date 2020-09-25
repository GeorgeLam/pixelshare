import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "./Layout";
import Image from "./components/Image";
import ImageModal from "./components/ImageModal";
import ImageContents from "./components/ImageContents";

import { Container, Row, Col } from "react-bootstrap/";

const PhotoPage = ({ match }) => {
  const {
    params: { fileName },
  } = match;

  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  const [recentPhotos, setRecentPhotos] = useState();
  const [show, setShow] = useState(false);
  // const recentPhotos = ["../img/1.jpg"];

  useEffect(() => {
    axios
      .post("http://localhost:5000/photos/", { queryType: "single", fileName })
      .then((response) => {
        console.log(response.data);
        setRecentPhotos(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mt-5">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: 0,
                borderRadius: 0,
                width: "80%",
                margin: "0 auto",
              }}
            >
              {recentPhotos && <ImageContents data={recentPhotos} />}
            </div>
          </Col>
        </Row>
      </Container>
      <Row />
    </Layout>
  );
};

export default PhotoPage;
