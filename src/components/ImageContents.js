import React from "react";
import ImageStyles from "../styles/image.module.css";
import ImageHeader from "./ImageHeader";

const ImageContents = (props) => {
  let setSrc = props.data ? props.data : require("./1.jpg");

  return (
    <>
      <div
      //   style={{ width: "80%" }}
      >
        <img
          // src={require("./1.jpg")}
          src={setSrc}
          style={{ maxWidth: "100%", maxHeight: 600, objectFit: "cover" }}
        ></img>{" "}
      </div>
      <div
        className="d-flex flex-column"
        style={{
          backgroundColor: "white",
          border: "1px solid rgba(0,0,0,0.3)",
          minWidth: "30%",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            padding: "0.8em",
          }}
        >
          <ImageHeader author="static" />
          {/* //CHANGE THIS */}
        </div>

        <div
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            padding: "0.8em",
            height: "75%",
          }}
        >
          Woohoo, you're reading this text in a modal!
        </div>
        <div
          style={{
            padding: "0.8em",
          }}
        >
          Area 3
        </div>
      </div>
    </>
  );
};

export default ImageContents;
