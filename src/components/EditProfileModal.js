import React, { useEffect, useState, useContext, useRef } from "react";
import { useHistory, BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";

import { Card, Button, Form, Modal } from "react-bootstrap/";
import ImageStyles from "../styles/image.module.css";
import ImageHeader from "./ImageHeader";
import ImageDetailedBox from "./ImageDetailedBox";
import Uploader from "./Uploader";
import { ModalContext } from "../Context";
import { UserContext } from "../Context";

const EditProfileModal = (props) => {
  let history = useHistory();
  const [state, setState] = useContext(UserContext);
  const bioRef = useRef(null);

  const browserNarrowWidth = window.outerWidth;
  const [modalShow, setModalShow] = useContext(ModalContext);

  console.log(modalShow);
  console.log("XZXXZXZXZ", state.user);
  // console.log("sasasas", props);
  const [show, setShow] = useState(props.show);
  const [profilePhotoChanged, setProfilePhotoChanged] = useState();

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const updateProfile = () => {
    let data = {
      username: state.user,
      bio: bioRef.current.value,
    };
    // if (profilePhotoChanged) {
    //   data.photo = `https://pixelshare.s3.amazonaws.com/${state.user}`;
    // }

    axios
      .post("/updateProfile", data)
      .then((response) => {
        // console.log("epm", response.data);
        console.log("epm", response.data);
        props.setProfileData(response.data.value);
        props.handleProfileModalClose();
        history.go(0);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div style={{ borderRadius: "0" }}>
      <Modal
        show={props.show}
        onHide={() => {
          props.handleProfileModalClose();
        }}
        dialogClassName="modal-90w"
        // style={{ width: "90%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mx-auto mb-3" style={{ width: "80%" }}>
            <Form.Group>
              <Uploader
                type="profilePhoto"
                setProfilePhotoChanged={(a) => {
                  setProfilePhotoChanged(a);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label for="bioText">Profile Bio</Form.Label>
              <textarea
                // defaultValue={bio}
                // onChange={handleBioInput}
                placeholder="Enter a bio"
                className="form-control"
                id="bioText"
                rows="3"
                ref={bioRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" onClick={updateProfile}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default React.memo(EditProfileModal);

