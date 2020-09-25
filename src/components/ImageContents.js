import React from "react";
import ImageStyles from "../styles/image.module.css";
import ImageHeader from "./ImageHeader";
import ImageControls from "./ImageControls";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { format, render, cancel, register } from "timeago.js";
import CommentBox from "./CommentBox";
import FullArea from "./FullArea";

const ImageContents = (props) => {
  let setSrc = props.data ? props.data : require("./1.jpg");
  console.log("!!!", props.data);
  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";

  return (
    <>
      <div
        style={{
          // minWidth: "60%"
          flex: 1,
        }}
      >
        <img
          // src={require("./1.jpg")}
          src={aws + props.data.fileName}
          style={{
            maxHeight: 600,
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        ></img>{" "}
      </div>
      <>
        <FullArea data={props.data} />
      </>
    </>
  );
};

export default ImageContents;
