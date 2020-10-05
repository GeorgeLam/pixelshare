import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap/";

import Layout from "./Layout";
import Image from "./components/Image";
import ImageModal from "./components/ImageModal";
import EditProfileModal from "./components/EditProfileModal";
import Loader from "./components/Loader";
import { UserContext } from "./Context";

import { Container, Row, Col } from "react-bootstrap/";

const UserPage = ({ match }) => {
  let history = useHistory();
  const browserWidth = window.outerWidth;
  const {
    params: { userID },
  } = match;

  // const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  const [profileData, setProfileData] = useState();
  const [recentPhotos, setRecentPhotos] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();

  const [profileModalShow, setProfileModalShow] = useState(false);

  // const recentPhotos = ["../img/1.jpg"];
  // console.log("rrr", useContext(UserContext));

  useEffect(() => {
    axios
      .post(`/photos/`, {
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
    axios
      .post(`/profile/`, {
        // queryType: "user",
        username: userID,
      })
      .then((response) => {
        console.log(response);
        setProfileData(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (data) setShow(1);
  }, [data]);

  const [state, setState] = useContext(UserContext);

  const openProfileModal = () => {
    console.log("Opening profile modal");
  };

  return (
    <Layout pageTitle={userID}>
      {/* <p>Hello, {state.user}</p> */}
      <EditProfileModal
        show={profileModalShow}
        handleProfileModalClose={() => setProfileModalShow(false)}
        handleProfileModalShow={() => setProfileModalShow(true)}
        setProfileData={(data) => setProfileData(data)}
      />
      {data && (
        <ImageModal
          show={show}
          handleClose={() => setShow(false)}
          handleShow={() => setShow(true)}
          data={data}
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
              src={`https://pixelshare.s3.amazonaws.com/${userID}`}
              alt="User's profile photo"
              className="rounded-circle"
              style={{ height: "80px", width: "80px" }}
            ></img>
          </Col>
          <Col xs={9} className="mt-5">
            <div className="d-flex align-items-center mb-2">
              <p style={{ fontSize: "28px", margin: 0 }}>{userID}</p>
              {userID?.toLowerCase() == state?.user?.toLowerCase() && (
                <Button
                  variant="outline-secondary ml-3"
                  size="sm"
                  onClick={() => setProfileModalShow(true)}
                >
                  Edit profile
                </Button>
              )}
            </div>
            <span className="mr-2">
              <strong>{recentPhotos ? recentPhotos?.length : "Loading"}</strong>{" "}
              posts
            </span>

            <p className="mt-2">{profileData && profileData.bio}</p>
          </Col>
        </Row>
        <Row></Row>
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
                      }}
                      className=" img-responsive full-width "
                      src={`https://pixelshare.s3.amazonaws.com/${photo.fileName}`}
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
              <div style={{ position: "absolute", left: "25%", right: "25%" }}>
                <Loader />
              </div>
            )}
          </div>
          {/* </Col> */}
        </Row>
      </Container>
      <Row />
    </Layout>
  );
};

export default React.memo(UserPage);
