import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Card, Button, Form, Modal } from "react-bootstrap/";
import ImageStyles from "../styles/image.module.css";
import ImageHeader from "./ImageHeader";
import ImageContents from "./ImageContents";
import { ModalContext } from "../Context";

const ImageModal = (props) => {
  const [modalShow, setModalShow] = useContext(ModalContext);

  console.log(modalShow);
  // console.log("sasasas", props);
  const [show, setShow] = useState(props.show);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <div style={{ borderRadius: "0" }}>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        dialogClassName="modal-90w"
        // style={{ width: "90%" }}
      >
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 0,
            borderRadius: 0,
          }}
        >
          <ImageContents data={props.data} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImageModal;
