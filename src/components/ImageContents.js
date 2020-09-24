import React from "react";
import ImageStyles from "../styles/image.module.css";
import ImageHeader from "./ImageHeader";
import ImageControls from "./ImageControls";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { format, render, cancel, register } from "timeago.js";
import CommentBox from "./CommentBox";

const ImageContents = (props) => {
  let setSrc = props.data ? props.data : require("./1.jpg");
  console.log("!!!", props.data);
  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";

  return (
    <>
      <div
      //   style={{ width: "80%" }}
      >
        <img
          // src={require("./1.jpg")}
          src={aws + props.data.fileName}
          style={{ maxWidth: "100%", maxHeight: 600, objectFit: "cover" }}
        ></img>{" "}
      </div>
      <div
        className="d-flex flex-column"
        style={{
          backgroundColor: "white",
          border: "1px solid rgba(0,0,0,0.3)",
          width: "30%",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            padding: "0.8em",
          }}
        >
          <ImageHeader author={props.data.author} />
        </div>

        <div
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            padding: "0.8em",
            height: "75%",
          }}
        >
          <div>
            <ImageHeader
              author={props.data.author}
              comment="This was a great post.
            Thanks for posting this. Lorem ipsum Lorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsum"
            />
          </div>

          <div>
            <ImageHeader author={props.data.author} comment="Salad" />
          </div>
        </div>
        <div
          style={{
            padding: "0.8em",
          }}
        >
          <ImageControls data={props.data} />

          <span style={{ fontSize: 10 }}>
            <Link to={`/p/${props.data.fileName}`} style={{ color: "gray" }}>
              {format(props.data.uploadTime).toUpperCase()}
            </Link>
          </span>
        </div>
        <div>
          <CommentBox data={props.data} />
        </div>
      </div>
    </>
  );
};

export default ImageContents;
