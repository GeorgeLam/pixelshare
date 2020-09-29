import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import Layout from "./Layout";
import Image from "./components/Image";
import ImageModal from "./components/ImageModal";
import { UserContext } from "./Context";
import "./Layout.module.css";

import { Container, Row, Col } from "react-bootstrap/";

const UserPage = ({ match }) => {
  let history = useHistory();
  const browserWidth = window.outerWidth;
  const {
    params: { userID },
  } = match;

  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  const [recentPhotos, setRecentPhotos] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  // const recentPhotos = ["../img/1.jpg"];
  // console.log("rrr", useContext(UserContext));

  useEffect(() => {
    axios
      .post(`http://localhost:5000/photos/`, {
        queryType: "user",
        author: userID,
      })
      .then((response) => {
        console.log(response.data);
        setRecentPhotos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (data) setShow(1);
  }, [data]);

  const [state, setState] = useContext(UserContext);

  return (
    <Layout>
      {/* <p>Hello, {state.user}</p> */}
      {data && (
        <ImageModal
          show={show}
          data={data}
          handleClose={() => setShow(false)}
          handleShow={() => setShow(true)}
        />
      )}
      <Container>
        <Row
          className="mb-5"
          style={
            {
              // margin: "0 auto", width: "60%"
            }
          }
        >
          <Col xs={3} className="mx-auto mt-5">
            <img
              src={require("./components/1.jpg")}
              alt="User's profile photo"
              className="rounded-circle"
              style={{ height: "80px", width: "80px" }}
            ></img>
          </Col>
          <Col xs={9} className="mt-5">
            <p style={{ fontSize: "28px" }}>{userID}</p>
            <span className="mr-2">
              <strong>{recentPhotos?.length}</strong> posts
            </span>
            <span className="mr-2">
              <strong>26</strong> followers
            </span>
            <span>
              <strong>34</strong> following
            </span>
          </Col>
        </Row>
        <Row
          style={
            {
              // width: "80%", margin: "0 auto"
            }
          }
        >
          <div class="grid-container">
            {/* <Col xs={12} style={{ width: "80%", margin: "0 auto" }}> */}
            {recentPhotos ? (
              recentPhotos?.map((photo, i) => (
                <>
                  {/* <Col xs={4} className="mb-4"> */}
                  <div>
                    <img
                      onClick={() => {
                        if (browserWidth < 768) {
                          history.push(`/p/${photo.fileName}`);
                        }
                        // setShow(1);
                        setData(recentPhotos[i]);
                        console.log("Hi");
                      }}
                      className=" img-responsive full-width "
                      src={aws + photo.fileName}
                      // src={require("./components/1.jpg")}
                      alt={`Photo uploaded by ${photo.author}`}
                      style={{
                        width: "100%",
                        // height: "260px",
                        objectFit: "cover",
                        maxWidth: 200,
                      }}
                    ></img>
                  </div>
                  {/* </Col> */}
                </>
              ))
            ) : (
              <p>Loading images...</p>
            )}
          </div>
          {/* </Col> */}
        </Row>
      </Container>
      <Row />
    </Layout>
  );
};

export default UserPage;
