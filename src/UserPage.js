import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "./Layout";
import Image from "./components/Image";

import { Container, Row, Col } from "react-bootstrap/";

const UserPage = ({ match }) => {
  const {
    params: { userID },
  } = match;

  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  const [recentPhotos, setRecentPhotos] = useState();
  // const recentPhotos = ["../img/1.jpg"];

  useEffect(() => {
    axios
      .post(`http://localhost:5000/photos/`, { user: userID })
      .then((response) => {
        console.log(response.data);
        setRecentPhotos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={12} md={6} className="mx-auto mt-5">
            <p className="display-4 text-center">{userID}</p>
          </Col>
        </Row>
        <Row style={{ width: "80%", margin: "0 auto" }}>
          {/* <Col xs={12} style={{ width: "80%", margin: "0 auto" }}> */}
          {recentPhotos ? (
            recentPhotos?.map((photo) => (
              <Col xs={4}>
                <div
                  style={{
                    paddingBottom: "100%",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    className=" img-responsive full-width "
                    src={aws + photo.fileName}
                    alt={`Photo uploaded by ${photo.author}`}
                    style={{ position: "absolute", maxWidth: "100%" }}
                  ></img>
                </div>
              </Col>
            ))
          ) : (
            <p>Loading images...</p>
          )}
          {/* </Col> */}
        </Row>
      </Container>
      <Row />
    </Layout>
  );
};

export default UserPage;
