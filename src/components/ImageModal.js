import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Card, Button, Form, Modal } from "react-bootstrap/";
import ImageStyles from "../styles/image.module.css";
import ImageHeader from "./ImageHeader";
import ImageDetailedBox from "./ImageDetailedBox";
import { ModalContext } from "../Context";

const ImageModal = (props) => {
  const browserNarrowWidth = window.outerWidth;
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
          className={`d-flex ${
            browserNarrowWidth <= 1024 ? "flex-column" : "flex-row"
          }`}
          style={{
            padding: 0,
            borderRadius: 0,
          }}
        >
          <ImageDetailedBox data={props.data} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImageModal;
