import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "./Layout";
import Image from "./components/Image";
import Loader from "./components/Loader";
import ImageModal from "./components/ImageModal";

import { Container, Row, Col } from "react-bootstrap/";
import ImageDetailedBox from "./components/ImageDetailedBox";

const PhotoPage = ({ match }) => {
  const {
    params: { fileName },
  } = match;

  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  const [photo, setPhoto] = useState();
  const [show, setShow] = useState(false);
  // const recentPhotos = ["../img/1.jpg"];

  useEffect(() => {
    axios
      .post("http://localhost:5000/photos/", { queryType: "single", fileName })
      .then((response) => {
        console.log(response.data);
        setPhoto(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Layout customWidth="8">
      <Container>
        <Row>
          <Col className="mt-5">
            <div
              className="d-flex flex-column flex-md-row mb-3"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: 0,
                borderRadius: 0,
                width: "100%",
                margin: "0 auto",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              {photo ? <ImageDetailedBox data={photo} /> : <Loader />}
            </div>
          </Col>
        </Row>
      </Container>
      <Row />
    </Layout>
  );
};

export default PhotoPage;
